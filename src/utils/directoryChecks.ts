import fs from 'fs/promises'

export async function doesDirectoryExist(dir: string) {
  try {
    const stats = await fs.stat(dir)

    return stats.isDirectory()
  } catch (_) {
    return false
  }
}
