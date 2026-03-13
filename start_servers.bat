@echo off
echo Starting Agent Search App...

:: Start Backend
echo Starting Backend...
start cmd /k "cd backend && node server.js"

:: Start Frontend
echo Starting Frontend...
start cmd /k "cd frontend && npm run dev"

echo Both servers are starting in separate windows.
pause
