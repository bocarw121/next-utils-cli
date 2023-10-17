import { createDirRecursively, appendContentToPath } from '../commands'

import { handleTemplates } from '../templates'

export function createPath(path: string, name: string, customPath: string) {
  const fullPath = customPath
    ? `${path}/${customPath}/${name}`
    : `${path}/${name}`

  createDirRecursively(fullPath)

  return fullPath
}

export function handleMethod(file: string, methods: string[], key?: string) {
  for (const method of methods) {
    appendContentToPath(
      file,
      handleTemplates(key)[method as keyof typeof handleTemplates]
    )
  }
}
