@echo off
title MedVault AI - Unified Production Build & Deploy
color 0a

echo =======================================================================
echo          MEDVAULT AI - UNIFIED PRODUCTION BUILD & DEPLOY
echo =======================================================================
echo.
echo [1/3] Installing Python dependencies...
cd /d %~dp0
python -m pip install -r backend/requirements.txt

echo.
echo [2/3] Installing frontend packages and building production bundle...
cd /d %~dp0frontend
call npm install
call npm run build

echo.
echo [3/3] Starting Unified Production Server on http://localhost:5000...
cd /d %~dp0
start http://localhost:5000
python backend/app.py
pause
