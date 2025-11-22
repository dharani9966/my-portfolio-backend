// server.js
import express from 'express';
import cors from 'cors';
import { projects, about, skills, internships } from './data.js';

const app = express();
const PORT = 5000;



// Enable CORS so frontend can access APIs from different origin
app.use(cors());

// Basic route to confirm server is running
app.get('/', (req, res) => {
  res.send('Dharani Rapthadu Portfolio Backend Server is running');
});

// Get all projects
app.get('/projects', (req, res) => {
  res.json(projects);
});

// Get about info
app.get('/about', (req, res) => {
  res.json(about);
});

// Get skills
app.get('/skills', (req, res) => {
  res.json(skills);
});

// Get internships
app.get('/internships', (req, res) => {
  res.json(internships);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
