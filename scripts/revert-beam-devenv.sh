#!/usr/bin/env bash

echo Setup Beam UI for deployment

echo Revert index.js
cp ./pages/indexjs ./pages/beamindex.js
mv ./pages/cfindex.js ./pages/index.js

echo Revert _document.js
cp ./pages/_document.js ./pages/_beamdocument.js
mv ./pages/_cfdocument.js ./pages/_document.js
