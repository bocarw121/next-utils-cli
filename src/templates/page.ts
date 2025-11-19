type CacheOptions = {
  useCache?: boolean
  cacheLifeProfile?: string
}

type PageTemplateOptions = CacheOptions & {
  name: string
  clientComponent: boolean
  dynamicKey?: string
}

const shouldApplyCacheLife = (cacheLifeProfile?: string) =>
  Boolean(cacheLifeProfile && cacheLifeProfile !== 'none')

function composeImports(includeCacheLife: boolean) {
  const imports = ["import React from 'react';"]

  if (includeCacheLife) {
    imports.unshift("import { cacheLife } from 'next/cache'")
  }

  return imports.join('\n')
}

function composeCacheLines({ useCache, cacheLifeProfile }: CacheOptions) {
  if (!useCache) {
    return ''
  }

  const lines = ["  'use cache'"]

  if (shouldApplyCacheLife(cacheLifeProfile)) {
    lines.push(`  cacheLife('${cacheLifeProfile}')`)
  }

  return `${lines.join('\n')}\n\n`
}

function createPropsType(name: string, dynamicKey?: string) {
  if (!dynamicKey) {
    return `type ${name}Props = {};`
  }

  return `type ${name}Props = {
  params: {
    ${dynamicKey}: string
  }
};`
}

function createDynamicAssignment(dynamicKey?: string) {
  if (!dynamicKey) {
    return ''
  }

  return `  const { ${dynamicKey} } = props.params\n\n`
}

function createHeading(name: string, dynamicKey?: string) {
  if (!dynamicKey) {
    return `<h1>Welcome to your ${name} page</h1>`
  }

  return `<h1>Welcome to your ${name} page {${dynamicKey}}</h1>`
}

export function page(options: PageTemplateOptions): string {
  const { name, clientComponent, dynamicKey } = options
  const allowCache = !clientComponent && Boolean(options.useCache)
  const includeCacheLife =
    allowCache && shouldApplyCacheLife(options.cacheLifeProfile)
  const directive = clientComponent ? "'use client';\n\n" : ''
  const imports = composeImports(includeCacheLife)
  const propsType = createPropsType(name, dynamicKey)
  const cacheLines = composeCacheLines({
    useCache: allowCache,
    cacheLifeProfile: options.cacheLifeProfile,
  })
  const dynamicAssignment = createDynamicAssignment(dynamicKey)
  const heading = createHeading(name, dynamicKey)
  const asyncKeyword = allowCache ? 'async ' : ''

  return `${directive}${imports}

${propsType}

const ${name} = ${asyncKeyword}(props: ${name}Props) => {
${dynamicAssignment}${cacheLines}  return ${heading}
 };

export default ${name};
  `
}

export function pageWithFunctionKeyword(options: PageTemplateOptions): string {
  const { name, clientComponent, dynamicKey } = options
  const allowCache = !clientComponent && Boolean(options.useCache)
  const includeCacheLife =
    allowCache && shouldApplyCacheLife(options.cacheLifeProfile)
  const directive = clientComponent ? "'use client';\n\n" : ''
  const imports = composeImports(includeCacheLife)
  const propsType = createPropsType(name, dynamicKey)
  const cacheLines = composeCacheLines({
    useCache: allowCache,
    cacheLifeProfile: options.cacheLifeProfile,
  })
  const dynamicAssignment = createDynamicAssignment(dynamicKey)
  const heading = createHeading(name, dynamicKey)
  const signature = allowCache
    ? `export default async function ${name}(props: ${name}Props)`
    : `export default function ${name}(props: ${name}Props)`

  return `${directive}${imports}
  
${propsType}

${signature} {
${dynamicAssignment}${cacheLines}  return ${heading}
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
