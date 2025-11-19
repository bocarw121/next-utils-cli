import { stat, readFile } from 'fs/promises'
import { red } from 'ansicolor'

import { doesDirectoryExist } from './directoryChecks'

export type AppValidationResult = {
  nextVersion: number
}

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

export async function checkIfValidAppRouterProject(): Promise<AppValidationResult> {
  const appDirExists = await doesDirectoryExist('app')
  const appDirExistsInSrc = await doesDirectoryExist('src/app')
  const nextVersion = await resolveNextJsVersion()

  if (!nextVersion || nextVersion < 13) {
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

  return {
    nextVersion,
  }
}

async function resolveNextJsVersion() {
  let packageFile
  try {
    packageFile = await stat('package.json')
  } catch (_) {
    return null
  }

  if (!packageFile.isFile()) {
    return null
  }

  const packageJson = await readFile('package.json', 'utf-8')

  const { dependencies = {}, devDependencies = {} } = JSON.parse(packageJson)

  const rawVersion = dependencies.next || devDependencies.next

  if (!rawVersion) {
    return null
  }

  const cleaned = rawVersion.replace(/^[^0-9]*/, '')
  const nextMajorVersion = Number.parseInt(cleaned.split('.')[0] ?? '0', 10)

  if (Number.isNaN(nextMajorVersion)) {
    return null
  }

  return nextMajorVersion
}
