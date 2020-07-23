#!/bin/sh
sleep 60
echo "configuring the environment"
cd /home/app/realtime/realtime-db
npm run setup
echo "configuring the environment"
#npm run test
node fixtures/index.js
cd /home/app/realtime/realtime-api
#npm run test
echo 'starting api'
pm2 start server.js --name api
cd /home/app/realtime/realtime-front
echo 'starting front'
#npm run build
pm2 start server.js --name front
cd /home/app/realtime/realtime-mqtt
echo 'starting mqtt'
pm2 start server.js --name mqtt
cd /home/app/realtime/realtime-sensor
echo 'starting sensor'
node simulator/index.js 