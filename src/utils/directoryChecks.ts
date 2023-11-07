import { stat } from 'fs/promises'
import { red } from 'ansicolor'

import { prompt } from '../prompts'

export async function doesDirectoryExist(dir: string) {
  try {
    const stats = await stat(dir)

    return stats.isDirectory()
  } catch (_) {
    return false
  }
}

const potentialPageLoss = (dirName: string) => ({
  component: `${dirName || 'componentName'}/index.ts and ${
    dirName || 'componentName'
  }/componentName.tsx`,
  page: `${dirName || 'pageName'}/page.tsx and ${
    dirName || 'pageName'
  }/layout.tsx if selected`,
  route: `${dirName || 'routeName'}/route.ts`,
})

/**
 * Checks if a directory exists and warns the user before proceeding if it does.
 *
 * This function verifies whether the specified directory already exists. If the directory exists, it issues a warning message to the user, seeking confirmation before proceeding. The warning message informs the user about the potential consequences of overwriting existing files related to the specified component type.
 *
 * @param {string} directoryName - The name of the directory to check for existence.
 * @param {string} type - The type of the component being created (e.g., 'component', 'page', 'route').
 *
 * @returns {Promise<void>} - A promise that resolves after checking and potentially warning the user.
 */
export async function checkAndWarnIfDirExists(
  directoryName: string,
  type: 'component' | 'page' | 'route'
) {
  try {
    const dirName = directoryName.split('/').slice(-1)[0]

    if (await doesDirectoryExist(directoryName)) {
      const { shouldContinue } = await prompt([
        {
          type: 'confirm',
          name: 'shouldContinue',
          message: () => {
            const remainingPath = getRemainingPath(directoryName)

            return red(
              `🚨 The directory ${remainingPath} already exists. Do you want to continue? This will overwrite any files related to the ${type} ${
                potentialPageLoss(dirName)[type]
              }.`
            )
          },
          initial: false,
        },
      ])

      if (!shouldContinue) {
        process.exit(1)
      }
    }
  } catch (_) {
    // Directory does not exist, so we can proceed
  }
}

function getRemainingPath(directoryName: string) {
  const pathParts = directoryName.split('/')

  // Find the index of "src/" or "app/"
  const srcIndex = pathParts.indexOf('src')
  const appIndex = pathParts.indexOf('app')

  // Get the remaining path from "src/" or "app/" onward
  let remainingPath = ''
  if (srcIndex !== -1) {
    remainingPath = pathParts.slice(srcIndex).join('/')
  } else if (appIndex !== -1) {
    remainingPath = pathParts.slice(appIndex).join('/')
  }

  return remainingPath
}
