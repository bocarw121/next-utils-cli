export function page(
  name: string,
  pageComponent: boolean,
  id?: string
): string {
  let useClient = pageComponent ? "'use client' \n" : ''

  return `${useClient}import React from 'react';

${
  id
    ? `type ${name}Props = {
  params: {
    ${[id]}: string
  }
};`
    : `type ${name}Props = {};`
}

const ${name} = (props: ${name}Props) => {
  return <h1>Welcome to your ${name} page ${id ? `{props.params.id}` : ''}</h1>
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
  
${
  id
    ? `type ${name}Props = {
  params: {
    ${[id]}: string
  }
};`
    : `type ${name}Props = {};`
}

export default function ${name}(props: ${name}Props) {
  return <h1>Welcome to your ${name} page ${id ? `{props.params.id}` : ''}</h1>
};
  `
}

export function layoutComponent(name: string): string {
  return `import React from 'react'; 

type ${name}Props = {
  children: React.ReactNode
};

export default function ${name}Layout({ children }: ${name}Props) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
  `
}
