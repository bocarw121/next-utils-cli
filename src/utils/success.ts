import { green } from 'ansicolor'

export function handleSuccess(fullPath: string, componentName: string) {
  console.log(
    green(`Successfully created ${componentName} component at ${fullPath}`)
  )
}
