import fs from 'fs/promises'
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
  const packageJson = await fs.readFile('package.json', 'utf-8')

  const { dependencies } = JSON.parse(packageJson)

  const nextVersion = dependencies.next.replace('^', '')

  const nextMajorVersion = nextVersion.split('.').map(Number)[0]

  return nextMajorVersion >= 13
}
