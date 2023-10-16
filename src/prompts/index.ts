import prompts from 'prompts'
import shell from 'shelljs'

import { listOfDirectories } from '../utils'

export async function prompt(questions: prompts.PromptObject[]) {
  return prompts(questions)
}

export async function componentPrompt(type: 'component' | 'page') {
  return prompt([
    {
      type: 'text',
      name: 'selectedName',
      message: `What is the name of the ${type}?`,
    },
    {
      type: 'confirm',
      name: 'isFunctionDeclaration',
      message:
        'Do you want to use the function keyword? to declare the component instead of arrow function?',
    },
    {
      type: 'autocomplete',
      name: 'selectedPath',
      message: `Which directory do you want to create the ${type} in?`,
      choices: await listOfDirectories(`${shell.pwd().stdout}`),
    },
    {
      type: 'text',
      name: 'customPath',
      message: `What is the path of the ${type}? path/to/${type} this will recursively create the path into your the previous chosen directory. Note that path must be delimited by /`,
      instructions: 'Note that path must be delimited by /',
    },
    {
      type: 'confirm',
      name: 'clientComponent',
      message: 'Do you want to create a client component?',
    },
  ])
}

export async function layoutPrompt() {
  return prompt([
    {
      type: 'confirm',
      name: 'isLayout',
      message: 'Do you want to create a layout component?',
    },
  ])
}

export async function dynamicPagePrompt() {
  return prompt([
    {
      type: 'confirm',
      name: 'isDynamicPage',
      message: 'Do you want to create a dynamic page?',
    },
  ])
}

export async function dynamicKeyPrompt() {
  return prompt([
    {
      type: 'text',
      name: 'key',
      message: 'What is the dynamic key?',
    },
  ])
}
