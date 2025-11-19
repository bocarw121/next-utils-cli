import {
  addContentToPath,
  checkIfDirectoryExists,
  checkIfFileExists,
  createFile,
} from '../commands'
import { green, yellow } from 'ansicolor'
import { prompt } from '../prompts'
import { getProjectInfo } from '../utils/projectInfo'
import { ensureNextConfigOptions } from '../utils/nextConfig'

type InitAnswers = {
  enableCacheComponents: boolean
  enableReactCompiler: boolean
}

export async function handleInit() {
  // check if next-utils-cli.json file exists
  const isFileExists = checkIfFileExists('next-utils-cli.json')

  if (isFileExists) {
    console.log(
      green(
        `next-utils-cli.json file already exists, you can start creating pages, components, routes, and actions.
        If you want to change the paths, please update the next-utils-cli.json file.
        `
      )
    )
    return
  }

  createFile('next-utils-cli.json')

  const isSrcDir = checkIfDirectoryExists('src')

  const paths = isSrcDir
    ? {
        page: 'src/app',
        component: 'src/app',
        route: 'src/app',
        action: 'src/app/actions',
      }
    : {
        page: 'app',
        component: 'app',
        route: 'app',
        action: 'app/actions',
      }

  addContentToPath('next-utils-cli.json', JSON.stringify(paths, null, 2))

  console.log(
    green(
      `Successfully created next-utils-cli.json file, you can now start creating pages, components, routes, and actions.`
    )
  )

  await maybeEnhanceNextConfig()
}

async function maybeEnhanceNextConfig() {
  const { nextVersion } = getProjectInfo()

  if (!nextVersion || nextVersion < 16) {
    return
  }

  const answers = (await prompt([
    {
      type: 'toggle',
      name: 'enableCacheComponents',
      message:
        'Enable cacheComponents in next.config for Partial Prerendering?',
      initial: true,
      active: 'Yes',
      inactive: 'No',
    },
    {
      type: 'toggle',
      name: 'enableReactCompiler',
      message: 'Enable the React Compiler in next.config?',
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
  ])) as InitAnswers

  if (!answers.enableCacheComponents && !answers.enableReactCompiler) {
    return
  }

  const configPath = await ensureNextConfigOptions({
    cacheComponents: answers.enableCacheComponents,
    reactCompiler: answers.enableReactCompiler,
  })

  if (!configPath) {
    console.log(
      yellow(
        'Unable to automatically update next.config. Please ensure cacheComponents and reactCompiler are configured manually.'
      )
    )
    return
  }

  console.log(
    green(
      `Updated ${configPath} with ${[
        answers.enableCacheComponents ? 'cacheComponents' : null,
        answers.enableReactCompiler ? 'reactCompiler' : null,
      ]
        .filter(Boolean)
        .join(' and ')}.`
    )
  )
}
