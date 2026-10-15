@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"

REM --- Detect LAN IPv4 (skip 127.x and 169.254.x) ---
set "LAN_IP="
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
  set "IP=%%a"
  set "IP=!IP: =!"
  echo !IP! | findstr /r "^192\.168\." >nul && set "LAN_IP=!IP!" && goto :got_ip
  echo !IP! | findstr /r "^10\." >nul && set "LAN_IP=!IP!" && goto :got_ip
  echo !IP! | findstr /r "^172\." >nul && set "LAN_IP=!IP!" && goto :got_ip
)
:got_ip
if not defined LAN_IP set "LAN_IP=127.0.0.1"

set "API_PORT=8001"
set "WEB_PORT=3000"

echo.
echo  ========================================
echo   Comtanix Careers - Local LAN
echo  ========================================
echo   Your IP : %LAN_IP%
echo   Site    : http://%LAN_IP%:%WEB_PORT%
echo   API     : http://%LAN_IP%:%API_PORT%
echo  ========================================
echo.

REM Point Next.js at this machine's LAN IP
> ".env.local" echo NEXT_PUBLIC_API_URL=http://%LAN_IP%:%API_PORT%

REM Allow CORS from localhost + current LAN IP (simple rewrite of FRONTEND_URL line)
powershell -NoProfile -Command ^
  "$p='backend\.env'; if(Test-Path $p){ $c=Get-Content $p -Raw; $line='FRONTEND_URL=http://localhost:3000,http://127.0.0.1:3000,http://%LAN_IP%:3000'; if($c -match 'FRONTEND_URL=.*'){ $c=$c -replace 'FRONTEND_URL=.*',$line } else { $c=$c.TrimEnd()+\"`r`n\"+$line+\"`r`n\" }; Set-Content $p $c -NoNewline }"

REM Start API (new window)
start "Comtanix API" cmd /k "cd /d \"%~dp0backend\" && .venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port %API_PORT%"

REM Start Next.js (new window)
start "Comtanix Web" cmd /k "cd /d \"%~dp0\" && npm run dev -- -H 0.0.0.0 -p %WEB_PORT%"

echo  Opened 2 windows: API + Web
echo  Phone/PC same Wi-Fi pe yeh URL kholo:
echo.
echo    http://%LAN_IP%:%WEB_PORT%
echo.
pause
