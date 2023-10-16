import { camelCase, isFunction, upperFirst } from 'lodash'
import {
  componentPrompt,
  dynamicKeyPrompt,
  dynamicPagePrompt,
  layoutPrompt,
} from '../prompts'
import { handleErrors, handleSuccess } from '../utils'
import { addContentToPath, createDirRecursively, createFile } from '../commands'
import {
  layoutComponent,
  page,
  pageWithFunctionKeyword,
} from '../templates/page'

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
    isFunctionDeclaration,
  } = await componentPrompt('page')

  if (!path && !selectedPath) {
    console.log('You must provide a path')
    process.exit(1)
  }

  const { isLayout } = await layoutPrompt()
  const { isDynamicPage } = await dynamicPagePrompt()

  handleErrors(selectedName, name, selectedPath, path)

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
      isFunctionDeclaration
    )
  }

  handlePageFiles(fullPath, pageName, clientComponent, isFunctionDeclaration)

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
  isFunctionDeclaration: boolean
) {
  const pageFile = `${fullPath}/page.tsx`

  createFile(pageFile)

  const createdPage = isFunctionDeclaration
    ? pageWithFunctionKeyword(pageName, clientPage)
    : page(pageName, clientPage)

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
  isFunctionDeclaration: boolean
) {
  const dynamicDir = `${fullPath}/[${key}]`

  createDirRecursively(dynamicDir)

  const dynamicPageFile = `${dynamicDir}/page.tsx`

  createFile(dynamicPageFile)

  const dynamicPage = isFunctionDeclaration
    ? pageWithFunctionKeyword(pageName, clientPage, key)
    : page(pageName, clientPage, key)

  addContentToPath(dynamicPageFile, dynamicPage)
}
