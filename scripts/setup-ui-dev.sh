#!/usr/bin/env bash

echo Building Beam Frontend UI for Development

echo Update canister_ids.json
cp canister_ids_dev.json canister_ids.json

echo Update NextJS .env.production
cp .env-dev.ic .env.production