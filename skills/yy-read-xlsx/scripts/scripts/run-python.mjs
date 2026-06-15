import { execSync, execFileSync } from "node:child_process";

const candidates = ["python3", "python"];
let pythonCmd = "python";

for (const cmd of candidates) {
  try {
    execSync(`${cmd} --version`, { stdio: "ignore" });
    pythonCmd = cmd;
    break;
  } catch {
    // continue to next candidate
  }
}

execFileSync(pythonCmd, process.argv.slice(2), { stdio: "inherit" });
