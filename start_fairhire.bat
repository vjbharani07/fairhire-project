@echo off
title FairHire - REST Backend Server & Web Platform
cls
echo ========================================================
echo         FAIRHIRE - Fair Hiring. Better Opportunities.
echo ========================================================
echo.
echo [1/2] Starting FairHire Local REST API Backend on Port 5000...
start /b powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0server\backend.ps1"
timeout /t 2 /nobreak >nul
echo [2/2] Opening FairHire Web Platform in your default browser...
start "" "http://localhost:5000/"
echo.
echo ========================================================
echo  STATUS: Backend Server is ONLINE at http://localhost:5000
echo  Database: "%~dp0data\fairhire_database.json"
echo.
echo  Keep this window open while using FairHire!
echo  To shut down the server, simply close this window.
echo ========================================================
echo.
pause
