import { camelCase, upperFirst } from 'lodash'
import {
  componentPrompt,
  dynamicKeyPrompt,
  dynamicPagePrompt,
  layoutPrompt,
} from '../prompts'

import { addContentToPath, createDirRecursively, createFile } from '../commands'
import {
  layoutComponent,
  page,
  pageWithFunctionKeyword,
} from '../templates/page'
import { handleErrors } from '../utils/errors'
import { handleSuccess } from '../utils/success'

type PageCommand = {
  name: string
  path: string
}

export async function handlePageCreation(cmd: PageCommand) {
  const { name, path } = cmd

  const {
    selectedName,
    clientComponent,
    customPath,
    selectedPath,
    isArrowFunction,
  } = await componentPrompt('page')

  handleErrors(selectedName, name, selectedPath, path)

  const { isLayout } = await layoutPrompt()
  const { isDynamicPage } = await dynamicPagePrompt()

  // Passed in arguments should take precedence over prompts
  const pathToCreate = path || selectedPath

  const pageName = upperFirst(camelCase(selectedName || name))

  const fullPath = createPath(pathToCreate, pageName, customPath)

  if (isDynamicPage) {
    const { key } = await dynamicKeyPrompt()

    handleDynamicPageFiles(
      fullPath,
      pageName,
      clientComponent,
      key,
      isArrowFunction
    )
  }

  handlePageFiles(fullPath, pageName, clientComponent, isArrowFunction)

  if (isLayout) {
    handleLayoutFiles(fullPath, pageName)
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

function handlePageFiles(
  fullPath: string,
  pageName: string,
  clientPage: boolean,
  isArrowFunction: boolean
) {
  const pageFile = `${fullPath}/page.tsx`

  createFile(pageFile)

  const createdPage = isArrowFunction
    ? page(pageName, clientPage)
    : pageWithFunctionKeyword(pageName, clientPage)

  addContentToPath(pageFile, createdPage)
}

function handleLayoutFiles(fullPath: string, pageName: string) {
  const layoutFile = `${fullPath}/layout.tsx`

  createFile(layoutFile)

  const layout = layoutComponent(pageName)

  addContentToPath(layoutFile, layout)
}

function handleDynamicPageFiles(
  fullPath: string,
  pageName: string,
  clientPage: boolean,
  key: string,
  isArrowFunction: boolean
) {
  const dynamicDir = `${fullPath}/[${key}]`

  createDirRecursively(dynamicDir)

  const dynamicPageFile = `${dynamicDir}/page.tsx`

  createFile(dynamicPageFile)

  const dynamicPage = isArrowFunction
    ? page(pageName, clientPage, key)
    : pageWithFunctionKeyword(pageName, clientPage, key)

  addContentToPath(dynamicPageFile, dynamicPage)
}
