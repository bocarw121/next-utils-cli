import path from 'path'

import { appendContentToPath } from '../commands'

import { handleTemplates } from '../templates'

function normalizePathSegment(segment?: string) {
  if (!segment) {
    return ''
  }

  const cleaned = segment
    .split(/[\\/]/)
    .map((part) => part.trim())
    .filter(Boolean)

  return cleaned.join(path.sep)
}

export function getPath(basePath: string, name: string, customPath: string) {
  const normalizedBase = basePath.replace(/[\\]/g, path.sep)
  const normalizedCustom = normalizePathSegment(customPath)

  const joinedPath = normalizedCustom
    ? path.join(normalizedBase, normalizedCustom, name)
    : path.join(normalizedBase, name)

  return joinedPath.replace(/[\\]/g, '/')
}

export function handleMethod(file: string, methods: string[], key?: string) {
  for (const method of methods) {
    appendContentToPath(
      file,
      handleTemplates(key)[method as keyof typeof handleTemplates]
    )
  }
}
