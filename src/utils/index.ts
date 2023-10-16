import { green, red } from 'ansicolor'
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

export function handleErrors(
  selectedName: string,
  name: string,
  selectedPath: string,
  path: string
) {
  if (!selectedName && !name) {
    console.error(red('You must provide a name'))
    process.exit(1)
  }

  if (!selectedPath && !path) {
    console.error(red('You must provide a path'))
    process.exit(1)
  }
}

export function handleSuccess(fullPath: string, componentName: string) {
  console.log(
    green(`Successfully created ${componentName} component at ${fullPath}`)
  )
}
