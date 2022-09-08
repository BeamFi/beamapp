#!/usr/bin/env bash

echo Setup Beam UI for deployment

echo Setting up index.js
cp ./pages/index.js ./pages/cfindex.js
cp ./pages/beamindex.js ./pages/index.js

echo Setting up _document.js
cp ./pages/_document.js ./pages/_cfdocument.js
cp ./pages/_beamdocument.js ./pages/_document.js
