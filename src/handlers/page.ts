export function handlePageCreation(cmd: PageCommand) {
  const { name, path } = cmd

  console.log('Creating a new page with the following options:')

  console.log('Name:', name)
}
type PageCommand = {
  name: string
  path: string
}
