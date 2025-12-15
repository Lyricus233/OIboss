// Serverless API
const OpenAI = require('openai');

const ALLOWED_DOMAINS = (process.env.ALLOWED_DOMAINS || '')
    .split(',')
    .map(domain => domain.trim())
    .filter(domain => domain);

module.exports = async (req, res) => {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const referer = req.headers.referer || req.headers.origin;
    if (referer) {
        const isAllowed = ALLOWED_DOMAINS.some(domain => referer.startsWith(domain));
        if (!isAllowed) {
            console.warn(`Blocked unauthorized origin: ${referer} from IP: ${ip}`);
            return res.status(403).json({ error: 'Forbidden source' });
        }
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    const { messages } = req.body;

    if (!apiKey) {
        return res.status(500).json({ error: 'API Key not configured' });
    }

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid messages format' });
    }

    const hasLongUserMessage = messages.some(msg =>
        msg.role === 'user' && typeof msg.content === 'string' && msg.content.length > 100
    );

    if (hasLongUserMessage) {
        return res.status(400).json({ error: 'User message exceeds 100 characters limit' });
    }

    const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: apiKey,
    });

    try {
        console.log(`Processing request from IP: ${ip}, Message count: ${messages.length}`);

        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "deepseek-chat",
            temperature: 0.7,
            response_format: { type: 'json_object' }
        });

        const content = completion.choices[0].message.content || "";

        const usage = completion.usage;
        console.log(`Success. IP: ${ip}, Tokens: ${usage?.total_tokens || 'unknown'}`);

        res.status(200).json({ content });
    } catch (error) {
        console.error(`DeepSeek API Error (IP: ${ip}):`, error.message);
        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
