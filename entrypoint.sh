#!/bin/sh
sleep 20
echo "configuring the environment"
cd /home/app/realtime/realtime-db
echo "configuring databaset"
npm run setup
echo "runing tests"
npm run test
echo "Load initial data"
node fixtures/index.js
echo "configuring realtime-api"
cd /home/app/realtime/realtime-api
echo "runing tests"
npm run test
echo 'starting api'
pm2 start server.js --name api
echo "configuring realtime-front"
cd /home/app/realtime/realtime-front
echo "runing tests"
npm run test
echo 'starting front'
#npm run build
pm2 start server.js --name front
echo "configuring realtime-mqtt"
cd /home/app/realtime/realtime-mqtt
echo 'starting mqtt'
pm2 start server.js --name mqtt
echo "configuring realtime-sensor"
cd /home/app/realtime/realtime-sensor
echo 'starting simulation of sensor'
node simulator/index.js 