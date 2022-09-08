#!/bin/sh -l

run_cmd() 
{
  echo $1
  cmd=$1
  eval $cmd
  existStatus=$?
  if [ $existStatus -ne 0 ] 
  then
      echo "1st attempt error: "
      echo $existStatus

      echo "Rety once: "
      eval $cmd
      existStatus=$?

      if [ $existStatus -ne 0 ] 
      then
        echo "2nd attempt error: "
        echo $existStatus
        exit $existStatus
      fi
  fi
}

# Deploy UI Canisters
run_cmd "dfx deploy --network ic contentflyui"
