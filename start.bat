@echo off
title MedVault AI Launcher
color 0b

echo =======================================================================
echo          MEDVAULT AI - MEDICAL DOCUMENT INTELLIGENCE
echo                Chronological Patient Timeline
echo =======================================================================
echo.
echo [1/3] Checking Python and Node.js environments...
echo.

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Python was not found in your PATH. Please install Python 3.10+.
    pause
    exit /b
)

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Node.js / npm was not found in your PATH. Please install Node.js v18+.
    pause
    exit /b
)

echo [2/3] Launching Python Flask Backend Server (Port 5000)...
start "MedVault AI Backend" cmd /k "cd /d %~dp0 && python -m pip install -r backend/requirements.txt && python backend/app.py"

echo [3/3] Launching React Vite Frontend (Port 5173)...
start "MedVault AI Frontend" cmd /k "cd /d %~dp0frontend && npm install && npm run dev"

echo.
echo =======================================================================
echo [SUCCESS] Both servers are launching in background windows!
echo Backend:  http://localhost:5000/api/health
echo Frontend: http://localhost:5173
echo =======================================================================
echo.
echo Opening browser to MedVault AI...
timeout /t 4 >nul
start http://localhost:5173
