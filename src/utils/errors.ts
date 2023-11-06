import { stat, readFile } from 'fs/promises'
import { red } from 'ansicolor'

import { doesDirectoryExist } from './directoryChecks'

export function handleMethodError(methods: string[]) {
  if (!methods.length) {
    console.error(red('You must select at least one method'))
    process.exit(1)
  }
}

export function handleErrors(selectedName: string, selectedPath: string) {
  if (!selectedName) {
    console.error(red('You must provide a name'))
    process.exit(1)
  }

  if (!selectedPath) {
    console.error(red('You must provide a path'))
    process.exit(1)
  }
}

/**
 * Handles errors for dynamic keys
 * If no key is provided, then the program exits with an error message
 * @param key
 */
export function handleKeyError(key: string) {
  if (!key) {
    console.error(red('You must provide a dynamic name'))
    process.exit(1)
  }
}

export async function checkIfValidAppRouterProject() {
  const appDirExists = await doesDirectoryExist('app')
  const appDirExistsInSrc = await doesDirectoryExist('src/app')
  const isNextVersion13 = await isNextVersionAtLeast13()

  if (!isNextVersion13) {
    console.error(
      red(
        'You must be using Next.js version 13 or higher to use next-utils-cli.'
      )
    )
    process.exit(1)
  }

  if (!appDirExists && !appDirExistsInSrc) {
    console.error(
      red(
        'No app/ directory exists. Please make sure your in a next js project with the app router.'
      )
    )
    process.exit(1)
  }
}

async function isNextVersionAtLeast13() {
  const isPackageJson = await stat('package.json')

  if (!isPackageJson.isFile()) {
    return false
  }

  const packageJson = await readFile('package.json', 'utf-8')

  const { dependencies } = JSON.parse(packageJson)

  const nextVersion = dependencies?.next?.replace('^', '')

  if (!nextVersion) {
    return false
  }

  const nextMajorVersion = nextVersion.split('.').map(Number)[0]

  return nextMajorVersion >= 13
}
