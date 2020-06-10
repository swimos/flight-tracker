#!/usr/bin/env bash

printf "Start Flight Tracker App\n"

rm *.log
rm *.err

# export NAMESPACE_NAME=FlightInfo-Event-Hub
# export AGGREGATE_HUB_NAME=countshub
# export AIRPLANE_HUB_NAME=flightinfohub
# export SASKEY_NAME=RootManageSharedAccessKey
# export SAS_KEY=/YGVFRTPSZCFZguDN88R+CVk699UIa7Fl8akJc0npuk=

printf "Start simulator\n"
cd ./simulator
./dist/swim-simulator-3.11.0-SNAPSHOT/bin/swim-simulator > ../sim.log 2> ../sim.err < /dev/null &

printf "Start server\n"
cd ../server
./dist/swim-flightInfo-3.11.0-SNAPSHOT/bin/swim-flightInfo  > ../app.log 2> ../app.err < /dev/null &

printf "Startup complete\n"