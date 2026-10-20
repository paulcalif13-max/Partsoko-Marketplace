@echo off
title PARTSOKO Platform Launcher
echo ========================================================
echo        Starting PARTSOKO Backend and Frontend
echo ========================================================
echo.
echo Launching Backend API on http://localhost:5000 ...
start "PARTSOKO Backend (Port 5000)" cmd /k "cd /d "%~dp0backend" && npm run dev"

echo Launching Frontend on http://localhost:3000 ...
start "PARTSOKO Frontend (Port 3000)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ========================================================
echo  Both servers have been launched in separate windows!
echo  - Frontend: http://localhost:3000
echo  - Backend:  http://localhost:5000
echo ========================================================
echo You can close this launcher window now.
pause
