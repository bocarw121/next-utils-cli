export const handleTemplates = (id?: string) => ({
  GET: `export async function GET(request: Request${id ? ',' : ''} ${
    id ? `props: { params: { ${id}: string } }` : ''
  }) {
  return NextResponse.json({ "hello": ${
    id ? '`${props.params.' + id + '}`' : '"world"'
  } })
}\n`,
  POST: `export async function POST(request: Request${id ? ',' : ''} ${
    id ? `props: { params: { ${id}: string } }` : ''
  }) {
  const res = await request.json()
   return NextResponse.json({ "hello": ${
     id ? '`${props.params.' + id + '}`' : '"world"'
   } })
}\n`,
  PUT: `export async function PUT(request: Request${id ? ',' : ''} ${
    id ? `props: { params: { ${id}: string } }` : ''
  }) {
  const res = await request.json()
   return NextResponse.json({ "hello": ${
     id ? '`${props.params.' + id + '}`' : '"world"'
   } })
}\n`,
  PATCH: `export async function PATCH(request: Request${id ? ',' : ''} ${
    id ? `props: { params: { ${id}: string } }` : ''
  }) {
  const res = await request.json()
   return NextResponse.json({ "hello": ${
     id ? '`${props.params.' + id + '}`' : '"world"'
   } })
}\n`,
  DELETE: `export async function DELETE(request: Request${id ? ',' : ''} ${
    id ? `props: { params: { ${id}: string } }` : ''
  }) {
  const res = await request.json()
   return NextResponse.json({ "hello": ${
     id ? '`${props.params.' + id + '}`' : '"world"'
   } })
}\n`,
  OPTIONS: `
export async function OPTIONS(request: Request) {
   return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}\n`,
})
