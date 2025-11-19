export type ProjectInfo = {
  nextVersion: number | null
}

let projectInfo: ProjectInfo = {
  nextVersion: null,
}

export function setProjectInfo(info: ProjectInfo) {
  projectInfo = info
}

export function getProjectInfo(): ProjectInfo {
  return projectInfo
}
