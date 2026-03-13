const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory data store for agent skills
const agentSkills = [
  {
    id: uuidv4(),
    name: "Code Review Assistant",
    description: "An agent that automatically reviews pull requests and suggests improvements.",
    author: "DevOpsTeam",
    tags: ["code", "review", "git"],
    rating: 4.8
  },
  {
    id: uuidv4(),
    name: "Data Analyst Pro",
    description: "Analyzes CSV data and creates interactive visualizations.",
    author: "DataSci",
    tags: ["data", "analysis", "pandas", "visualization"],
    rating: 4.5
  },
  {
    id: uuidv4(),
    name: "Customer Support Bot",
    description: "Handles level 1 customer queries and escalates complex issues.",
    author: "SupportGenius",
    tags: ["support", "chat", "customer service"],
    rating: 4.2
  }
];

// In-memory data store for users
const users = [];

// API to register a user
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }
  
  const userExists = users.some(u => u.email === email || u.username === username);
  if (userExists) {
    return res.status(409).json({ error: 'User already exists' });
  }
  
  const newUser = {
    id: uuidv4(),
    username,
    email,
    password // Not hashing for this simple implementation
  };
  
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, username: newUser.username } });
});

// API to register an agent skill
app.post('/api/skills', (req, res) => {
  const { name, description, author, tags } = req.body;
  
  if (!name || !description || !author) {
    return res.status(400).json({ error: 'Name, description, and author are required' });
  }
  
  const newSkill = {
    id: uuidv4(),
    name,
    description,
    author,
    tags: tags || [],
    rating: 0 // New skills start with 0 rating
  };
  
  agentSkills.push(newSkill);
  res.status(201).json({ message: 'Agent skill registered successfully', skill: newSkill });
});

// API to search agent skills
app.get('/api/skills', (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.json(agentSkills);
  }
  
  const lowercaseQuery = query.toLowerCase();
  
  const filteredSkills = agentSkills.filter(skill => {
    return skill.name.toLowerCase().includes(lowercaseQuery) ||
           skill.description.toLowerCase().includes(lowercaseQuery) ||
           skill.author.toLowerCase().includes(lowercaseQuery) ||
           skill.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery));
  });
  
  res.json(filteredSkills);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
