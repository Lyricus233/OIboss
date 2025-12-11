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
        const isGameContext = messages.some(m =>
            m.content && (m.content.includes('信奥') || m.content.includes('机构') || m.content.includes('家长') || m.content.includes('谈判'))
        );
        if (!isGameContext) {
            console.log('Blocked non-game request');
            return res.status(403).json({ error: 'Forbidden: Game context required' });
        }
    }
    next();
});

const apiKey = process.env.DEEPSEEK_API_KEY;

if (!apiKey) {
    console.error('Error: DEEPSEEK_API_KEY is missing in .env file.');
    console.error('Please create a .env file in the root directory with: DEEPSEEK_API_KEY=<your api key>');
    process.exit(1);
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
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "deepseek-chat",
            temperature: 0.7,
            response_format: { type: 'json_object' }
        });
        const content = completion.choices[0].message.content || "";
        res.json({ content });
    } catch (error) {
        console.error('Error calling DeepSeek:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`API Server running at http://localhost:${port}`);
});