import { createDirRecursively, createFile, addContentToPath } from '../commands'
import { page, pageWithFunctionKeyword, layoutComponent } from '../templates'

export function handleDynamicPageFiles(
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

export function handlePageFiles(
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

export function handleLayoutFiles(fullPath: string, pageName: string) {
  const layoutFile = `${fullPath}/layout.tsx`

  createFile(layoutFile)

  const layout = layoutComponent(pageName)

  addContentToPath(layoutFile, layout)
}
