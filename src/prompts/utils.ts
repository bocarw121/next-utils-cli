export function handleOnState(state: {
  value: string
  aborted: boolean
  title: string
}) {
  if (state.aborted) {
    process.exit(1)
  }
}

export const validateText = (type: string) => (value: string) => {
  const disallowedCharsRegex = /[\/\\:?"*<>|,.]/

  if (value.length < 1) {
    return `Please enter a valid ${type} name`
  }

  if (disallowedCharsRegex.test(value)) {
    return `Please enter a valid ${type} name without any special characters`
  }

  return true
}

export const handleMessage =
  (example: string, type: string) => (value: string) => {
    // value here is the full path of the previous selection
    const prevSelection = value.split('/').pop()
    return `Do you want to add a path for your ${type}? Enter the path ${example}. Press Enter to use the /${prevSelection} as (root) path. The chosen path will be created recursively if added.`
  }
