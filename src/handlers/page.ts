import { camelCase, upperFirst } from 'lodash'

import {
  dynamicKeyPrompt,
  dynamicPagePrompt,
  layoutPrompt,
  pagePrompt,
  composeCachePromptResult,
} from '../prompts'
import { handleErrors, handleKeyError } from '../utils/errors'
import { handleSuccess } from '../utils/success'
import { getPath } from '../utils/handlerUtils'
import {
  handleDynamicPageFiles,
  handlePageFiles,
  handleLayoutFiles,
} from '../utils/pageHandlerUtils'
import { checkPathInConfigFile, createDirRecursively } from '../commands'
import {
  appDirectoryCheck,
  checkAndWarnIfDirExists,
} from '../utils/directoryChecks'
import { red, yellow } from 'ansicolor'

export async function handlePageCreation() {
  try {
    const {
      selectedName,
      clientComponent,
      customPath,
      isArrowFunction,
      useCache,
      cacheLifeProfile,
    } = await pagePrompt()

    const selectedPath = checkPathInConfigFile('page', process.cwd())

    appDirectoryCheck(selectedPath, 'Page')

    handleErrors(selectedName, selectedPath)

    const { isLayout } = await layoutPrompt()
    const { isDynamicPage, isDynamicClientComponent } =
      await dynamicPagePrompt()

    const fullPath = getPath(selectedPath, selectedName, customPath)

    await checkAndWarnIfDirExists(fullPath, 'page')

    const pageName = upperFirst(camelCase(selectedName))

    if (clientComponent && useCache) {
      console.log(
        yellow(
          'Ignoring the "use cache" directive because client components cannot be cached.'
        )
      )
    }

    const cacheResult = composeCachePromptResult({
      clientComponent,
      useCache,
      cacheLifeProfile,
    })

    if (isDynamicPage) {
      const { key } = await dynamicKeyPrompt()

      handleKeyError(key)

      const fullDynamicPath = fullPath + `/[${key}]`

      await checkAndWarnIfDirExists(fullDynamicPath, 'page')

      createDirRecursively(fullPath)

      const dynamicShouldUseCache =
        !isDynamicClientComponent && cacheResult.useCache

      handleDynamicPageFiles({
        basePath: fullPath,
        pageName,
        clientComponent: isDynamicClientComponent,
        dynamicKey: key,
        isArrowFunction,
        useCache: dynamicShouldUseCache,
        cacheLifeProfile: dynamicShouldUseCache
          ? cacheResult.cacheLifeProfile
          : 'none',
      })
    }

    createDirRecursively(fullPath)

    handlePageFiles(fullPath, {
      pageName,
      clientComponent,
      isArrowFunction,
      useCache: cacheResult.useCache,
      cacheLifeProfile: cacheResult.cacheLifeProfile,
    })

    if (isLayout) {
      handleLayoutFiles(fullPath, pageName)
    }

    handleSuccess(pageName, 'page')
  } catch (error) {
    console.error('An error occurred:', error.message)
    process.exit(1)
  }
}
