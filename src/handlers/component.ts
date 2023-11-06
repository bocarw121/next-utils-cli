import { camelCase, upperFirst } from 'lodash'

import { addContentToPath, createDirRecursively, createFile } from '../commands'
import {
  component,
  componentWithFunctionKeyword,
} from '../templates/components'
import { componentPrompt } from '../prompts'
import { handleErrors } from '../utils/errors'
import { handleSuccess } from '../utils/success'
import { getPath } from '../utils/handlerUtils'

export async function handleComponentCreation() {
  const {
    selectedName,
    clientComponent,
    customPath,
    selectedPath,
    isFunctionDeclaration,
  } = await componentPrompt()

  handleErrors(selectedName, selectedPath)

  const componentName = upperFirst(camelCase(selectedName))

  const fullPath = getPath(selectedPath, componentName, customPath)

  createDirRecursively(fullPath)

  handleComponentFiles(
    fullPath,
    componentName,
    clientComponent,
    isFunctionDeclaration
  )

  handleSuccess(componentName, 'component')
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
