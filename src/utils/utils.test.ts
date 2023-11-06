import fs from 'fs'

import { createPath } from './handlerUtils'

import {
  handleRouteFile,
  handleDynamicRouteFiles,
  handleMethod,
} from './routeHandlerUtils'
import {
  handleDynamicPageFiles,
  handlePageFiles,
  handleLayoutFiles,
} from './pageHandlerUtils'

describe('routeHandlerUtils', () => {
  afterAll(() => {
    // Delete the 'routes' directory after all tests
    fs.rmSync('./routes', { recursive: true })
  })

  describe('createPath', () => {
    it('should create a path with routeName and customPath', () => {
      const path = 'routes'
      const routeName = 'example'
      const customPath = 'custom'
      const fullPath = createPath(path, routeName, customPath)

      // Check if the directory was created
      expect(fs.existsSync(fullPath)).toBe(true)

      // Delete the directory after the test
      fs.rmSync(fullPath, { recursive: true })
    })

    it('should create a path with routeName only', () => {
      const path = 'routes'
      const routeName = 'example'
      const fullPath = createPath(path, routeName, '')

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
        'export async function GET(request: Request )'
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
    fs.rmSync('./pages', { recursive: true })
  })
  describe('handleDynamicPageFiles', () => {
    it('should create and handle dynamic page files with arrow function', () => {
      const fullPath = 'pages/products'
      const pageName = 'ProductPage'
      const clientPage = true
      const key = 'id'
      const isArrowFunction = true

      // Create dynamic page files
      handleDynamicPageFiles(
        fullPath,
        pageName,
        clientPage,
        key,
        isArrowFunction
      )

      // Check if dynamic page files were created
      const dynamicPageFilePath = `${fullPath}/[${key}]/page.tsx`
      expect(fs.existsSync(dynamicPageFilePath)).toBe(true)

      // Delete the file and directory after the test
      fs.unlinkSync(dynamicPageFilePath)
      fs.rmSync(`${fullPath}/[${key}]`, { recursive: true })
    })

    // Add more test cases as needed for different scenarios
  })

  // describe('handlePageFiles', () => {
  //   it('should create and handle page files with arrow function', () => {
  //     const fullPath = 'pages/products'
  //     const pageName = 'ProductPage'
  //     const clientPage = true
  //     const isArrowFunction = true

  //     // Create page files
  //     handlePageFiles(fullPath, pageName, clientPage, isArrowFunction)

  //     // Check if page files were created
  //     const pageFilePath = `${fullPath}/page.tsx`
  //     expect(fs.existsSync(pageFilePath)).toBe(true)

  //     // Delete the file after the test
  //     fs.unlinkSync(pageFilePath)
  //   })

  //   // Add more test cases as needed for different scenarios
  // })

  describe('handleLayoutFiles', () => {
    it('should create and handle layout files', () => {
      const fullPath = 'layouts'
      const pageName = 'LayoutPage'

      // Create the directory if it doesn't exist
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true })
      }

      // Create layout files
      handleLayoutFiles(fullPath, pageName)

      // Check if layout files were created
      const layoutFilePath = `${fullPath}/layout.tsx`
      expect(fs.existsSync(layoutFilePath)).toBe(true)

      // Delete the file and directory after the test
      fs.unlinkSync(layoutFilePath)
      fs.rmSync(fullPath, { recursive: true })
    })

    // Add more test cases as needed for different scenarios
  })
})
