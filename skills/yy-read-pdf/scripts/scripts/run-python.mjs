import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

let pythonCmd = "python";
try {
  pythonCmd = readFileSync("python_cmd.txt", "utf8").trim();
} catch {
  // fallback to python if python_cmd.txt not found
}

execFileSync(pythonCmd, process.argv.slice(2), { stdio: "inherit" });
