#!/usr/bin/env node

const { execSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

const ROOT_DIR = path.resolve(__dirname, '..')
const VALID_VERSIONS = new Set(['patch', 'minor', 'major', 'test'])

function main() {
  const version =
    process.argv[2] ?? process.env.NEXT_UTILS_BUILD_VERSION ?? 'test'

  if (!VALID_VERSIONS.has(version)) {
    console.error(
      'Invalid version provided. Expected one of: patch, minor, major, test.'
    )
    process.exit(1)
  }

  console.log(`Updating version to ${version}`)
  if (version !== 'test') {
    execSync(`node scripts/bumpNpmVersion.js ./package.json ${version}`, {
      cwd: ROOT_DIR,
      stdio: 'inherit',
    })
  }

  fs.rmSync(path.join(ROOT_DIR, 'lib'), { recursive: true, force: true })

  execSync('npx parcel build --no-cache --no-source-maps', {
    cwd: ROOT_DIR,
    stdio: 'inherit',
  })

  const libDir = path.join(ROOT_DIR, 'lib')
  fs.mkdirSync(libDir, { recursive: true })

  fs.copyFileSync(
    path.join(ROOT_DIR, 'package.json'),
    path.join(libDir, 'package.json')
  )
  fs.copyFileSync(
    path.join(ROOT_DIR, 'README.md'),
    path.join(libDir, 'README.md')
  )

  execSync('npm run link', {
    cwd: ROOT_DIR,
    stdio: 'inherit',
  })
}

main()
