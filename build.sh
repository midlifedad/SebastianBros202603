#!/bin/bash
# Build all presentation versions for production deployment
set -e

VERSIONS_DIR="versions"
VERSIONS_JSON="$VERSIONS_DIR/versions.json"
DIST_DIR="dist"

# Clean previous build
rm -rf "$DIST_DIR"

# Read version IDs from versions.json
VERSION_IDS=$(node -e "
  const v = require('./$VERSIONS_JSON');
  v.versions.forEach(ver => console.log(ver.id + ' ' + ver.file));
")

# Build each version
while IFS=' ' read -r id file; do
  echo "Building version: $id ($file)"
  npx slidev build "$VERSIONS_DIR/$file" --base "/$id/" --out "$DIST_DIR/$id"
done <<< "$VERSION_IDS"

# Copy selector page and versions.json to dist root
cp public/index.html "$DIST_DIR/index.html"
cp "$VERSIONS_JSON" "$DIST_DIR/versions.json"

echo ""
echo "Build complete. Versions built:"
ls -d "$DIST_DIR"/*/
echo "Selector page: $DIST_DIR/index.html"
