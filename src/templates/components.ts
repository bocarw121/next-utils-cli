export function component(name: string, clientComponent: boolean): string {
  let useClient = clientComponent ? "'use client' \n" : ''

  return `${useClient}import React from 'react';
  
type ${name}Props = {};

export const ${name} = (props: ${name}Props) => {
  return <h1>Welcome to ${name} component</h1>
};
  `
}

export function componentWithFunctionKeyword(
  name: string,
  clientComponent: boolean
): string {
  let useClient = clientComponent ? "'use client' \n" : ''

  return `${useClient}import React from 'react';
  
type ${name}Props = {};

export function ${name}(props: ${name}Props) {
  return <h1>Welcome to ${name} component</h1>
};
  `
}
