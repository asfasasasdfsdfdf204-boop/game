const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');
const readline = require('readline');
const { execSync } = require('child_process');
const express = require('express');

// ANSI escape codes for professional console styling
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const MAGENTA = '\x1b[35m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const parseCookies = (cookieHeader) => {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    if (parts.length >= 2) {
      cookies[parts[0].trim()] = parts[1].trim();
    }
  });
  return cookies;
};

async function main() {
  const args = process.argv.slice(2);
  const isRecoveryMode = args.includes('--recovery');

  if (!isRecoveryMode) {
    // Stage 1: Simulated system crash to force terminal safe booting
    console.clear();
    console.log(`${RED}${BOLD}[FATAL ERROR] 0x0000007B: INACCESSIBLE_BOOT_DEVICE${RESET}`);
    console.log(`${RED}==================================================================`);
    console.log(`[!] CRITICAL: Sector 7 "蟲" (Infection-v2.6) payload is active.`);
    console.log(`[!] Primary system loop has been completely hijacked.`);
    console.log(`[!] Security protocol halted the OS to prevent data exfiltration.`);
    console.log(`==================================================================${RESET}`);
    console.log(`${YELLOW}[*] DIAGNOSTIC RECOMMENDATION:`);
    console.log(`    The main execution module is locked. You must run the`);
    console.log(`    scanner in emergency Recovery Safe Mode to restore control.`);
    console.log(`\n    Command: ${BOLD}node main.js --recovery${RESET}${YELLOW}`);
    console.log(`==================================================================${RESET}`);
    process.exit(1);
  }

  // Stage 2: Safe Boot & System Scan
  console.clear();
  console.log(`${CYAN}${BOLD}[+] EMERGENCY SYSTEM RECOVERY UTILITY v1.0.4${RESET}`);
  console.log(`${CYAN}[+] Initializing safe mode scanner...${RESET}`);
  await delay(1200);

  console.log(`${CYAN}[+] Checking environment files folder...${RESET}`);
  const logDir = path.join(__dirname, 'System_Logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // Hide the log folder on Windows to create a physical puzzle element
  try {
    execSync(`attrib +h "${logDir}"`);
  } catch (e) {
    // Non-Windows or fail silently
  }
  await delay(1000);

  console.log(`${YELLOW}[!] Scanning Sector 7 memory space... threat found: '蟲_core_v2.6'${RESET}`);
  await delay(1200);
  console.log(`${CYAN}[+] Isolating threat signature and capturing memory dump...${RESET}`);

  // Generate a dynamic cryptographic key based on the local computer's username
  const username = os.userInfo().username || 'Operator';
  const dynamicKey = crypto.createHash('sha256')
    .update(username + '_SECTOR_7_IN_THE_SHELL')
    .digest('hex')
    .substring(0, 10)
    .toUpperCase();

  const sysFile = path.join(logDir, 'sector_0.sys');
  const logContent = `[INFO] ${new Date().toISOString()} - Emergency kernel dump initiated.
[INFO] ${new Date().toISOString()} - Analyzing Sector 7 disk array...
[WARN] ${new Date().toISOString()} - CORRUPTED INODE DETECTED AT BLOCK 0x07AF92.
[ERR ] ${new Date().toISOString()} - Thread ID 0x1E24 ("蟲") is writing active telemetry.
[INFO] ${new Date().toISOString()} - Forcing emergency terminal isolation.
[INFO] ${new Date().toISOString()} - SYSTEM RESTORE TOKEN GENERATED:
[INFO] ${new Date().toISOString()} - ===================================================
[INFO] ${new Date().toISOString()} - TOKEN ID: KEY-${dynamicKey}
[INFO] ${new Date().toISOString()} - ===================================================
[WARN] ${new Date().toISOString()} - Administrative shell access severed by intruder.
[ERR ] ${new Date().toISOString()} - Connection lost. Local echo disabled.
[FATAL] ${new Date().toISOString()} - Kernel panic: unable to resolve "蟲" infection.
`;

  // Write and set system/hidden files on Windows
  try {
    execSync(`attrib -h -s "${sysFile}"`);
  } catch (e) {}
  
  fs.writeFileSync(sysFile, logContent, 'utf-8');
  
  try {
    execSync(`attrib +h +s "${sysFile}"`);
  } catch (e) {}

  await delay(1500);
  console.log(`${GREEN}[+] Captured isolated log at: .\\System_Logs\\sector_0.sys${RESET}`);
  console.log(`${YELLOW}[!] WARNING: "System_Logs" is marked as a hidden Windows system folder.${RESET}`);
  console.log(`${YELLOW}[!] You must enable "Show hidden files" in Explorer to view the log file.${RESET}`);
  console.log(`==================================================================\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const askForKey = () => {
    rl.question(`${BOLD}${YELLOW}Enter Decryption Key (KEY-XXXXX): ${RESET}`, async (input) => {
      const formattedInput = input.trim().toUpperCase();
      if (formattedInput === `KEY-${dynamicKey}`) {
        console.log(`\n${GREEN}${BOLD}[SUCCESS] Key validated! Host access authorized.${RESET}`);
        rl.close();
        await delay(1000);
        startWebServer();
      } else {
        console.log(`${RED}[ERROR] Access Denied: Invalid cryptographic token.${RESET}\n`);
        askForKey();
      }
    });
  };

  askForKey();
}

function startWebServer() {
  const app = express();
  
  // Ensure the lockfile exists and is writable initially
  const lockFile = path.join(__dirname, 'kernel.lock');
  if (!fs.existsSync(lockFile)) {
    fs.writeFileSync(lockFile, 'INODE_LOCK_ACTIVE_WRITE', 'utf-8');
  } else {
    try {
      execSync(`attrib -r "${lockFile}"`);
    } catch(e) {}
  }

  app.get('/', (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    res.setHeader('X-Infection-Trace', 'Sector_7_Token_99');

    if (cookies.role === 'admin') {
      res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>System Admin Console - Decoupled Core</title>
    <style>
        body { background: #070c07; color: #33ff33; font-family: 'Courier New', Courier, monospace; padding: 50px; text-align: center; }
        h1 { font-size: 3em; margin-bottom: 20px; text-shadow: 0 0 10px #33ff33; letter-spacing: 2px; }
        p { font-size: 1.2em; color: #bbeeaa; line-height: 1.6; }
        .box { border: 2px #33ff33 solid; padding: 30px; max-width: 700px; margin: 0 auto; background: #031403; box-shadow: 0 0 25px rgba(51, 255, 51, 0.3); border-radius: 8px; }
        .code { background: #000; padding: 15px; color: #ffcc00; font-weight: bold; border-left: 5px solid #ffcc00; display: inline-block; margin-top: 20px; text-align: left; line-height: 1.8; border-radius: 4px; font-size: 1.1em; }
        .warn { color: #ff3333; font-weight: bold; animation: blink 1.5s infinite; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
    </style>
</head>
<body>
    <div class="box">
        <h1>ADMINISTRATOR CONTROL PANEL</h1>
        <hr color="#33ff33">
        <p>Infection Target: <span class="warn">"蟲" (Infection-v2.6)</span></p>
        <p>Memory Core State: <span class="warn">MUTATING</span></p>
        <p>Target Kernel Lockfile: <code>kernel.lock</code></p>
        <div class="code">
            <strong>[SECURITY PROTOCOL] SYSTEM TERMINATION FLOW:</strong><br>
            1. "蟲" keeps its core process alive by continuously maintaining writing handles to <code>kernel.lock</code>.<br>
            2. To terminate the process, you must deny its write privileges.<br>
            3. <strong style="color: #ff3333;">Action:</strong> Right-click <code>kernel.lock</code> &rarr; Properties &rarr; Check "Read-only" &rarr; Apply.<br>
               (Or run command: <code>attrib +r kernel.lock</code> in a separate terminal)<br>
            4. Once write access is stripped, execute the command <code style="color: #33ff33;">purge</code> in your recovery console.
        </div>
    </div>
</body>
</html>
      `);
    } else {
      res.status(403).send(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>System Admin Console - 403 Forbidden</title>
    <style>
        body { background: #0c0202; color: #ff3333; font-family: 'Courier New', Courier, monospace; padding: 50px; text-align: center; }
        h1 { font-size: 3em; margin-bottom: 20px; text-shadow: 0 0 10px #ff3333; }
        p { font-size: 1.2em; color: #999; }
        .box { border: 2px red solid; padding: 30px; max-width: 650px; margin: 0 auto; background: #1a0505; box-shadow: 0 0 20px rgba(255, 51, 51, 0.3); border-radius: 8px; }
        .hint { color: #555; margin-top: 40px; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="box">
        <h1>403 FORBIDDEN</h1>
        <hr color="red">
        <p>ERROR CODE: ACCESS_UNPRIVILEGED</p>
        <p>The "蟲" has encrypted the main page with a token filter. Connection is blocked because you are currently authenticated as a standard guest.</p>
        <p style="color: #ffaa00;">Please modify your administrative browser credentials to access the purge console.</p>
        <div class="hint">System log fingerprint detected in headers.</div>
    </div>
</body>
</html>
      `);
    }
  });

  const server = app.listen(8080, () => {
    console.log(`\n==================================================================`);
    console.log(`${GREEN}${BOLD}[+] SUCCESS: Web Portal unlocked at http://localhost:8080${RESET}`);
    console.log(`${CYAN}[+] Shell session hijacked. Interactive Administrator Console active.${RESET}`);
    console.log(`${CYAN}[+] Type 'help' to view available diagnostic tools.${RESET}`);
    console.log(`==================================================================\n`);
    
    startShellLoop(server);
  });
}

function startShellLoop(server) {
  const shell = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const prompt = () => {
    shell.question(`${BOLD}${CYAN}Operator@System_Recovery>${RESET} `, (cmd) => {
      const parts = cmd.trim().split(/\s+/);
      const action = parts[0].toLowerCase();

      switch (action) {
        case 'help':
          console.log(`\nAvailable administrative tools:`);
          console.log(`  ${BOLD}help${RESET}         - Display this troubleshooting interface.`);
          console.log(`  ${BOLD}status${RESET}       - Check physical sector, Web server, and lockfile state.`);
          console.log(`  ${BOLD}purge${RESET}        - Inject memory clearance thread to terminate "蟲" process.`);
          console.log(`  ${BOLD}exit${RESET}         - Exit the recovery environment (leaves system vulnerable).\n`);
          break;

        case 'status':
          console.log(`\n==================================================================`);
          console.log(`DIAGNOSTIC STATUS REPORT:`);
          console.log(`- Web Portal Server:  ${GREEN}RUNNING (Port 8080)${RESET}`);
          console.log(`- Recovery Mode:      ${GREEN}ACTIVE${RESET}`);

          const lockPath = path.join(__dirname, 'kernel.lock');
          if (fs.existsSync(lockPath)) {
            let isReadOnly = false;
            try {
              fs.appendFileSync(lockPath, '');
              isReadOnly = false;
            } catch (e) {
              isReadOnly = true;
            }

            if (isReadOnly) {
              console.log(`- kernel.lock state:  ${GREEN}STRIPPED (Read-Only)${RESET}`);
              console.log(`- "蟲" state:         ${YELLOW}LOCKED OUT (Vulnerable)${RESET}`);
            } else {
              console.log(`- kernel.lock state:  ${RED}INSECURE (Writable)${RESET}`);
              console.log(`- "蟲" state:         ${RED}ACTIVE (Feeding on Lockfile)${RESET}`);
            }
          } else {
            console.log(`- kernel.lock state:  ${RED}MISSING (Host destroyed lockfile)${RESET}`);
          }
          console.log(`==================================================================\n`);
          break;

        case 'purge':
          const targetPath = path.join(__dirname, 'kernel.lock');
          if (!fs.existsSync(targetPath)) {
            console.log(`\n${RED}${BOLD}[ERROR] PURGE FAILED: TARGET FILE MISSING${RESET}`);
            console.log(`[!] "kernel.lock" was not found in the game directory.`);
            console.log(`[!] Please create a blank file named "kernel.lock" to serve as a confinement container.\n`);
            break;
          }

          let isWritable = true;
          try {
            fs.accessSync(targetPath, fs.constants.W_OK);
            isWritable = true;
          } catch (e) {
            isWritable = false;
          }

          if (isWritable) {
            console.log(`\n${RED}${BOLD}[ERROR] PURGE FAILED: EACCES - ACTIVE THREAD HOLDS WRITE LOCK${RESET}`);
            console.log(`[!] Connection attempt timed out.`);
            console.log(`[!] The "蟲" is still feeding on 'kernel.lock' and maintaining write lock.`);
            console.log(`[!] Deny write privileges from "kernel.lock" first, then retry.\n`);
          } else {
            console.log(`\n${YELLOW}[+] Confinement established. Denying write access to kernel.lock... OK.${RESET}`);
            console.log(`${CYAN}[+] Memory clearance code injecting...${RESET}`);

            let progress = 0;
            const interval = setInterval(() => {
              progress += 20;
              console.log(`${CYAN}[+] Purging "蟲" memory segments... ${progress}%${RESET}`);
              if (progress >= 100) {
                clearInterval(interval);
                console.log(`\n${GREEN}${BOLD}==================================================================`);
                console.log(`[SUCCESS] ALL PHYSICAL AND VIRTUAL SECTORS PURGED AND RESTORED.`);
                console.log(`==================================================================${RESET}`);
                console.log(`${GREEN}[+] Host connection clean.`);
                console.log(`[+] Web portal server shut down.`);
                console.log(`[+] "蟲" has been permanently deleted from the system core.`);
                console.log(`[+] Thank you for restoring safety, Operator. Clean boot successful.`);
                console.log(`${GREEN}${BOLD}==================================================================${RESET}\n`);

                // Cleanup dynamically created assets to leave environment clean
                try {
                  const sysLogsDir = path.join(__dirname, 'System_Logs');
                  const sysFileLoc = path.join(sysLogsDir, 'sector_0.sys');
                  execSync(`attrib -h -s "${sysFileLoc}"`);
                  fs.unlinkSync(sysFileLoc);
                  execSync(`attrib -h "${sysLogsDir}"`);
                  fs.rmdirSync(sysLogsDir);
                  fs.unlinkSync(targetPath);
                } catch(e) {}

                server.close();
                shell.close();
                process.exit(0);
              }
            }, 500);
            return;
          }
          break;

        case 'exit':
          console.log(`\n${YELLOW}[!] Warning: Exiting will leave the "蟲" active on your computer.${RESET}`);
          shell.question(`Are you sure you want to exit? (y/n): `, (ans) => {
            if (ans.trim().toLowerCase() === 'y') {
              console.log(`${RED}[!] Security aborted. Operator left. Sector 7 remains infected.${RESET}`);
              server.close();
              shell.close();
              process.exit(0);
            } else {
              prompt();
            }
          });
          return;

        default:
          if (cmd.trim()) {
            console.log(`${RED}Command not recognized: '${cmd.trim()}'. Type 'help' for diagnostics.${RESET}`);
          }
          break;
      }

      prompt();
    });
  };

  prompt();
}

main().catch(console.error);
