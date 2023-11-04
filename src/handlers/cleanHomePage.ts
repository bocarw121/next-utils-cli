import fs from 'fs/promises'
import path from 'path'
import { red } from 'ansicolor'

import { doesDirectoryExist } from '../utils/directoryChecks'
import { prompt } from '../prompts'

export async function handleCleanHomePage() {
  const isSrcDirectory = await doesDirectoryExist('src')

  const pageFile = await getPageFile(isSrcDirectory ? 'src/app' : 'app')

  if (!pageFile) {
    console.log(
      red(
        'Could not find a page file to clean, are you sure you are in a Next.js project?'
      )
    )
    return
  }

  const { confirm } = await prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Are you sure you want to clean the home page?',
    },
  ])

  if (!confirm) {
    process.exit(0)
  }

  const cleanedPageFile = cleanPageFile(pageFile)

  try {
    await fs.writeFile(
      path.join(isSrcDirectory ? 'src/app' : 'app', 'page.tsx'),
      cleanedPageFile
    )
  } catch (error) {
    console.error(red('Something went wrong while cleaning the home page.'))
    process.exit(1)
  }
}

async function getPageFile(basePath: 'src/app' | 'app') {
  // Define an array of possible extensions to check
  const extensionsToCheck = ['.tsx', '.jsx']

  // Try each extension until a matching file is found
  for (const ext of extensionsToCheck) {
    const filePath = path.join(basePath, 'page' + ext)

    try {
      // Attempt to read the file with the current extension
      const file = await fs.readFile(filePath, 'utf-8')
      return file
    } catch (error) {
      // Handle any errors (e.g., file not found) and continue to the next extension
      if (error.code === 'ENOENT') {
        return null
      }
    }
  }
}

function cleanPageFile(pageFile: string) {
  return pageFile.replace(/return \(.+\)/s, 'return (<div></div>)')
}
