import { program } from 'commander'
import {
  handleComponentCreation,
  handlePageCreation,
  handleRouteCreation,
} from '../handlers'
const packageJson = require('../../package.json')

program
  .name('next-js-utils')
  .description(
    'A CLI to help you build Next.js applications faster in the App router'
  )
  .version(packageJson.version)

program
  .command('page')
  .description('Create a new page in the App router')
  .option('-n, --name <name>', 'The name of the page to create')
  .option('-p, --path <path>', 'The path of the page to create')
  .action((cmd) => {
    handlePageCreation(cmd)
  })

program
  .command('router')
  .description('Generate a new page, component, or route')
  .option('-n, --name <name>', 'The name of the route to create')
  .option('-p, --path <path>', 'The path of the route to create')
  .action((cmd) => {
    handleRouteCreation(cmd)
  })

program
  .command('component')
  .description('Create a new component')
  .option('-n, --name [value]', 'The name of the component to create', false)
  .option('-p, --path [value]', 'The path of the component to create', false)
  .action((cmd) => {
    handleComponentCreation(cmd)
  })

program.parse(process.argv)
