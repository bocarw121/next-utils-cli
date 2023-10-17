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
    'A CLI to help you build Next.js applications faster in the App router'
  )
  .version(packageJson.version)

program
  .command('page')
  .description('Create a new page in the App router')
  .action((cmd) => {
    handlePageCreation(cmd)
  })

program
  .command('route')
  .description('Generate a new route in the App router')
  .action((cmd) => {
    handleRouteCreation(cmd)
  })

program
  .command('component')
  .description('Create a new component')
  .action((cmd) => {
    handleComponentCreation(cmd)
  })

program.parse(process.argv)
