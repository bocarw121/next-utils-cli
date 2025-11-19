type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

function createResponseMessage(method: HttpMethod, dynamicKey?: string) {
  if (dynamicKey) {
    return '`Hello from ${' + dynamicKey + '}!`'
  }

  return `'Hello from ${method}'`
}

function createRequestBodySnippet(method: HttpMethod) {
  if (method === 'GET') {
    return ''
  }

  return '  const body = await request.json()\n'
}

function createRouteTemplate(method: HttpMethod, dynamicKey?: string) {
  const paramSignature = dynamicKey
    ? `, { params }: { params: Promise<{ ${dynamicKey}: string }> }`
    : ''
  const resolveParams = dynamicKey
    ? `  const { ${dynamicKey} } = await params\n`
    : ''
  const bodySnippet = createRequestBodySnippet(method)
  const message = createResponseMessage(method, dynamicKey)
  const payload =
    method === 'GET'
      ? `{ message: ${message} }`
      : `{ message: ${message}, body }`

  return `export async function ${method}(request: Request${paramSignature}) {
${resolveParams}${bodySnippet}  return NextResponse.json(${payload})
}
`
}

export const handleTemplates = (dynamicKey?: string) => ({
  GET: createRouteTemplate('GET', dynamicKey),
  POST: createRouteTemplate('POST', dynamicKey),
  PUT: createRouteTemplate('PUT', dynamicKey),
  PATCH: createRouteTemplate('PATCH', dynamicKey),
  DELETE: createRouteTemplate('DELETE', dynamicKey),
  OPTIONS: `export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
`,
})
