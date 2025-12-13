// Serverless API
const OpenAI = require('openai');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    const { messages } = req.body;

    if (!apiKey) {
        return res.status(500).json({ error: 'API Key not configured' });
    }
    const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: apiKey,
    });

    try {
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "deepseek-chat",
            temperature: 0.7,
            response_format: { type: 'json_object' }
        });

        const content = completion.choices[0].message.content || "";
        res.status(200).json({ content });
    } catch (error) {
        console.error('Error calling DeepSeek:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
