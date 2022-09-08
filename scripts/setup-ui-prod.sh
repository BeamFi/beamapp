#!/usr/bin/env bash

echo Building Frontend UI for Production

echo Setting up robots.txt
cp ./scripts/config/robots-prod.txt ./public/robots.txt

echo Update canister_ids.json
cp canister_ids_prod.json canister_ids.json

echo Update NextJS .env.production
cp .env-prod.ic .env.production