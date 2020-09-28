# realtime application

## Steps to run the app

### Prerequisites
    1. docker and docker-compose 
    *Software especifications of my environment
        -Debian 10 (Buster)
        -Docker 19.03.11
        -Docker-compose 1.25.0-rc2

### 1 Download this file https://github.com/SPLAYER-HD/realtimeIOT/tree/master/release.tar
### 2 Decompres
    ```bash
        tar -xvf release.tar
    ```
### 3 Go to the release folder
    ```bash
        cd release
    ```
### 4 Run docker compose command (this command will download all the images and mount the required containers)
#### !`You will be able to see the test logs while the containers are starting up, please just don't the option --detach or -d to the docker-compose command`
    ```bash
        sudo docker-compose -f release.yml up
    ```

### 5 Open the folowwing URL in a browser
    http://localhost:9090/public/

----------------------------------------------------------------------------------------

# Architecture (Current)

![Architecture ](https://github.com/SPLAYER-HD/realtimeIOT/blob/master/assets/Realtime-Architecture.png)
![Database ](https://github.com/SPLAYER-HD/realtimeIOT/blob/master/assets/Realtime-Architecture-Database.png)



## Docker Hub URL
    https://hub.docker.com/r/diegotorres95/realtime_production

# TODO
## There are many things to improve, most of them I didn't do because of time, and some few because depend on the business case and the goals of the application.

# Architecture (TODO)

![Architecture_improved ](https://github.com/SPLAYER-HD/realtimeIOT/blob/master/assets/Realtime-Architecture-Architecture-improved.png)
![Database_improved ](https://github.com/SPLAYER-HD/realtimeIOT/blob/master/assets/Realtime-Architecture-Database-improved.png)

With this new database model, we can monitor any kind of devices like a refrigerator, truck doors, truck motor or even in others business cases like casino slot machines or buildings with many sensors and sending different kind of events.

## Database Module 
    -Modify entity fridge to generalize device types
    -Modify entity temperature to generalize sensor types
    -Add flow control for different HTTP error codes and create custom error extending Error

## Api Module 
    -Add authentication JWT
    -Add header with Helmet
    -Define response and request body (Header, Body, Validations)

## MQTT Module
    -Change backend MQTT to persistence database if is necessary 

## Sensor Module
    -There is a timer for all fridges. However in a real project, the sensors are who emit the event, then each sensor has to implemented realtime-sensor and emits their information in parallel.
    -This model mustn't have realtime-db as a dependency, in this case, is only to know the fridges name to consume rest service with temperature info (PragmaTeam) and simulate a sensor emitting data, but in a better environment sensor module is called by a sensor device or by who emit the event.

## Front Module
    -Create pipe to re-transmit messages in server.js, this will make an easier code.
    -Remove hot deploy
    -Add service worker
    -Add lazy load
    -Add responsible design and definitely help of a good graphic designer hahaha!
    -extract environment variables before build app to set URL, PORTS and static variables

## Docker
    -Build a separated docker for Front, Api and MQTT modules
    -Clean folders before creating image
    -Add script to validate if Postgres is available

## General
    -Implement security system with JWT authentication for HTTP and socket connections
    -For testing, create a module with fixtures generics for test all modules
    -I only implemented the success test, but it is necessary to add test with error flows.
    -It'd be better to wrapper the main API module in the Express js (server.js) on Front module like a proxy.
    -Add many logic validations, for example, min must be less than the max temperature in the range.
    -Use TDD is something that takes time in the beginning but it has countless benefits during the development and support process. In my opinion, this is more be a professional than knowledge and technologies. It is a change of mind. 
    -Add auditory tables and audit the flow
    -Change Mosca by other implementation because is deprecated maybe Aedes, RabbitMQ or other.
    -It is necessary to validate the specific cases when the temperature down because of external factors like door open (sensor on device) or environment temperature (sensor on the truck or online service), and calculate the variance allowed in these cases
    -Analyze static code with Sonar and implemented continuous integration with Jenkins
    -I develop a centralized error handler in realtime-common module, but it has to be improved controlling different cases, auditing the errors, sending alerts and make an error code list to make easier the support of the platform.
    -I think I have a good level of the cyclomatic complex, but there are software pieces to improve, manly in realtime-front module.
