import { serverActionPrompt } from '../prompts'
import {
  addContentToPath,
  checkIfDirectoryExists,
  checkPathInConfigFile,
  createDirRecursively,
  createFile,
} from '../commands'
import { handleErrors } from '../utils/errors'
import { green } from 'ansicolor'
import { checkAndWarnIfDirExists } from '../utils/directoryChecks'
import { camelCase } from 'lodash'

export async function handleServerActions() {
  const { selectedName } = await serverActionPrompt()

  const selectedPath = checkPathInConfigFile('action', process.cwd())

  if (!selectedPath) {
    console.error('No path found in the next-utils-cli.json file for actions')
    process.exit(1)
  }

  if (!checkIfDirectoryExists(selectedPath)) {
    createDirRecursively(selectedPath)
  }

  handleErrors(selectedName, selectedPath)

  const createdFile = `${selectedPath}/${selectedName}.ts`

  createFile(createdFile)

  // copy contents from templates/action.ts to the new file
  addContentToPath(
    createdFile,
    `'use server'

export async function ${camelCase(selectedName)}() {}
`
  )
  console.log(
    green(`Successfully created a new server action: ${selectedName}`)
  )
}
