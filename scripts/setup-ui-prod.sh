#!/usr/bin/env bash

echo Building Beam Frontend UI for Production

echo Update canister_ids.json
cp canister_ids_prod.json canister_ids.json

echo Update NextJS .env.production
cp .env-prod.ic .env.production