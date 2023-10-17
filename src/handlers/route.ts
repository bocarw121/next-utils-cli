import {
  dynamicKeyPrompt,
  dynamicPrompt,
  methodPrompt,
  routePrompts,
} from '../prompts'
import {
  addContentToPath,
  appendContentToPath,
  createDirRecursively,
  createFile,
} from '../commands'
import { handleTemplates } from '../templates/route'
import { handleMethodError, handleErrors } from '../utils/errors'
import { handleSuccess } from '../utils/success'

export async function handleRouteCreation() {
  try {
    const { selectedName, customPath, selectedPath } = await routePrompts()

    handleErrors(selectedName, selectedPath)

    const { isDynamicRoute } = await dynamicPrompt('Route')

    const { methods } = await methodPrompt('route')

    handleMethodError(methods)

    const fullPath = createPath(selectedPath, selectedName, customPath)

    const imports = `import { NextResponse } from 'next/server'\n\n`

    handleRouteFile(fullPath, methods, imports)

    if (isDynamicRoute) {
      const { key } = await dynamicKeyPrompt()

      const { methods } = await methodPrompt('dynamic')

      handleDynamicRouteFiles(fullPath, methods, key, imports)
    }

    handleSuccess(fullPath, selectedName)
  } catch (error) {
    console.error('An error occurred:', error.message)
    process.exit(1)
  }
}

function createPath(path: string, pageName: string, customPath: string) {
  const fullPath = customPath
    ? `${path}/${customPath}/${pageName}`
    : `${path}/${pageName}`

  createDirRecursively(fullPath)

  return fullPath
}

function handleRouteFile(fullPath: string, methods: string[], imports: string) {
  const routeFile = `${fullPath}/route.ts`

  createFile(routeFile)

  addContentToPath(routeFile, imports)

  handleMethod(routeFile, methods)
}

function handleDynamicRouteFiles(
  fullPath: string,
  methods: string[],
  key: string,
  imports: string
) {
  const dynamicDir = `${fullPath}/[${key}]`

  createDirRecursively(dynamicDir)

  const dynamicPageFile = `${dynamicDir}/route.ts`

  createFile(dynamicPageFile)

  addContentToPath(dynamicPageFile, imports)

  handleMethod(dynamicPageFile, methods, key)
}

function handleMethod(routeFile: string, methods: string[], key?: string) {
  for (const method of methods) {
    appendContentToPath(
      routeFile,
      handleTemplates(key)[method as keyof typeof handleTemplates]
    )
  }
}
