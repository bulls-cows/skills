import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import { extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = fileURLToPath(new URL('.', import.meta.url))
const projectRoot = resolve(scriptDir, '..')
const checkOnly = process.argv.includes('--check')

const ignoredDirectoryNames = new Set([
  '.git',
  '.idea',
  '.vscode',
  'coverage',
  'dist',
  'node_modules',
])

const textExtensions = new Set([
  '.css',
  '.env',
  '.eslintignore',
  '.gitattributes',
  '.gitignore',
  '.html',
  '.js',
  '.json',
  '.md',
  '.mts',
  '.scss',
  '.ts',
  '.tsx',
  '.vue',
  '.yaml',
  '.yml',
])

const textBaseNames = new Set(['.editorconfig', '.prettierignore', '.prettierrc', 'README'])

type ConvertResult = {
  scannedFileCount: number
  convertedFileCount: number
}

function isTextFile(filePath: string) {
  const fileName = filePath.split(/[\\/]/).pop() ?? ''
  const extension = extname(fileName).toLowerCase()

  return textExtensions.has(extension) || textBaseNames.has(fileName)
}

async function convertDirectory(directoryPath: string): Promise<ConvertResult> {
  const entries = await readdir(directoryPath, { withFileTypes: true })

  let scannedFileCount = 0
  let convertedFileCount = 0

  for (const entry of entries) {
    const targetPath = join(directoryPath, entry.name)

    if (entry.isDirectory()) {
      if (ignoredDirectoryNames.has(entry.name)) {
        continue
      }

      const nestedResult = await convertDirectory(targetPath)
      scannedFileCount += nestedResult.scannedFileCount
      convertedFileCount += nestedResult.convertedFileCount
      continue
    }

    if (!entry.isFile() || !isTextFile(targetPath)) {
      continue
    }

    const fileStats = await stat(targetPath)

    if (fileStats.size === 0) {
      continue
    }

    const content = await readFile(targetPath, 'utf8')
    scannedFileCount += 1

    if (!content.includes('\r\n')) {
      continue
    }

    const normalizedContent = content.replace(/\r\n/g, '\n')
    const relativePath = relative(projectRoot, targetPath).replaceAll('\\', '/')

    if (checkOnly) {
      console.log(`[check] ${relativePath}`)
    } else {
      await writeFile(targetPath, normalizedContent, 'utf8')
      console.log(`[updated] ${relativePath}`)
    }

    convertedFileCount += 1
  }

  return {
    scannedFileCount,
    convertedFileCount,
  }
}

const result = await convertDirectory(projectRoot)
const actionLabel = checkOnly ? '可转换' : '已转换'

console.log(
  `${actionLabel}文件 ${result.convertedFileCount} 个，已扫描文本文件 ${result.scannedFileCount} 个`,
)
