## TODO
-db modify entity fridge to generalize as type of sensor
-db modify entity temperature to generalize as type of input
-api add jwt
implement backend mqtt --Done
-sensor Now there is a timer for all fridges. However in a real project the sensors are who emit the event, then each sensor have to implemented realtime-sensor and emit their information in parallel.
-api add flow control for different http error and create custom extends Error
-testing create module with fixtures generics for test all modules
-front create pipe to re-transmite messages
- docker add ngnix, make docker to front other for back and other for sensor if the use case need it
- front and api, if it's worth it'd be better to wrapper api in other express module and connect the API for HTTP request and mqqt model to socket request
- sensor model mustn't have realtime-db as a dependency, in this case is only to know the fridges name to consume rest service with temperature info and simulate a sensor emmiting data, but in a better environment sensor module is called by sensor device or who emit the event.
