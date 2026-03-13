# AgentHub - Agent Skill Web Application

AgentHub is a modern web application allows users to register and search for AI agent skills. It has a beautiful, glassmorphic UI built with React, TypeScript, and Framer Motion. The backend is an Express Node.js application.

## Project Structure

- `frontend/`: React + TypeScript frontend built with Vite.
- `backend/`: Node.js Express server acting as the REST API backend.

## Prerequisites

- Node.js (v16+)
- npm or yarn

## Getting Started

### 1. Start the Backend Server

```bash
cd backend
npm install
node server.js
```
The server will run on `http://localhost:5000`. It maintains an in-memory database of agent skills and users.

### 2. Start the Frontend Development Server

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

The app will typically start on `http://localhost:5173` (or the next available port). Look at the terminal output for the exact URL.

## Features

- **Agent Skill Search Page**: Advanced search functionality with fluid animations and a modern dark mode design. Filters over name, author, tags, and description.
- **Registration Page**: Registration form for creating an account with instantaneous UX feedback.
- **Proxy Configuration**: Seamlessly communicates with the backend `localhost:5000` via Vite's proxy rules.

## Technologies Used

- **Frontend**: React, TypeScript, Vite, React Router, Axios, Framer Motion, Lucide React Icons.
- **Backend**: Node.js, Express, UUID, Body-parser, CORS.
- **Styling**: Vanilla CSS with customized variable theming, advanced CSS features (glassmorphism), and Google Fonts ("Outfit").