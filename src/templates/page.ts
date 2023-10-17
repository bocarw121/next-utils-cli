export function page(
  name: string,
  pageComponent: boolean,
  id?: string
): string {
  let useClient = pageComponent ? "'use client' \n" : ''

  return `${useClient}import React from 'react';
  
type ${name}Props = {};

const ${name} = (props: ${name}Props) => {
  return <h1>Welcome to ${name} page with ${id}</h1>
 };

export default ${name};
  `
}

export function pageWithFunctionKeyword(
  name: string,
  pageComponent: boolean,
  id?: string
): string {
  let useClient = pageComponent ? "'use client' \n" : ''

  return `${useClient}import React from 'react';
  
type ${name}Props = {};

export default function ${name} (props: ${name}Props) {
  return <h1>Welcome to ${name} page ${id}</h1>
};
  `
}

export function layoutComponent(name: string): string {
  return `import React from 'react'; 

export default function ${name}Layout({ children }) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
  `
}
