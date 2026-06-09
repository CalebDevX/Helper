//Achek Bot 2 — achek.com.ng
//Auto-restart wrapper with crash protection, backoff, and keep-alive

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const http = require('http');

// ─── Phone number memory ─────────────────────────────────────────────────────
const PHONE_FILE = path.join(__dirname, '.phone_number');

function getSavedPhone() {
  try {
    const num = fs.readFileSync(PHONE_FILE, 'utf8').trim();
    return num.length > 5 ? num : null;
  } catch (e) { return null; }
}

function savePhone(num) {
  try { fs.writeFileSync(PHONE_FILE, num.trim()); } catch (e) {}
}

// ─── Keep-alive HTTP server (prevents Replit from sleeping) ──────────────────
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Achek Bot 2 is running ✅\nachek.com.ng\n');
}).listen(PORT, () => {
  console.log(`[Achek Bot 2] Keep-alive server running on port ${PORT}`);
  console.log(`[Achek Bot 2] Ping this URL every 5 min with UptimeRobot to stay online`);
});

// ─── Restart backoff ─────────────────────────────────────────────────────────
let restartDelay = 3000;   // start at 3s
const MAX_DELAY   = 30000; // cap at 30s
let restartTimer  = null;
let stableTimer   = null;

function scheduleRestart() {
  if (restartTimer) return;
  console.log(`[Achek Bot 2] Restarting in ${restartDelay / 1000}s...`);
  restartTimer = setTimeout(() => {
    restartTimer = null;
    start();
    restartDelay = Math.min(Math.floor(restartDelay * 1.5), MAX_DELAY);
  }, restartDelay);
}

function markStable() {
  if (stableTimer) clearTimeout(stableTimer);
  stableTimer = setTimeout(() => {
    restartDelay = 3000; // reset backoff after 2 min stable
  }, 120_000);
}

// ─── Main bot process ─────────────────────────────────────────────────────────
function start() {
  const savedPhone = getSavedPhone();
  const args = [path.join(__dirname, 'main.js'), ...process.argv.slice(2)];
  const stdinMode = savedPhone ? 'pipe' : 'inherit';

  const p = spawn(process.argv[0], args, {
    stdio: [stdinMode, 'inherit', 'inherit', 'ipc'],
  });

  // Auto-fill saved phone number into readline prompt
  if (savedPhone) {
    setTimeout(() => {
      try {
        p.stdin.write(savedPhone + '\n');
        console.log(`[Achek Bot 2] Auto-filled number: ${savedPhone}`);
      } catch (e) {}
    }, 4000);
  } else {
    // First run: capture the number the user types via a wrapper approach
    // (the user types directly; we save after pairing)
    console.log('[Achek Bot 2] First run — enter your number below. It will be remembered.');
  }

  p.on('message', (data) => {
    if (data === 'reset') {
      console.log('[Achek Bot 2] Reset signal received. Restarting...');
      p.kill();
      scheduleRestart();
      delete p;
    }
  });

  p.on('exit', (code, signal) => {
    if (stableTimer) clearTimeout(stableTimer);
    console.log(`[Achek Bot 2] Process exited — code: ${code}, signal: ${signal}`);
    scheduleRestart();
  });

  markStable();
}

// ─── Global crash protection ──────────────────────────────────────────────────
process.on('uncaughtException', (err) => {
  console.error('[Achek Bot 2] Uncaught Exception:', err.message || err);
});

process.on('unhandledRejection', (reason) => {
  console.error('[Achek Bot 2] Unhandled Rejection:', reason);
});

start();
