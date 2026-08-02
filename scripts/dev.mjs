import { spawn } from "node:child_process";
import net from "node:net";
import { resolve } from "node:path";

const rootDir = resolve(process.cwd());
const backendDir = resolve(rootDir, "backend-node");

function start(command, args, cwd, label) {
  const child = spawn(command, args, {
    cwd,
    stdio: "inherit",
    env: process.env,
  });

  child.on("exit", (code, signal) => {
    const exitCode = typeof code === "number" ? code : signal ? 1 : 0;
    console.log(`[${label}] exited with code ${exitCode}`);
    process.exitCode = exitCode;
    shutdown();
  });

  return child;
}

function isPortOpen(port) {
  return new Promise((resolveResult) => {
    const socket = net.createConnection({ port, host: "127.0.0.1" });
    const done = (value) => {
      socket.removeAllListeners();
      socket.destroy();
      resolveResult(value);
    };

    socket.setTimeout(500);
    socket.once("connect", () => done(true));
    socket.once("timeout", () => done(false));
    socket.once("error", () => done(false));
  });
}

let shuttingDown = false;
const children = [];

const backendArgs =
  process.platform === "win32"
    ? ["/d", "/s", "/c", "npm run dev"]
    : ["run", "dev"];

const frontendArgs =
  process.platform === "win32"
    ? ["/d", "/s", "/c", "npm exec vite -- --host"]
    : ["exec", "vite", "--", "--host"];

const npmCommand = process.platform === "win32" ? "cmd.exe" : "npm";

const backendOpen = await isPortOpen(8000);
if (backendOpen) {
  console.log("[backend] port 8000 already in use, assuming backend is already running");
} else {
  children.push(start(npmCommand, backendArgs, backendDir, "backend"));
}

const frontendOpen = await isPortOpen(3000);
if (frontendOpen) {
  console.log("[frontend] port 3000 already in use, assuming frontend is already running");
} else {
  children.push(start(npmCommand, frontendArgs, rootDir, "frontend"));
}

if (children.length === 0) {
  console.log("[dev] both ports are already active; nothing to start");
  process.exit(0);
}

function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (!child.killed) {
      child.kill("SIGTERM");
    }
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
