// backend/src/routes/chatRoutes.js
import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import hiteshPrompt from '../prompts/hiteshPrompt.js';
import piyushPrompt from '../prompts/piyushPrompt.js';


dotenv.config();
const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/chat/:id', async (req, res) => {
  try {
    let { messages } = req.body; // Only user + assistant messages
    const {id} = req.params;

    // Keep only last 10 messages
    messages = messages.slice(-10);

    // Choose the correct system prompt
    const systemPrompt = id === '1' ? hiteshPrompt : piyushPrompt;

    // Inject system prompt at the start
    const finalMessages = [
      { role: 'system', content: systemPrompt },
      ...messages,
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: finalMessages,
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
