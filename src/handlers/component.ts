import { camelCase, upperFirst } from 'lodash'
import { yellow } from 'ansicolor'

import {
  addContentToPath,
  checkPathInConfigFile,
  createDirRecursively,
  createFile,
} from '../commands'
import { component, componentWithFunctionKeyword } from '../templates'
import { componentPrompt, composeCachePromptResult } from '../prompts'
import { handleErrors } from '../utils/errors'
import { handleSuccess } from '../utils/success'
import { getPath } from '../utils/handlerUtils'
import { checkAndWarnIfDirExists } from '../utils/directoryChecks'

export async function handleComponentCreation() {
  const {
    selectedName,
    clientComponent,
    customPath,
    isFunctionDeclaration,
    useCache,
    cacheLifeProfile,
  } = await componentPrompt()

  const selectedPath = checkPathInConfigFile('component', process.cwd())

  handleErrors(selectedName, selectedPath)

  const componentName = upperFirst(camelCase(selectedName))

  const fullPath = getPath(selectedPath, componentName, customPath)

  await checkAndWarnIfDirExists(fullPath, 'component')

  const cacheResult = composeCachePromptResult({
    clientComponent,
    useCache,
    cacheLifeProfile,
  })

  if (clientComponent && useCache) {
    console.log(
      yellow(
        'Ignoring the "use cache" directive because client components cannot be cached. '
      )
    )
  }

  createDirRecursively(fullPath)

  handleComponentFiles(
    fullPath,
    componentName,
    clientComponent,
    isFunctionDeclaration,
    cacheResult.useCache,
    cacheResult.cacheLifeProfile
  )

  handleSuccess(componentName, 'component')
}

function handleComponentFiles(
  fullPath: string,
  componentName: string,
  clientComponent: boolean,
  isFunctionDeclaration: boolean,
  useCache: boolean,
  cacheLifeProfile?: string
) {
  const componentFile = `${fullPath}/${componentName}.tsx`
  const indexTs = `${fullPath}/index.ts`

  createFile(componentFile)
  createFile(indexTs)

  const createdComponent = isFunctionDeclaration
    ? componentWithFunctionKeyword(
        componentName,
        clientComponent,
        useCache,
        cacheLifeProfile
      )
    : component(componentName, clientComponent, useCache, cacheLifeProfile)

  addContentToPath(componentFile, createdComponent)

  const exportStatement = `export * from './${componentName}'`

  addContentToPath(indexTs, exportStatement)
}
