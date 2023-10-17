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
import { createPath } from '../utils/handlerUtils'

export async function handleRouteCreation() {
  try {
    const { selectedName, customPath, selectedPath } = await routePrompts()

    handleErrors(selectedName, selectedPath)

    const { isDynamicRoute } = await dynamicRoutePrompt()

    const { methods } = await methodPrompt('route')

    handleMethodError(methods)

    const fullPath = createPath(selectedPath, selectedName, customPath)

    const imports = `import { NextResponse } from 'next/server'\n\n`

    handleRouteFile(fullPath, methods, imports)

    if (isDynamicRoute) {
      const { key } = await dynamicKeyPrompt()

      handleKeyError(key)

      const { methods } = await methodPrompt('dynamic')

      handleMethodError(methods)

      handleDynamicRouteFiles(fullPath, methods, key, imports)
    }

    handleSuccess(fullPath, selectedName)
  } catch (error) {
    console.error('An error occurred:', error.message)
    process.exit(1)
  }
}
