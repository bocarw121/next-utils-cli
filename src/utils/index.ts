import shell from 'shelljs'
import fs from 'fs/promises'
import path from 'path'

export async function listOfDirectories() {
  const currentPath = shell.pwd().stdout
  const directories = []

  const checkAndAddDirectories = async (baseDir) => {
    const dirPath = path.join(currentPath, baseDir)

    try {
      const dir = await fs.readdir(dirPath, { withFileTypes: true })

      directories.push(
        ...dir
          .filter(
            (item) =>
              item.isDirectory() &&
              item.name !== 'node_modules' &&
              item.name === 'app'
          )
          .map((item) => ({
            title: item.name,
            value: path.join(dirPath, item.name),
          }))
      )
    } catch (err) {
      // console.log(red("Couldn't find src/ or app/ directories."))
      // process.exit(1)
    }
  }

  // Check for src/ directory
  await checkAndAddDirectories('src')

  // Check for app/ directory
  await checkAndAddDirectories('app')

  if (directories.length === 0) {
    throw new Error("Couldn't find src/ or app/ directories.")
  }

  return directories
}

/**
 * Lists directories for components within the current project.
 * Users can add components inside the 'app/', 'src/', and root directories.
 * If the 'src/' directory doesn't exist, users will have the option to recursively create the path.
 *
 * @returns {Promise<Array<{ title: string, value: string }>} An array of directory objects, each with a 'title' and 'value'.
 * @throws {Error} If neither 'src/' nor 'app/' directories exist.
 */
export async function listOfDirectoriesForComponents() {
  const currentPath = shell.pwd().stdout
  const directories = []

  const checkAndAddDirectories = async (baseDir) => {
    const dirPath = path.join(currentPath, baseDir)

    try {
      const dir = await fs.readdir(dirPath, { withFileTypes: true })

      directories.push(
        ...dir
          .filter((item) => item.isDirectory() && item.name !== 'node_modules')
          .map((item) => ({
            title: item.name,
            value: path.join(dirPath, item.name),
          }))
      )
    } catch (err) {
      // Directory doesn't exist; continue without errors
    }
  }

  // Check for src/ directory
  const srcDirExists = await doesDirectoryExist('src')

  // If src/ directory exists, add both src/ and app/
  if (srcDirExists) {
    await checkAndAddDirectories('src')
    directories.push({
      title: 'src',
      value: path.join(currentPath, 'src'),
    })
  }

  // If app/ directory exists, add it
  await checkAndAddDirectories('app')

  if (directories.length === 0) {
    throw new Error("Couldn't find src/ or app/ directories.")
  }

  return directories
}

async function doesDirectoryExist(directoryName) {
  try {
    await fs.access(directoryName)
    return true
  } catch (err) {
    return false
  }
}
