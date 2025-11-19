#! /usr/bin/env node
import { program } from 'commander'

import {
  handleComponentCreation,
  handleInit,
  handlePageCreation,
  handleRouteCreation,
  handleCleanHomePage,
  handleServerActions,
} from './handlers'
import packageJson from '../package.json'
import { checkIfValidAppRouterProject } from './utils/errors'
import { setProjectInfo } from './utils/projectInfo'

async function main() {
  const projectInfo = await checkIfValidAppRouterProject()
  setProjectInfo(projectInfo)

  program
    .name('next-js-utils')
    .description(
      'Next Utils CLI: Streamline Next.js route, page, action, and component creation with the new App router.'
    )
    .version(packageJson.version)

  program
    .command('page')
    .description('Generate a new page in the App router')
    .action(handlePageCreation)

  program
    .command('route')
    .description('Generate a new route in the App router')
    .action(handleRouteCreation)

  program
    .command('component')
    .description('Generate a new component')
    .action(handleComponentCreation)

  program
    .command('clean-home-page')
    .description('Removes next js boiler plate from the Home page')
    .action(handleCleanHomePage)

  program
    .command('action')
    .description('Generate a new server action')
    .action(handleServerActions)

  program
    .command('init')
    .description('Initializes next-utils config file')
    .action(handleInit)

  program.parse(process.argv)
}

main().catch((error) => {
  console.log(
    `Something went wrong, please try again later or open an issue on GitHub`
  )
  process.exit(1)
})
