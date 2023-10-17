import {
  dynamicKeyPrompt,
  dynamicPagePrompt,
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

    const { isDynamicPage } = await dynamicPagePrompt()

    const { methods } = await methodPrompt('route')

    handleMethodError(methods)

    const fullPath = createPath(selectedPath, selectedName, customPath)

    handleRouteFile(fullPath, methods)

    if (isDynamicPage) {
      const { key } = await dynamicKeyPrompt()

      const { methods } = await methodPrompt('dynamic')

      handleDynamicPageFiles(fullPath, methods, key)
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

function handleRouteFile(fullPath: string, methods: string[]) {
  const routeFile = `${fullPath}/route.ts`

  createFile(routeFile)

  addContentToPath(routeFile, `import { NextResponse } from 'next/server'\n`)

  handleMethod(routeFile, methods)
}

function handleDynamicPageFiles(
  fullPath: string,
  methods: string[],
  key: string
) {
  const dynamicDir = `${fullPath}/[${key}]`

  createDirRecursively(dynamicDir)

  const dynamicPageFile = `${dynamicDir}/route.ts`

  createFile(dynamicPageFile)

  addContentToPath(
    dynamicPageFile,
    `import { NextResponse } from 'next/server'\n`
  )

  handleMethod(dynamicPageFile, methods)
}

function handleMethod(routeFile: string, methods: string[]) {
  for (const method of methods) {
    appendContentToPath(
      routeFile,
      handleTemplates[method as keyof typeof handleTemplates]
    )
  }
}
