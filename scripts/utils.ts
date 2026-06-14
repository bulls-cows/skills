import chalk from 'chalk'

export function logInfo(...args: unknown[]): void {
  console.log(...args)
}

export function logWarn(...args: unknown[]): void {
  console.log(chalk.yellow(...args))
}

export function logError(...args: unknown[]): void {
  console.error(chalk.red(...args))
}

export function logSuccess(...args: unknown[]): void {
  console.log(chalk.green(...args))
}

export function timeStart(label: string): () => void {
  logWarn(`${label}: 已开始`)
  const start = Date.now()
  return (): number => {
    const elapsed = Date.now() - start
    logSuccess(`${label}: 已结束，耗时 ${elapsed.toString()}ms.`)
    return elapsed
  }
}
