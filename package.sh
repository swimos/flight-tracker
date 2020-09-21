
printf "Packaging app\n"

rm -rf ./simulator/dist
rm -rf ./server/dist

mkdir ./simulator/dist
mkdir ./server/dist

printf "\nBuild App Server\n"
cd server/
./gradlew build

printf "\nBuild Simulator app\n"
cd ../simulator/
./gradlew build

cd ../

printf "\nPrepare App Server Dist folder\n"
tar -xf ./server/build/distributions/swim-flightInfo-3.10.2.tar -C ./server/dist/
rm server/dist/swim-flightInfo-3.10.2/lib/jffi-1.2.17-native.jar

printf "\nPrepare Simulator Dist folder\n"
tar -xf ./simulator/build/distributions/swim-simulator-3.10.2.tar -C ./simulator/dist/
rm simulator/dist/swim-simulator-3.10.2/lib/jffi-1.2.17-native.jar

printf "\ndone.\n"