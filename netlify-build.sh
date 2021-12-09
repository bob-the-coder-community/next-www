#!/bin/bash
set -e

# Removing firebase directory
echo "Removing firebase directory"
rm -rf firebase

# Building sitemap
echo "Building sitemap.xml"
node ./sitemap.xml

# Running build command
yarn build

