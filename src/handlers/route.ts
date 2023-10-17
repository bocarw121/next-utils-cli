import { camelCase, upperFirst } from 'lodash'
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

type RouteCommand = {
  name: string
  path: string
}

export async function handleRouteCreation(cmd: RouteCommand) {
  const { name, path } = cmd

  const { selectedName, customPath, selectedPath } = await routePrompts()

  handleErrors(selectedName, name, selectedPath, path)

  const { isDynamicPage } = await dynamicPagePrompt()

  const { methods } = await methodPrompt('route')

  handleMethodError(methods)

  // Passed in arguments should take precedence over prompts
  const pathToCreate = path || selectedPath

  const pageName = selectedName || name

  const fullPath = createPath(pathToCreate, pageName, customPath)

  handleRouteFile(fullPath, methods)

  if (isDynamicPage) {
    const { key } = await dynamicKeyPrompt()

    const { methods } = await methodPrompt('dynamic')

    handleDynamicPageFiles(fullPath, methods, key)
  }

  handleSuccess(fullPath, pageName)
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
