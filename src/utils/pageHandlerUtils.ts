import { createDirRecursively, createFile, addContentToPath } from '../commands'
import { page, pageWithFunctionKeyword, layoutComponent } from '../templates'

type PageFileOptions = {
  pageName: string
  clientComponent: boolean
  isArrowFunction: boolean
  useCache?: boolean
  cacheLifeProfile?: string | null
  dynamicKey?: string
}

type DynamicPageOptions = PageFileOptions & {
  basePath: string
  dynamicKey: string
}

export function handleDynamicPageFiles(options: DynamicPageOptions) {
  const {
    basePath,
    pageName,
    clientComponent,
    dynamicKey,
    isArrowFunction,
    useCache,
    cacheLifeProfile,
  } = options

  const dynamicDir = `${basePath}/[${dynamicKey}]`

  createDirRecursively(dynamicDir)

  const dynamicPageFile = `${dynamicDir}/page.tsx`

  createFile(dynamicPageFile)

  const templateOptions = {
    name: pageName,
    clientComponent,
    dynamicKey,
    useCache,
    cacheLifeProfile,
  }

  const dynamicPage = isArrowFunction
    ? page(templateOptions)
    : pageWithFunctionKeyword(templateOptions)

  addContentToPath(dynamicPageFile, dynamicPage)
}

export function handlePageFiles(fullPath: string, options: PageFileOptions) {
  const {
    pageName,
    clientComponent,
    isArrowFunction,
    useCache,
    cacheLifeProfile,
  } = options

  const pageFile = `${fullPath}/page.tsx`

  createFile(pageFile)

  const templateOptions = {
    name: pageName,
    clientComponent,
    useCache,
    cacheLifeProfile,
  }

  const createdPage = isArrowFunction
    ? page(templateOptions)
    : pageWithFunctionKeyword(templateOptions)

  addContentToPath(pageFile, createdPage)
}

export function handleLayoutFiles(fullPath: string, pageName: string) {
  const layoutFile = `${fullPath}/layout.tsx`

  createFile(layoutFile)

  const layout = layoutComponent(pageName)

  addContentToPath(layoutFile, layout)
}
