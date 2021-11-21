#!/bin/bash
set -e

echo "Running lint"
yarn lint

echo "Running production build"
yarn build

clear
echo "Success"