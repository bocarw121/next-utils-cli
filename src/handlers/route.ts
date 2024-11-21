import {
  dynamicKeyPrompt,
  dynamicRoutePrompt,
  methodPrompt,
  routePrompts,
} from '../prompts'
import {
  handleMethodError,
  handleErrors,
  handleKeyError,
} from '../utils/errors'
import { handleSuccess } from '../utils/success'
import {
  handleDynamicRouteFiles,
  handleRouteFile,
} from '../utils/routeHandlerUtils'
import { getPath } from '../utils/handlerUtils'
import { checkPathInConfigFile, createDirRecursively } from '../commands'
import {
  appDirectoryCheck,
  checkAndWarnIfDirExists,
} from '../utils/directoryChecks'

export async function handleRouteCreation() {
  try {
    const { selectedName, customPath } = await routePrompts()

    const selectedPath = checkPathInConfigFile('page', process.cwd())

    appDirectoryCheck(selectedPath, 'Route')

    handleErrors(selectedName, selectedPath)

    const fullPath = getPath(selectedPath, selectedName, customPath)

    await checkAndWarnIfDirExists(fullPath, 'route')

    const { isDynamicRoute } = await dynamicRoutePrompt()

    const { methods } = await methodPrompt('route')

    handleMethodError(methods)

    createDirRecursively(fullPath)

    const imports = `import { NextResponse } from 'next/server'\n\n`

    handleRouteFile(fullPath, methods, imports)

    if (isDynamicRoute) {
      const { key } = await dynamicKeyPrompt()

      handleKeyError(key)

      const fullDynamicPath = fullPath + `/[${key}]`

      await checkAndWarnIfDirExists(fullDynamicPath, 'route')

      const { methods } = await methodPrompt('dynamic')

      handleMethodError(methods)

      handleDynamicRouteFiles(fullPath, methods, key, imports)
    }

    handleSuccess(selectedName, 'route')
  } catch (error) {
    console.error('An error occurred:', error.message)
    process.exit(1)
  }
}
