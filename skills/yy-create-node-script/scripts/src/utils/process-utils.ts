export async function delayProcessExit(code: number, delay = 100): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, delay);
  });
  process.exit(code);
}
