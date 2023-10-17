import {
  createFile,
  addContentToPath,
  createDirRecursively,
  appendContentToPath,
} from '../commands'
import { handleTemplates } from '../templates/route'

export function handleRouteFile(
  fullPath: string,
  methods: string[],
  imports: string
) {
  const routeFile = `${fullPath}/route.ts`

  createFile(routeFile)

  addContentToPath(routeFile, imports)

  handleMethod(routeFile, methods)
}

export function handleDynamicRouteFiles(
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

export function handleMethod(
  routeFile: string,
  methods: string[],
  key?: string
) {
  for (const method of methods) {
    appendContentToPath(
      routeFile,
      handleTemplates(key)[method as keyof typeof handleTemplates]
    )
  }
}
