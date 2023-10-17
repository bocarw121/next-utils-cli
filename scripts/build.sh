echo "Is this a patch, minor, or major update?"

read -p "Enter patch, minor, major or test : " version

echo "Updating version to $version"

if [ $version = "patch" ]; then
  node scripts/bumpNpmVersion.js ./package.json patch
elif [ $version = "minor" ]; then
  node scripts/bumpNpmVersion.js ./package.json minor
elif [ $version = "major" ]; then
  node scripts/bumpNpmVersion.js ./package.json major
elif [ $version = "test"]; then
  echo "continuing"
else
  echo "Invalid version"
fi

rm -rf lib
parcel build --no-cache --no-source-maps
cp -r package.json lib/package.json
cp -r README.md lib/README.md

npm run link

# streamline freplace -f ./lib/types.d.ts -s "type DataType = 'premium' | 'free';" -r "$(cat tools/types.ts)"

# sed -i '' 's/import("types").//g' ./lib/types.d.ts
