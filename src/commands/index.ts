import shell from 'shelljs'
import * as fs from 'fs'
import * as path from 'path'
import { red } from 'ansicolor'

export const createDirRecursively = (path: string) => {
  shell.mkdir('-p', path)
}
export const createFile = (path: string) => {
  shell.touch(path)
}

export const addContentToPath = (path: string, content: string) => {
  shell.ShellString(content).to(path)
}

export const appendContentToPath = (path: string, content: string) => {
  shell.ShellString(content).toEnd(path)
}

export const changeDirectory = (path: string) => {
  shell.cd(path)
}

export const checkIfDirectoryExists = (path: string) => {
  return shell.test('-d', path)
}

export const checkIfFileExists = (path: string) => {
  return shell.test('-f', path)
}

export const checkPathInConfigFile = (
  prop: 'component' | 'page' | 'route' | 'action',
  appRoot: string // Accept the user's app root directory
) => {
  const configPath = path.resolve(appRoot, 'next-utils-cli.json')

  // Check if the file exists before trying to load it
  if (!fs.existsSync(configPath)) {
    console.error(
      red(
        'next-utils-cli.json file does not exist. Please run the init command.'
      )
    )

    process.exit(1)
  }

  // Load the config file
  const config = require(configPath)

  // Check if the required property exists in the config
  if (!config[prop]) {
    console.error(
      red(
        `The path for ${prop} is not set in next-utils-cli.json. Make sure pages and routes start from the app directory`
      )
    )
    process.exit(1)
  }

  return config[prop]
}
