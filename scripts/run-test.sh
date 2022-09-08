#!/usr/bin/env bash

string=$(dfx canister call jobflow_test test)
if [[ $string =~ "Success!" ]]
then
  echo $string
  echo Job Flow Tests passed successfully 😄🎉😃
else
  echo $string
  echo Job Flow Tests failed 🙈🙈🙈
  exit 1
fi

string=$(dfx canister call util_test test)
if [[ $string =~ "Success!" ]]
then
  echo $string
  echo Util Tests passed successfully 😄🎉😃
else
  echo $string
  echo Util Tests failed 🙈🙈🙈
  exit 1
fi

string=$(npm run test:mo:permission)
if [[ $string =~ "passed" ]]
then
  echo $string
  echo Permission Tests passed successfully 😄🎉😃
else
  echo $string
  echo Permission Tests failed 🙈🙈🙈
  exit 1
fi

exit 0
