export const handleTemplates = {
  GET: `export async function GET(request: Request) {

  return NextResponse.json({ "hello": "world" })
}\n`,
  POST: `export async function POST(request: Request) {
  const res = await request.json()
  return NextResponse.json({ res })
}\n`,
  PUT: `export async function PUT(request: Request) {
  const res = await request.json()
  return NextResponse.json({ res })
}\n`,
  PATCH: `export async function PATCH(request: Request) {
  const res = await request.json()
  return NextResponse.json({ res })
}\n`,
  DELETE: `export async function DELETE(request: Request) {
  const res = await request.json()
  return NextResponse.json({ res })
}\n`,
  OPTIONS: `
export async function OPTIONS(request: Request) {
  // handle options
  const header =  headers()
  // set CORS headers
  header.set('Access-Control-Allow-Origin', '*')
  header.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  header.set('Access-Control-Allow-Headers', 'Content-Type')

  return NextResponse.next()
}\n`,
}
