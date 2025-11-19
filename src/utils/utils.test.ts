import fs from 'fs'

import { getPath } from './handlerUtils'

import {
  handleRouteFile,
  handleDynamicRouteFiles,
  handleMethod,
} from './routeHandlerUtils'
import {
  handleDynamicPageFiles,
  handleLayoutFiles,
  handlePageFiles,
} from './pageHandlerUtils'
import { createDirRecursively } from '../commands'
import { page, layoutComponent } from '../templates'
import { composeCachePromptResult } from '../prompts'

describe('routeHandlerUtils', () => {
  afterAll(() => {
    // Delete the 'routes' directory after all tests
    if (fs.existsSync('./routes')) {
      fs.rmSync('./routes', { recursive: true })
    }
  })

  describe('createPath', () => {
    it('should create a path with routeName and customPath', () => {
      const basePath = 'routes'
      const routeName = 'example'
      const customPath = '/custom/'
      const fullPath = getPath(basePath, routeName, customPath)

      createDirRecursively(fullPath)

      // Check if the directory was created
      expect(fs.existsSync(fullPath)).toBe(true)

      // Delete the directory after the test
      fs.rmSync(fullPath, { recursive: true })
    })

    it('should create a path with routeName only', () => {
      const basePath = 'routes'
      const routeName = 'example'
      const fullPath = getPath(basePath, routeName, '')

      createDirRecursively(fullPath)

      // Check if the directory was created
      expect(fs.existsSync(fullPath)).toBe(true)

      // Delete the directory after the test
      fs.rmSync(fullPath, { recursive: true })
    })
  })

  describe('handleRouteFile', () => {
    it('should create and handle a route file', () => {
      const fullPath = 'routes/example'
      const methods = ['GET', 'POST']
      const imports = 'import React from "react";'

      // Create the directory if it doesn't exist
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true })
      }

      handleRouteFile(fullPath, methods, imports)

      // Check if the file was created
      const routeFilePath = `${fullPath}/route.ts`
      expect(fs.existsSync(routeFilePath)).toBe(true)

      // Delete the file and directory after the test
      fs.unlinkSync(routeFilePath)
      fs.rmSync(fullPath, { recursive: true })
    })
  })

  describe('handleDynamicRouteFiles', () => {
    it('should create and handle dynamic route files', () => {
      const fullPath = 'routes/products'
      const methods = ['GET']
      const key = 'id'
      const imports = 'import React from "react";'
      handleDynamicRouteFiles(fullPath, methods, key, imports)

      // Check if the dynamic route files were created
      const dynamicRouteDir = `${fullPath}/[${key}]`
      const dynamicRouteFilePath = `${dynamicRouteDir}/route.ts`
      expect(fs.existsSync(dynamicRouteDir)).toBe(true)
      expect(fs.existsSync(dynamicRouteFilePath)).toBe(true)

      // Delete the files and directory after the test
      fs.unlinkSync(dynamicRouteFilePath)
      fs.rmSync(dynamicRouteDir, { recursive: true })
    })
  })

  describe('handleMethod', () => {
    it('should add content to a route file', () => {
      const fullPath = 'routes/example'
      const methods = ['GET']

      // Create the directory if it doesn't exist
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true })
      }

      const routeFilePath = `${fullPath}/route.ts`
      // Create the route file if it doesn't exist
      if (!fs.existsSync(routeFilePath)) {
        fs.writeFileSync(routeFilePath, '', 'utf-8')
      }

      // Call handleMethod to add content to the route file
      handleMethod(routeFilePath, methods)

      // Check if the content was added to the route file
      const routeFileContent = fs.readFileSync(routeFilePath, 'utf-8')
      expect(routeFileContent).toContain(
        'export async function GET(request: Request)'
      )

      // Delete the file and directory after the test
      fs.unlinkSync(routeFilePath)
      fs.rmSync(fullPath, { recursive: true })
    })
  })
})

describe('pageHandlerUtils', () => {
  afterAll(() => {
    // Delete the directory after the test
    if (fs.existsSync('./pages')) {
      fs.rmSync('./pages', { recursive: true })
    }
  })
  describe('handleDynamicPageFiles', () => {
    it('should create and handle dynamic page files with arrow function', () => {
      const fullPath = 'pages/products'
      const pageName = 'ProductPage'
      const clientPage = true
      const key = 'id'
      const isArrowFunction = true

      // Create dynamic page files
      handleDynamicPageFiles({
        basePath: fullPath,
        pageName,
        clientComponent: clientPage,
        dynamicKey: key,
        isArrowFunction,
        useCache: false,
        cacheLifeProfile: 'none',
      })

      // Check if dynamic page files were created
      const dynamicPageFilePath = `${fullPath}/[${key}]/page.tsx`
      expect(fs.existsSync(dynamicPageFilePath)).toBe(true)

      // Delete the file and directory after the test
      fs.unlinkSync(dynamicPageFilePath)
      fs.rmSync(`${fullPath}/[${key}]`, { recursive: true })
    })
  })

  describe('handleLayoutFiles', () => {
    it('should create and handle layout files', () => {
      const fullPath = 'layouts'
      const pageName = 'LayoutPage'

      createDirRecursively(fullPath)

      handleLayoutFiles(fullPath, pageName)

      // Check if layout files were created
      const layoutFilePath = `${fullPath}/layout.tsx`
      expect(fs.existsSync(layoutFilePath)).toBe(true)

      // Delete the file and directory after the test
      fs.unlinkSync(layoutFilePath)
      fs.rmSync(fullPath, { recursive: true })
    })
  })

  it('should create page files with cache directive when enabled', () => {
    const fullPath = 'pages/cacheable'
    const pageName = 'CachedPage'

    createDirRecursively(fullPath)

    handlePageFiles(fullPath, {
      pageName,
      clientComponent: false,
      isArrowFunction: false,
      useCache: true,
      cacheLifeProfile: 'minutes',
    })

    const pageFilePath = `${fullPath}/page.tsx`
    const content = fs.readFileSync(pageFilePath, 'utf-8')

    expect(content).toContain("'use cache'")
    expect(content).toContain("cacheLife('minutes')")

    fs.unlinkSync(pageFilePath)
    fs.rmSync(fullPath, { recursive: true })
  })

  it('should not add cache directive for layouts', () => {
    const fullPath = 'pages/layout-only'
    const pageName = 'LayoutOnly'

    createDirRecursively(fullPath)

    handleLayoutFiles(fullPath, pageName)

    const layoutFilePath = `${fullPath}/layout.tsx`
    const content = fs.readFileSync(layoutFilePath, 'utf-8')

    expect(content).not.toContain("'use cache'")
    expect(content).not.toContain('cacheLife(')

    fs.unlinkSync(layoutFilePath)
    fs.rmSync(fullPath, { recursive: true })
  })
})

describe('templates', () => {
  it('layoutComponent should return a layout without cache directives', () => {
    const layout = layoutComponent('Home')

    expect(layout).toContain('export default function HomeLayout')
    expect(layout).not.toContain("'use cache'")
  })

  it('page template respects cache options', () => {
    const content = page({
      name: 'Foo',
      clientComponent: false,
      useCache: true,
      cacheLifeProfile: 'hours',
    })

    expect(content).toContain("'use cache'")
    expect(content).toContain("cacheLife('hours')")
  })
})

describe('prompts', () => {
  it('composeCachePromptResult infers cacheLife from selection', () => {
    const result = composeCachePromptResult({
      clientComponent: false,
      useCache: true,
      cacheLifeProfile: 'minutes',
    })

    expect(result).toEqual({
      useCache: true,
      cacheLifeProfile: 'minutes',
    })
  })

  it('composeCachePromptResult disables cache for client components', () => {
    const result = composeCachePromptResult({
      clientComponent: true,
      useCache: true,
      cacheLifeProfile: 'hours',
    })

    expect(result).toEqual({
      useCache: false,
      cacheLifeProfile: 'none',
    })
  })
})
