#!/bin/sh
set -e # Exit on error
# set -x # Enable debugging

# Function to remove Verdaccio cache
remove_verdaccio_cache() {
  echo 'Removing Verdaccio cache...'
  rm -rf /Users/mirko/.config/verdaccio/storage/ui-kit
  rm -rf /Users/mirko/.config/verdaccio/storage/core
  echo 'Verdaccio cache removed'
}

# Function to build and publish a package to Verdaccio
build_and_publish_package() {
  local project_name=$1
  local package_name=$2

  cd "./$project_name" || exit 1

  # Uncomment the next two lines if you want to fetch updates from git before building
  # echo "Fetching $project_name updates..."
  # git pull origin develop # not working, maybe need credentials to be set before running this

  rm -r -f dist
  rm -r -f .angular

  echo "Building $project_name..."
  npm run build

  cd "dist/$package_name" || exit 1

  echo "Publishing $project_name to Verdaccio..."
  npm publish --registry "http://localhost:4000/"

  echo "$project_name updated"
  cd ../../..
}

# Function to reinstall dependencies for a project
reinstall_dependencies() {
  local project_name=$1
  echo "Refreshing dependencies for $project_name..."

  cd "./$project_name" || exit 1

  echo 'Removing packages...'
  rm -fr .angular/ node_modules/core node_modules/ui-kit

  echo 'Installing packages...'
  npm i core ui-kit
  cd ..
}

# Execution starts here

# Step 1: Remove Verdaccio cache
remove_verdaccio_cache

# Step 2: Build and publish packages
build_and_publish_package "ng-software-design-core" "core" &
build_and_publish_package "ng-software-design-ui" "ui-kit" &
wait

# Step 3: Reinstall dependencies for specific projects
reinstall_dependencies "ng-software-design" &
wait

# Exit with success status
exit 0
