#! /usr/bin/env node
import { program } from 'commander'

import {
  handleComponentCreation, handleInit,
  handlePageCreation,
  handleRouteCreation,
} from './handlers'
import packageJson from '../package.json'
import { handleCleanHomePage } from './handlers/cleanHomePage'
import { checkIfValidAppRouterProject } from './utils/errors'
import { createFile } from './commands'

async function main() {
  await checkIfValidAppRouterProject()

  program
    .name('next-js-utils')
    .description(
      'Next Utils CLI: Streamline Next.js route, page, and component creation with the new App router.'
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
    .command('init')
    .description('Initializes next-utils config file')
    .action(handleInit)

  program.parse(process.argv)
}

main()
