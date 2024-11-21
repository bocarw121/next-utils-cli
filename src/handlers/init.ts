import {
  addContentToPath,
  checkIfDirectoryExists,
  createFile,
} from '../commands'
import { green } from 'ansicolor'

export function handleInit() {
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
      `Successfully created next-utils-cli.json file, you can now start creating pages, components, routes, and actions`
    )
  )
}
