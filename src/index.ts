#! /usr/bin/env node
import { program } from 'commander'

import {
  handleComponentCreation,
  handlePageCreation,
  handleRouteCreation,
} from './handlers'
import packageJson from '../package.json'

program
  .name('next-js-utils')
  .description(
    'Next Utils CLI: Streamline Next.js route, page, and component creation with the new App router.'
  )
  .version(packageJson.version)

program
  .command('page')
  .description('Generate a new page in the App router')
  .action(() => {
    handlePageCreation()
  })

program
  .command('route')
  .description('Generate a new route in the App router')
  .action(() => {
    handleRouteCreation()
  })

program
  .command('component')
  .description('Generate a new component')
  .action(() => {
    handleComponentCreation()
  })

program.parse(process.argv)
