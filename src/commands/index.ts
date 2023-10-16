import shell from 'shelljs'

export const createDirRecursively = (path: string) => {
  shell.mkdir('-p', path)
}
export const createFile = (path: string) => {
  shell.touch(path)
}

export const addContentToPath = (path: string, content: string) => {
  shell.ShellString(content).to(path)
}

export const changeDirectory = (path: string) => {
  shell.cd(path)
}
