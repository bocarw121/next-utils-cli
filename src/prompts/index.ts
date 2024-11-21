import prompts from 'prompts'
import { blue } from 'ansicolor'

import { listOfDirectories, listOfDirectoriesForComponents } from '../utils'
import { handleMessage, handleOnState, validateText } from './utils'

export async function prompt(questions: prompts.PromptObject[]) {
  return prompts(questions)
}

const commonQuestions: prompts.PromptObject<string>[] = [
  {
    type: 'toggle',
    name: 'isArrowFunction',
    message:
      'Do you want to use an arrow function for the component? The default is a function declaration.',
    initial: false,
    active: 'Yes',
    inactive: 'No',
    onState: handleOnState,
  },
  {
    type: 'toggle',
    name: 'clientComponent',
    message: 'Do you want to create a client component?',
    initial: false,
    active: 'Yes',
    inactive: 'No',
    onState: handleOnState,
  },
]

export async function componentPrompt() {
  return prompt([
    {
      type: 'text',
      name: 'selectedName',
      message: `What is the name of the component?`,
      validate: validateText('component'),
      onState: handleOnState,
    },
    {
      type: 'autocomplete',
      name: 'selectedPath',
      message: `Which directory do you want to create the component in?`,
      choices: await listOfDirectoriesForComponents(),
      onState: handleOnState,
    },
    {
      type: 'text',
      name: 'customPath',
      message: handleMessage('(e.g., ./components)', 'component'),
      onState: handleOnState,
    },
    ...commonQuestions,
  ])
}

export async function pagePrompt() {
  return prompt([
    {
      type: 'text',
      name: 'selectedName',
      message: `What is the name of the page?`,
      validate: validateText('page'),
      onState: handleOnState,
    },
    // {
    //   type: 'autocomplete',
    //   name: 'selectedPath',
    //   message: `Which directory do you want to create the page in?`,
    //   choices: await listOfDirectories(),
    //   onState: handleOnState,
    // },
    {
      type: 'text',
      name: 'customPath',
      message: handleMessage('(e.g., /dashboard)', 'page'),
      onState: handleOnState,
    },
    ...commonQuestions,
  ])
}

export async function routePrompts() {
  return prompt([
    {
      type: 'text',
      name: 'selectedName',
      message: `What is the name of the route?`,
      validate: validateText('route'),
      onState: handleOnState,
    },
    // {
    //   type: 'autocomplete',
    //   name: 'selectedPath',
    //   message: `Which directory do you want to create the route in?`,
    //   choices: await listOfDirectories(),
    //   onState: handleOnState,
    // },
    {
      type: 'text',
      name: 'customPath',
      message: handleMessage('(e.g., /api/[auth])', 'route'),
      onState: handleOnState,
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
      onState: handleOnState,
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
      onState: handleOnState,
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
      onState: handleOnState,
    },
    {
      type: (prev) => (prev === 'Yes' ? 'toggle' : null),
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
      validate: validateText('dynamic'),
      onState: handleOnState,
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
      validate: (values) => {
        if (values.length > 0) {
          return true
        } else {
          return 'Please select at least one method.'
        }
      },
      onState: handleOnState,
    },
  ])
}
