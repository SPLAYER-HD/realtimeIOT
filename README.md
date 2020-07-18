## TODO
-db modify entity fridge to generalize as type of sensor
-db modify entity temperature to generalize as type of input
-api add jwt
implement backend mqtt --Done
-sensor Now there is a timer for all fridges. However in a real project the sensors are who emit the event, then each sensor have to implemented realtime-sensor and emit their information in parallel.
-api add flow control for different http error and create custom extends Error
-testing create module with fixtures generics for test all modules