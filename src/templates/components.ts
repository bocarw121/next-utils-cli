type CacheOptions = {
  useCache?: boolean
  cacheLifeProfile?: string
}

function buildImports({ useCache, cacheLifeProfile }: CacheOptions) {
  const imports = ["import React from 'react';"]

  if (useCache && cacheLifeProfile && cacheLifeProfile !== 'none') {
    imports.unshift("import { cacheLife } from 'next/cache'")
  }

  return imports.join('\n')
}

function buildScopedCacheLines({ useCache, cacheLifeProfile }: CacheOptions) {
  if (!useCache) {
    return ''
  }

  const lines = ["  'use cache'"]

  if (cacheLifeProfile && cacheLifeProfile !== 'none') {
    lines.push(`  cacheLife('${cacheLifeProfile}')`)
  }

  return `${lines.join('\n')}\n\n`
}

export function component(
  name: string,
  clientComponent: boolean,
  useCache?: boolean,
  cacheLifeProfile?: string
): string {
  const directive = clientComponent ? "'use client';\n\n" : ''
  const cacheOptions: CacheOptions = {
    useCache,
    cacheLifeProfile,
  }
  const imports = buildImports(cacheOptions)
  const asyncKeyword = !clientComponent && useCache ? 'async ' : ''
  const cacheLines = buildScopedCacheLines(clientComponent ? {} : cacheOptions)

  return `${directive}${imports}

type ${name}Props = {};

export const ${name} = ${asyncKeyword}(props: ${name}Props) => {
${cacheLines}  return <h1>Welcome to your ${name} component</h1>
};
  `
}

export function componentWithFunctionKeyword(
  name: string,
  clientComponent: boolean,
  useCache?: boolean,
  cacheLifeProfile?: string
): string {
  const directive = clientComponent ? "'use client';\n\n" : ''
  const cacheOptions: CacheOptions = {
    useCache,
    cacheLifeProfile,
  }
  const imports = buildImports(cacheOptions)
  const asyncKeyword = !clientComponent && useCache ? 'async ' : ''
  const cacheLines = buildScopedCacheLines(clientComponent ? {} : cacheOptions)

  return `${directive}${imports}
  
type ${name}Props = {};

export ${asyncKeyword}function ${name}(props: ${name}Props) {
${cacheLines}  return <h1>Welcome to your ${name} component</h1>
};
  `
}
