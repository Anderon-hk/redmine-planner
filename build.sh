#!/bin/bash

# Extract the image name from package.json
imageName=$(grep '"name"' package.json | sed -E 's/.*"name": "([^"]+)".*/\1/')

# Extract the version from package.json
version=$(grep '"version"' package.json | sed -E 's/.*"version": "([^"]+)".*/\1/')

# Get the current date in YYYYMMDD format
dateString=$(date +%Y%m%d.%H%M%S)

# Build the Docker image with version and date tag
docker build -f "./Dockerfile" -t "$imageName:$version-$dateString" .

# Optionally, tag the image as latest
docker tag "$imageName:$version-$dateString" "$imageName:latest"