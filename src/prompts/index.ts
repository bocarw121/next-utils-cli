import prompts from 'prompts'
import shell from 'shelljs'

import { listOfDirectories } from '../utils'

export async function prompt(questions: prompts.PromptObject[]) {
  return prompts(questions)
}

export async function componentPrompt() {
  return prompt([
    {
      type: 'text',
      name: 'selectedName',
      message: 'What is the name of the component?',
    },
    {
      type: 'autocomplete',
      name: 'selectedPath',
      message: 'Which directory do you want to create the component in?',
      choices: await listOfDirectories(`${shell.pwd().stdout}`),
    },
    {
      type: 'text',
      name: 'customPath',
      message:
        'What is the path of the component? path/to/component this will recursively create the path into your the previous chosen directory. Note that path must be delimited by /',
      instructions: 'Note that path must be delimited by /',
    },
    {
      type: 'confirm',
      name: 'clientComponent',
      message: 'Do you want to create a client component?',
    },
  ])
}
