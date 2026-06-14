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
