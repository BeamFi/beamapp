#!/usr/bin/env bash

echo Building Beam Frontend UI for Development

echo Setting up robots.txt
cp ./scripts/config/robots-dev.txt ./public/robots.txt

echo Update canister_ids.json
cp canister_ids_dev.json canister_ids.json

echo Update NextJS .env.production
cp .env.icdev .env.production