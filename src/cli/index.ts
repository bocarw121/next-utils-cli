import { program } from 'commander'
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
    console.log('Creating a new page with the following options:')
    console.log('Name:', cmd.name)
    console.log('Path:', cmd.path)
    // Your page creation logic here
  })

program
  .command('router')
  .description('Generate a new page, component, or route')
  .option('-n, --name <name>', 'The name of the route to create')
  .option('-p, --path <path>', 'The path of the route to create')
  .action((cmd) => {
    console.log('Generating a new route with the following options:')
    console.log('Name:', cmd.name)
    console.log('Path:', cmd.path)
    // Your route generation logic here
  })

program
  .command('component')
  .description('Create a new component')
  .option('-n, --name <name>', 'The name of the component to create')
  .option('-p, --path <path>', 'The path of the component to create')
  .option(
    '-s, --server-component [value]',
    'The type of the component to create',
    true
  )
  .action((cmd) => {
    console.log('Creating a new component with the following options:')
    console.log('Name:', cmd.name)
    console.log('Path:', cmd.path)
    console.log('Server Component:', cmd.serverComponent)
    // Your component creation logic here
  })

program.parse(process.argv)
