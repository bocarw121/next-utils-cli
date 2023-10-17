import { camelCase, upperFirst } from 'lodash'

import { addContentToPath, createDirRecursively, createFile } from '../commands'
import {
  component,
  componentWithFunctionKeyword,
} from '../templates/components'
import { componentPrompt } from '../prompts'
import { handleErrors } from '../utils/errors'
import { handleSuccess } from '../utils/success'

export async function handleComponentCreation() {
  const {
    selectedName,
    clientComponent,
    customPath,
    selectedPath,
    isFunctionDeclaration,
  } = await componentPrompt('component')

  handleErrors(selectedName, selectedPath)

  // Passed in arguments should take precedence over prompts

  const componentName = upperFirst(camelCase(selectedName))

  const fullPath = createPath(selectedPath, componentName, customPath)

  handleComponentFiles(
    fullPath,
    componentName,
    clientComponent,
    isFunctionDeclaration
  )

  handleSuccess(componentName, 'component')
}

function createPath(path: string, componentName: string, customPath: string) {
  const fullPath = customPath
    ? `${path}/${customPath}/${componentName}`
    : `${path}/${componentName}`

  createDirRecursively(fullPath)

  return fullPath
}

function handleComponentFiles(
  fullPath: string,
  componentName: string,
  clientComponent: boolean,
  isFunctionDeclaration: boolean
) {
  const componentFile = `${fullPath}/${componentName}.tsx`
  const indexTs = `${fullPath}/index.ts`

  createFile(componentFile)
  createFile(indexTs)

  const createdComponent = isFunctionDeclaration
    ? componentWithFunctionKeyword(componentName, clientComponent)
    : component(componentName, clientComponent)

  addContentToPath(componentFile, createdComponent)

  const exportStatement = `export * from './${componentName}'`

  addContentToPath(indexTs, exportStatement)
}
