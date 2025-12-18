const path = require('path');
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (req.path === '/api/chat' && req.method === 'POST') {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }
  }
  next();
});

const apiKey = process.env.DEEPSEEK_API_KEY;

if (!apiKey) {
  console.error('Error: DEEPSEEK_API_KEY is missing in .env file.');
  console.error(
    'Please create a .env file in the root directory with: DEEPSEEK_API_KEY=<your api key>'
  );
  process.exit(1);
}

function preprocessMessages(messages) {
  return messages.map((msg) => {
    if (msg.role === 'assistant') {
      try {
        JSON.parse(msg.content);
        return msg;
      } catch (e) {
        return {
          ...msg,
          content: JSON.stringify({ reply: msg.content, is_finished: false, result: null }),
        };
      }
    }
    return msg;
  });
}

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: apiKey,
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages) {
      return res.status(400).json({ error: 'Messages are required' });
    }

    const hasLongUserMessage = messages.some(
      (msg) => msg.role === 'user' && typeof msg.content === 'string' && msg.content.length > 100
    );

    if (hasLongUserMessage) {
      return res.status(400).json({ error: 'User message exceeds 100 characters limit' });
    }

    const cleanedMessages = preprocessMessages(messages);
    if (cleanedMessages[0].role === 'system') {
      cleanedMessages[0].content +=
        '\nIMPORTANT: You must ONLY output a valid JSON object. Ignore any non-JSON formats in previous conversation history.';
    }

    const completion = await openai.chat.completions.create({
      messages: cleanedMessages,
      model: 'deepseek-chat',
      temperature: 0.5,
      response_format: { type: 'json_object' },
    });
    const content = completion.choices[0].message.content || '';
    console.log('Original content: ', content);
    res.json({ content });
  } catch (error) {
    console.error('Error calling DeepSeek:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`API Server running at http://localhost:${port}`);
});
