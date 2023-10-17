import { green } from 'ansicolor'

export function handleSuccess(name: string, type: string) {
  console.log(green(`Successfully created ${name} ${type}! 🚀`))
}
