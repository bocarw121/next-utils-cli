import { camelCase, upperFirst } from 'lodash'

import {
  componentPrompt,
  dynamicKeyPrompt,
  dynamicPagePrompt,
  layoutPrompt,
} from '../prompts'
import { handleErrors, handleKeyError } from '../utils/errors'
import { handleSuccess } from '../utils/success'
import { createPath } from '../utils/handlerUtils'
import {
  handleDynamicPageFiles,
  handlePageFiles,
  handleLayoutFiles,
} from '../utils/pageHandlerUtils'

export async function handlePageCreation() {
  try {
    const {
      selectedName,
      clientComponent,
      customPath,
      selectedPath,
      isArrowFunction,
    } = await componentPrompt('page')

    handleErrors(selectedName, selectedPath)

    const { isLayout } = await layoutPrompt()
    const { isDynamicPage, isDynamicClientComponent } =
      await dynamicPagePrompt()

    const fullPath = createPath(selectedPath, selectedName, customPath)

    const pageName = upperFirst(camelCase(selectedName))

    if (isDynamicPage) {
      const { key } = await dynamicKeyPrompt()

      handleKeyError(key)

      handleDynamicPageFiles(
        fullPath,
        pageName,
        isDynamicClientComponent,
        key,
        isArrowFunction
      )
    }

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
