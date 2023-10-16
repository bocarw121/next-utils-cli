import { camelCase, upperFirst } from 'lodash'
import { red, green } from 'ansicolor'

import { addContentToPath, createDirRecursively, createFile } from '../commands'
import { component } from '../templates/components'
import { componentPrompt } from '../prompts'

type ComponentCommand = {
  name: string
  path: string
}

export async function handleComponentCreation(cmd: ComponentCommand) {
  const { name, path } = cmd

  const { selectedName, clientComponent, customPath, selectedPath } =
    await componentPrompt()

  handleComponentErrors(selectedName, name, selectedPath, path)

  // Passed in arguments should take precedence over prompts
  const pathToCreate = customPath
    ? `${name || selectedName}/${path || selectedPath}`
    : selectedPath

  const componentName = upperFirst(camelCase(selectedName || name))

  const fullPath = createPath(pathToCreate, componentName)

  handleComponentFiles(fullPath, componentName, clientComponent)

  console.log(
    green(`Successfully created ${componentName} component at ${fullPath}`)
  )
}

function createPath(path: string, componentName: string) {
  const fullPath = `${path}/${componentName}`

  createDirRecursively(fullPath)

  return fullPath
}

function handleComponentFiles(
  fullPath: string,
  componentName: string,
  clientComponent: boolean
) {
  const componentFile = `${fullPath}/${componentName}.tsx`
  const indexTs = `${fullPath}/index.ts`

  createFile(componentFile)
  createFile(indexTs)

  const createdComponent = component(componentName, clientComponent)

  addContentToPath(componentFile, createdComponent)

  const exportStatement = `export * from './${componentName}'`

  addContentToPath(indexTs, exportStatement)
}

function handleComponentErrors(
  selectedName: string,
  name: string,
  selectedPath: string,
  path: string
) {
  if (!selectedName && !name) {
    console.error(red('You must provide a name for the component'))
    process.exit(1)
  }

  if (!selectedPath && !path) {
    console.error(red('You must provide a path for the component'))
    process.exit(1)
  }
}
