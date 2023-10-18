#!/bin/bash

if [ -z "$1" ]; then
  echo "Please provide a version argument (patch, minor, major, or test)."
  exit 1
fi

version="$1"

echo "Updating version to $version"

if [ "$version" = "patch" ]; then
  node scripts/bumpNpmVersion.js ./package.json patch
elif [ "$version" = "minor" ]; then
  node scripts/bumpNpmVersion.js ./package.json minor
elif [ "$version" = "major" ]; then
  node scripts/bumpNpmVersion.js ./package.json major
elif [ "$version" = "test" ]; then
  echo "Continuing"
else
  echo "Invalid version"
  exit 1
fi

rm -rf lib
parcel build --no-cache --no-source-maps
cp -r package.json lib/package.json
cp -r README.md lib/README.md

npm run link
