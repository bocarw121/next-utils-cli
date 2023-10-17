import prompts from 'prompts'
import { blue } from 'ansicolor'

import { listOfDirectories, listOfDirectoriesForComponents } from '../utils'

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
      type: 'toggle',
      name: 'isArrowFunction',
      message:
        'Do you want to use an arrow function for the component? The default is a function declaration.',
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
    {
      type: 'autocomplete',
      name: 'selectedPath',
      message: `Which directory do you want to create the ${type} in?`,
      choices:
        type === 'component'
          ? await listOfDirectoriesForComponents()
          : await listOfDirectories(),
    },
    {
      type: 'text',
      name: 'customPath',
      message: `What is the ${type} path? Enter the path, which will be created recursively  in the previously chosen directory. Ensure the path is delimited by /.`,
      instructions: 'Note that path must be delimited by /',
    },
    {
      type: 'toggle',
      name: 'clientComponent',
      message: 'Do you want to create a client component?',
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
  ])
}

export async function layoutPrompt() {
  return prompt([
    {
      type: 'toggle',
      name: 'isLayout',
      message: 'Do you want to create a layout component?',
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
  ])
}

export async function dynamicRoutePrompt() {
  return prompt([
    {
      type: 'toggle',
      name: `isDynamicRoute`,
      message: `Do you want to create a dynamic route?`,
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
  ])
}

export async function dynamicPagePrompt() {
  return prompt([
    {
      type: 'toggle',
      name: `isDynamicPage`,
      message: `Do you want to create a dynamic page?`,
      initial: false,
      active: 'Yes',
      inactive: 'No',
    },
    {
      type: 'toggle',
      name: 'isDynamicClientComponent',
      message: 'Do you want to create a client component for the dynamic page?',
      initial: false,
      active: 'Yes',
      inactive: 'No',
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

export async function routePrompts() {
  return prompt([
    {
      type: 'text',
      name: 'selectedName',
      message: `What is the name of the route?`,
    },
    {
      type: 'autocomplete',
      name: 'selectedPath',
      message: `Which directory do you want to create the route in?`,
      choices: await listOfDirectories(),
    },
    {
      type: 'text',
      name: 'customPath',
      message: `What is the route path? Enter the path, which will be created recursively  in the previously chosen directory. Ensure the path is delimited by /.`,
    },
  ])
}

export async function methodPrompt(type: 'dynamic' | 'route') {
  return prompt([
    {
      type: 'multiselect',
      message: `Select the methods you want to use for the ${
        type === 'dynamic' ? blue('Dynamic route') : blue('Route')
      } `,
      name: 'methods',
      choices: [
        {
          title: 'GET',
          value: 'GET',
          description: 'Method to make GET request with',
        },
        {
          title: 'POST',
          value: 'POST',
          description: 'Method to make POST request with',
        },
        {
          title: 'PUT',
          value: 'PUT',
          description: 'Method to make PUT request with',
        },
        {
          title: 'PATCH',
          value: 'PATCH',
          description: 'Method to make PATCH request with',
        },
        {
          title: 'DELETE',
          value: 'DELETE',
          description: 'Method to make DELETE request with',
        },
        {
          title: 'OPTIONS',
          value: 'OPTIONS',
          description: 'Method to make OPTIONS request with',
        },
      ],
    },
  ])
}
