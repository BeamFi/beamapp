# BeamFi App

## Quick Start

Switch to dev Git branch if you haven't.

### Dev Environment Setup

- Install NodeJS 16.13 or if you have NVM:

```
nvm use
```

- VSCode

Install Extensions: ESLint, Prettier

### Run frontend with BeamFi dev canisters

The default configuration is set to use BeamFi dev canisters for ease of frontend development so that it doesn't require local IC replicas.

```
> npm install
> npm run dev
```

### Create Beam and Plug Wallet

You will need Plug Wallet chrome extension https://plugwallet.ooo/ to create Beam in "Beam Out" and some ICP tokens.
You can get ICP tokens from exchanges like Binance AU or speak to Henry (henry@beamfi.app) to get some ICP for your testing.
(Note they are real ICP with value so your testing is as close to real world as possible).

# Dev Process

## Git Branches

dev - all development code will first merge to dev first, any push to dev will trigger deployment to https://dev.beamfi.app  
main - this is where the productuction stable code is, it require manual trigger in Github Action to deploy to https://beamfi.app

## Pull Request & Review

- When working on a new feature, create a new feature branch based on main branch and work on there.
- When it is ready for testing or review, submit a Pull Request to dev branch.
- The main contributor will review and give feedback.
- When the review is complete, the PR will be merged to dev for testers to try it in frontend
- When it passed the manual human tests, new changes will be merged to main branch and manager can trigger Github Action to deploy to production.

## Folder Structures

pages - Main page entry  
ui/components - React Components  
ui/declarations - IC Candid (similar to Solidity ABI) files for interacting with Canisters (generated from DFX cmd)  
ui/service/actor - Service locator pattern to make actor for interacting with canisters  
ui/components/auth - Plug Wallet chrome extension interaction code (similar to Metamask). More details https://docs.plugwallet.ooo/  
ui/styles/theme.js - Chakra themes style  
scripts - CI / CD scripts for use with Github Actions

## Tech Stacks

Frontend UI is a SPA (Singel Page Application) developed with NextJS, React and Chakra UI.
Since the webapp is intended to run as static page deployed to IC assets canisters, only the client side features of NextJS is used.
All server side features like dynamic routing or server side rendering will not work.

React Router is used for client side routing. See /pages/index.js and /ui/components/beam/screen

## Wiring of Canister ID to frontend

The magical part that connects canister ID to frontend app is dfx.webpack.config.js.
It reads canister_ids.json and export it as NEXT_PUBLIC_BEAM_CANISTER_ID for Beam canister for example.
See /ui/declaration/beam/index.js

## Continuous Delivery

Two Github workflows are used for deploying to dev (https://dev.beamfi.app) and prod (https://beamfi.app)

The main difference between them is the canister ids they connect to but all of the canisters run on IC mainnet canisters.
There is no IC testnet. Treat the dev environment like staging environment. Your local IC replicas is your own testnet.

## Connect to BeamFi local canisters

When you have BeamFi canister setup in local IC replicas, you can connect to it by:

- From BeamFi backend Git project, copy canisters_id.json to .dfx/local/canisters_id.json
- copy env.iclocal to env.development and env.production (note env.production is only required if you run next export)
- run next server

```
> cp env.iclocal env.development
> npm run dev
```

## Connect to BeamFi production canisters

You don't want to do this most of the time but in case you need to debug production issues.

Copy canisters_id_prod.json to canisters_id.json and start nextjs server

```
> cp canisters_id
> cp env.ic env.development
> npm run dev
```

## Frontend Assets Hosting

At the moment, BeamFi frontend app is hosted in Firebase Hosting as static pages export for best performance through CDN.

We intend to provide an alternative option with better security by deploying it to IC assets canisters with custom domain (using ICFront) so that we can use HTTP Assets Certification for users who need the best security.
https://wiki.internetcomputer.org/wiki/HTTP_asset_certification
https://github.com/dfinity/icfront

## Author

Henry Chan, henry@beamfi.app
Twitter: @kinwo

## Contributing

Pleaes feel free to raise issue or submit a pull request.

## License

© Copyright 2022 Control Alt Develop Pty Ltd, all rights reserved.
