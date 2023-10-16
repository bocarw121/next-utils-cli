import fs from 'fs/promises'
import path from 'path'

export async function listOfDirectories(componentPath: string) {
  const dir = await fs.readdir(componentPath, { withFileTypes: true })

  return dir
    .filter(
      (item) =>
        item.isDirectory() &&
        item.name !== 'node_modules' &&
        !item.name.startsWith('.')
    )
    .map((item) => {
      return {
        title: item.name,
        value: path.join(componentPath, item.name), // Provide the full path to the directory
      }
    })
}
