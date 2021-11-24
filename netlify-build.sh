#!/bin/bash
set -e

# Removing firebase directory
echo "Removing firebase directory"
rm -rf firebase

# Running build command
yarn build

