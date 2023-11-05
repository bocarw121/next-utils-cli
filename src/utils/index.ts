import fs from 'fs/promises'
import path from 'path'
import shell from 'shelljs'

import { doesDirectoryExist } from './directoryChecks'

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
    } catch (err) {}
  }

  const srcDirExists = await doesDirectoryExist('src')

  if (srcDirExists) {
    await checkAndAddDirectories('src')
  }

  const appDirExists = await doesDirectoryExist('app')

  if (appDirExists) {
    // If app/ directory exists, add it
    await checkAndAddDirectories('app')
    directories.push({
      title: 'app',
      value: path.join(currentPath, 'app'),
    })
  }
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

  const checkAndAddDirectories = async (baseDir: 'src' | 'app') => {
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
    } catch (err) {}
  }

  const srcDirExists = await doesDirectoryExist('src')

  // If src/ directory exists, add both src/ and app/
  if (srcDirExists) {
    await checkAndAddDirectories('src')
    directories.push({
      title: 'src',
      value: path.join(currentPath, 'src'),
    })
  }

  const appDirExists = await doesDirectoryExist('app')

  if (appDirExists) {
    // If app/ directory exists, add it as well
    await checkAndAddDirectories('app')
    directories.push({
      title: 'app',
      value: path.join(currentPath, 'app'),
    })
  }

  if (directories.length === 0) {
    throw new Error("Couldn't find src/ or app/ directories.")
  }

  return directories
}
