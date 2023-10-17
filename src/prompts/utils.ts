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
