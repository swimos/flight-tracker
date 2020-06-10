#!/usr/bin/env bash

# export NAMESPACE_NAME=FlightInfo-Event-Hub
# export AGGREGATE_HUB_NAME=countshub
# export AIRPLANE_HUB_NAME=flightinfohub
# export SASKEY_NAME=RootManageSharedAccessKey
# export SAS_KEY=/YGVFRTPSZCFZguDN88R+CVk699UIa7Fl8akJc0npuk=

printf "Start Flight Info App\n"

cd ./server
./gradlew run 

