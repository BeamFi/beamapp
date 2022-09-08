#!/usr/bin/env bash

echo Building Frontend UI for Development

echo Setting up robots.txt
cp ./scripts/config/robots-dev.txt ./public/robots.txt

echo Update canister_ids.json
cp canister_ids_dev.json canister_ids.json

echo Update NextJS .env.production
cp .env-dev.ic .env.production

echo Setup alternative origins
cp ./scripts/config/ii-alternative-origins-dev.json ./public/.well-known/ii-alternative-origins