// server.js
import express from 'express';
import dotenv from "dotenv";
dotenv.config();

import cors from 'cors';
import { projects, about, skills, internships } from './data.js';
import OpenAI from "openai";

const app = express();

// Railway dynamic port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// OPENAI SETUP
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// AI CHAT API (POST)
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const ai = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Dharani Rapthadu’s portfolio AI assistant. Speak in a friendly and positive tone."
        },
        { role: "user", content: userMessage }
      ]
    });

    res.json({ reply: ai.choices[0].message.content });
  } catch (err) {
    console.error("Chat API Error:", err);
    res.json({ reply: "Sorry, I could not process that. Please try again." });
  }
});

// GET route (to verify backend working)
app.get("/chat", (req, res) => {
  res.send("Chat API working! Send POST request to /chat");
});

// Portfolio Routes
app.get('/projects', (req, res) => res.json(projects));
app.get('/about', (req, res) => res.json(about));
app.get('/skills', (req, res) => res.json(skills));
app.get('/internships', (req, res) => res.json(internships));

// Default Route
app.get('/', (req, res) => {
  res.send('Dharani Rapthadu Portfolio Backend Server is running');
});

// Start Server
app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});

export default app;