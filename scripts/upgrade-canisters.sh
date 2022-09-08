#!/bin/sh -l

run_cmd() 
{
  echo $1
  cmd=$1
  eval $cmd
  exitStatus=$?
  if [ $exitStatus -ne 0 ] 
  then
      echo "1st attempt error: "
      echo $exitStatus

      echo "Rety once: "
      eval $cmd
      exitStatus=$?

      if [ $exitStatus -ne 0 ] 
      then
        echo "2nd attempt error: "
        echo $exitStatus
        exit $exitStatus
      fi
  fi
}

# Deploy & Upgrade Canisters
npm install -g yes
run_cmd "dfx canister --network ic stop notification"
yes yes | dfx deploy --network ic
run_cmd "dfx canister --network ic start notification"
run_cmd "dfx canister --network ic call job initSubscriber"