#!/usr/bin/env bash

echo Setup Beam UI for deployment

echo Setting up index.js
mv ./pages/beamindex.js ./pages/index.js

echo Setting up _document.js
mv ./pages/_beamdocument.js ./pages/_document.js
