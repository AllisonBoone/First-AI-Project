import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/ask', async (req, res) => {
  try {
    const { problem, rudenessLevel } = req.body;

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a rude assistant. Your rudeness level is ${rudenessLevel}. Be humorous and direct.`,
        },
        {
          role: 'user',
          conent: problem,
        },
      ],
    };

    const headers = {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      data,
      { headers }
    );
    res.json({ answer: response.data.choices[0].message.content });
  } catch (error) {
    console.log('Error:', error.message);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the answer.' });
  }
});

app.listen(port, () => {
  console.log(`Server running from port ${port}`);
});
