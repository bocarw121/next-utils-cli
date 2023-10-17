import { red } from 'ansicolor'

export function handleMethodError(methods: string[]) {
  if (!methods.length) {
    console.error(red('You must select at least one method'))
    process.exit(1)
  }
}

export function handleErrors(selectedName: string, selectedPath: string) {
  if (!selectedName) {
    console.error(red('You must provide a name'))
    process.exit(1)
  }

  if (!selectedPath) {
    console.error(red('You must provide a path'))
    process.exit(1)
  }
}
