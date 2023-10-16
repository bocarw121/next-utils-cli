export function handleRouteCreation(cmd: RouteCommand) {
  const { name, path } = cmd

  console.log('Generating a new route with the following options:')

  console.log('Name:', name)
}

type RouteCommand = {
  name: string
  path: string
}
