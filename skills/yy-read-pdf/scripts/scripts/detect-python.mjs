import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const candidates = ["python3", "python"];

for (const cmd of candidates) {
  try {
    execSync(`${cmd} --version`, { stdio: "ignore" });
    writeFileSync("python_cmd.txt", cmd);
    console.log(`Detected Python command: ${cmd}`);
    process.exit(0);
  } catch {
    // continue to next candidate
  }
}

console.error("No Python interpreter found");
process.exit(1);
