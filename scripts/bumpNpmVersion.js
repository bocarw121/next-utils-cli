const { readFile, writeFile } = require('fs').promises;

async function bumpNpmVersion() {
  const bumpType = process.argv[3];
  if (!['major', 'minor', 'patch'].includes(bumpType)) {
    console.error(
      'Invalid bump type. Please use "major", "minor", or "patch".'
    );
    return;
  }

  const packageArg = process.argv[2];
  const packageJson = JSON.parse(await readFile(packageArg, 'utf8'));
  const version = packageJson.version.split('.');

  switch (bumpType) {
    case 'major':
      version[0] = parseInt(version[0]) + 1;
      version[1] = 0; // Reset minor to 0
      version[2] = 0; // Reset patch to 0
      break;
    case 'minor':
      version[1] = parseInt(version[1]) + 1;
      version[2] = 0; // Reset patch to 0
      break;
    case 'patch':
      version[2] = parseInt(version[2]) + 1;
      break;
  }

  packageJson.version = version.join('.');
  await writeFile(packageArg, JSON.stringify(packageJson, null, 2));
}

bumpNpmVersion();
