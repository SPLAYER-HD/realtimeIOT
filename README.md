# realtime application

## Steps to test 

### 1 Local build
    - download this file https://github.com/SPLAYER-HD/realtimeIOT/tree/master/release.tar
    - decompres
        ```bash
            tar -xvf release.tar
        ```
    - to locate int the folder /release
        ```bash
            cd release
        ```
    - run docker compose (this command download all the containers required)
        ```bash
            sudo docker-compose -f release.yml up
        ```

# Architecture (Current)

![Architecture ](https://github.com/SPLAYER-HD/realtimeIOT/blob/master/assets/Realtime-Architecture.png)
![Database ](https://github.com/SPLAYER-HD/realtimeIOT/blob/master/assets/Realtime-Architecture-Database.png)

# Architecture (TODO)

![Architecture_improved ](https://github.com/SPLAYER-HD/realtimeIOT/blob/master/assets/Realtime-Architecture-Architecture-improved.png)
![Database_improved ](https://github.com/SPLAYER-HD/realtimeIOT/blob/master/assets/Realtime-Architecture-Database-improved)

## TODO
# There ara many things to improve, most of them I didn't do because of time, and some few because depend of the business case and the goals of the application.

# Database Module 
    -Modify entity fridge to generalize as type of device
    -Modify entity temperature to generalize as type of sensor
    -Add flow control for different http error codes and create custom extends Error

# Api Module 
    -Add authentication jwt
    -Add header with Helmet
    -Add define generic body response and request (Header, Body, Validations)

# MQTT Module
    -Change backend mqtt to persistence database if is necessary 

# Sensor Module
    -There is a timer for all fridges. However in a real project the sensors are who emit the event, then each sensor have to implemented realtime-sensor and emit their information in parallel.
    -This model mustn't have realtime-db as a dependency, in this case is only to know the fridges name to consume rest service with temperature info (PragmaTeam) and simulate a sensor emmiting data, but in a better environment sensor module is called by a sensor device or by who emit the event.

# Front Module
    -Create pipe to re-transmite messages in server.js, this will make a easier code.
    -Remove hot deploy
    -Add serviveworker
    -Add lazy load

# Docker
    - build a separated docker for Front, Api and MQTT modules

# General
    -Implement security sistem with jwt authentication for http and socket connections
    -For testing purpose create a module with fixtures generics for test all modules
    -I only implemented success test, but it is necessary add test with error flows.
    -It'd be better to wrapper the main Api module in the Express js (server.js) on Front module like a proxy.
    -Add many logic validations, for example: min must to be less than max temperature in the range.
    -Use TDD is something that take time at the beginning but it has countless benefits during the development and support process. In my opinion this is more be a professional than knowledge and technologies. It is a change of mind. 
    -Add auditory tables and audit the flow
    -Change mosca by other implementation because is deprecated maybe Aedes, RabbitMQ or other.
    -It is necessary validate the specific cases when the temperature down because of external factors like door open (sensor on device) or environment temperature (sensor on the truck or online service), and calculate the variance allowed in these cases
 