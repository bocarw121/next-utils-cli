import { camelCase, upperFirst } from 'lodash'

import {
  dynamicKeyPrompt,
  dynamicPagePrompt,
  layoutPrompt,
  pagePrompt,
} from '../prompts'
import { handleErrors, handleKeyError } from '../utils/errors'
import { handleSuccess } from '../utils/success'
import { getPath } from '../utils/handlerUtils'
import {
  handleDynamicPageFiles,
  handlePageFiles,
  handleLayoutFiles,
} from '../utils/pageHandlerUtils'
import { createDirRecursively } from '../commands'
import { checkAndWarnIfDirExists } from '../utils/directoryChecks'

export async function handlePageCreation() {
  try {
    const {
      selectedName,
      clientComponent,
      customPath,
      selectedPath,
      isArrowFunction,
    } = await pagePrompt()

    handleErrors(selectedName, selectedPath)

    const { isLayout } = await layoutPrompt()
    const { isDynamicPage, isDynamicClientComponent } =
      await dynamicPagePrompt()

    const fullPath = getPath(selectedPath, selectedName, customPath)

    await checkAndWarnIfDirExists(fullPath, 'page')

    const pageName = upperFirst(camelCase(selectedName))

    if (isDynamicPage) {
      const { key } = await dynamicKeyPrompt()

      handleKeyError(key)

      createDirRecursively(fullPath)

      handleDynamicPageFiles(
        fullPath,
        pageName,
        isDynamicClientComponent,
        key,
        isArrowFunction
      )
    }

    createDirRecursively(fullPath)

    handlePageFiles(fullPath, pageName, clientComponent, isArrowFunction)

    if (isLayout) {
      handleLayoutFiles(fullPath, pageName)
    }

    handleSuccess(pageName, 'page')
  } catch (error) {
    console.error('An error occurred:', error.message)
    process.exit(1)
  }
}
