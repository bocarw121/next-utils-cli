import fs from 'fs/promises'
import path from 'path'

const CONFIG_CANDIDATES = [
  'next.config.ts',
  'next.config.js',
  'next.config.mjs',
  'next.config.cjs',
  'next.config.mts',
]

type ConfigOptions = {
  cacheComponents?: boolean
  reactCompiler?: boolean
}

export async function ensureNextConfigOptions(options: ConfigOptions) {
  const cwd = process.cwd()
  const targetPath = await resolveConfigPath(cwd)

  if (!targetPath) {
    return null
  }

  const fullPath = path.join(cwd, targetPath)
  const exists = await fileExists(fullPath)

  if (!exists) {
    await createNewConfig(fullPath, options)
    return targetPath
  }

  const original = await fs.readFile(fullPath, 'utf-8')
  const updated = applyOptionsToContent(original, options)

  if (updated === null) {
    return null
  }

  if (updated !== original) {
    await fs.writeFile(fullPath, updated, 'utf-8')
  }

  return targetPath
}

async function resolveConfigPath(root: string) {
  for (const candidate of CONFIG_CANDIDATES) {
    if (await fileExists(path.join(root, candidate))) {
      return candidate
    }
  }

  const tsConfigExists = await fileExists(path.join(root, 'tsconfig.json'))

  return tsConfigExists ? 'next.config.ts' : 'next.config.js'
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  } catch (_) {
    return false
  }
}

async function createNewConfig(filePath: string, options: ConfigOptions) {
  const ext = path.extname(filePath)
  const useTs = ext === '.ts' || ext === '.mts'
  const lines: string[] = []

  if (useTs) {
    lines.push("import type { NextConfig } from 'next'")
    lines.push('')
    lines.push('const nextConfig: NextConfig = {')
  } else {
    lines.push("/** @type {import('next').NextConfig} */")
    lines.push('const nextConfig = {')
  }

  if (options.cacheComponents) {
    lines.push('  cacheComponents: true,')
  }

  if (options.reactCompiler) {
    lines.push('  reactCompiler: true,')
  }

  lines.push('}')
  lines.push('')

  if (useTs) {
    lines.push('export default nextConfig')
  } else {
    lines.push('module.exports = nextConfig')
  }

  lines.push('')

  await fs.writeFile(filePath, lines.join('\n'), 'utf-8')
}

function applyOptionsToContent(content: string, options: ConfigOptions) {
  let updatedContent = content
  let changed = false

  const optionEntries: Array<[keyof ConfigOptions, string]> = [
    ['cacheComponents', 'true'],
    ['reactCompiler', 'true'],
  ]

  for (const [key, value] of optionEntries) {
    if (!options[key]) {
      continue
    }

    if (updatedContent.includes(`${key}:`)) {
      continue
    }

    const inserted = insertTopLevelOption(updatedContent, key, value)

    if (!inserted) {
      return null
    }

    updatedContent = inserted
    changed = true
  }

  return changed ? updatedContent : content
}

function insertTopLevelOption(content: string, key: string, value: string) {
  const patterns = [
    /module\.exports\s*=\s*{/, // CommonJS
    /export\s+default\s*{/, // ESM direct export
    /const\s+nextConfig[^=]*=\s*{/, // const nextConfig = {
  ]

  for (const pattern of patterns) {
    const match = pattern.exec(content)

    if (!match) {
      continue
    }

    const insertIndex = match.index + match[0].length
    const before = content.slice(0, insertIndex)
    const after = content.slice(insertIndex)
    const newline = before.endsWith('\n') ? '' : '\n'

    return `${before}${newline}  ${key}: ${value},${after}`
  }

  return null
}
