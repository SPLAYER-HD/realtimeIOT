# realtime application

## Steps to test 

### 1 Local build
    - download this file https://github.com/SPLAYER-HD/realtimeIOT/tree/master/release.tar
    - decompres
        ```bash
            tar -xvf release.tar
        ```
    - to locate in the folder /release
        ```bash
            cd release
        ```
    - run docker compose (this command download all the containers required)
    !`if you want to see the result of automatic tests don't add the parameter --detach or -d and you will be able to see them in the log while the docker is upping`.
        ```bash
            sudo docker-compose -f release.yml up
        ```

# Architecture (Current)

![Architecture ](https://github.com/SPLAYER-HD/realtimeIOT/blob/master/assets/Realtime-Architecture.png)
![Database ](https://github.com/SPLAYER-HD/realtimeIOT/blob/master/assets/Realtime-Architecture-Database.png)

I use TDD process to develop the most important backend modules, developing an event driven architecture where the temperature sensor is the main emmiter. NodeJS offer us a great platform to work with this kind of uses cases how is IOT in this case. having only one thread we can manage asynchronously multiple request from our sensors and api customers. Here is where a queue tool has an important use, for that reason I implemented MQTT wich is a system designed to IOT. In a application more sensitive to data loss we can use RabbitMQ or ActiveMQ. I used standard as linter in all modules as well.

I started developing the backend. I decide to make different modules with a specific purpose, in this way all components will be reusable. I developed a realtime-db module, here there is the PostgreSQL connection using sequilize as ORM and exposing functions as libraries to make specific queries.

After that I developed the realtime-api module where I use the realtime-db as a file-dependence to expose http services, in this case only for our forntend in ReactJS.

Then I developed the realtime-MQTT and realtime-sensor modules. The sensor emit a signal with the current temperature (interval simulated), the mqtt module recive the data by socket and notify. Realtime-api been subscripted to these messages, recive the temperature and notify the front module.

At the end I developed realtime-front module with ReactJS where I consume the realtime-api module by http to get the 6 refrigerator and I open a socket to hear events from any thermometer, then each Fridge react component decide if the metric belongs to that fridge and add the data to an array to draw a char and put the number of the current temperature using gray color when is between the normal params and red when is out of the constraint temperature params.


# Architecture (TODO)

![Architecture_improved ](https://github.com/SPLAYER-HD/realtimeIOT/blob/master/assets/Realtime-Architecture-Architecture-improved.png)
![Database_improved ](https://github.com/SPLAYER-HD/realtimeIOT/blob/master/assets/Realtime-Architecture-Database-improved.png)

With this database model we can think in devices like refrigerator, truck doors, truck mortor or even in others business cases like slot machines in a casino or a buildings having many sensors and sending different kind of metrics, where we can monitor specific places or specific machines.

In a real enviaronment, I would use this architecture, deploying in AWS where we can use fargate to deploy the containers RDS to deploy our database and using cluster and balancers to make auto-scaling. Opening new business cases with all data colected.

## Docker Hub URL
    https://hub.docker.com/r/diegotorres95/realtime_production
# TODO
## There ara many things to improve, most of them I didn't do because of time, and some few because depend of the business case and the goals of the application.

## Database Module 
    -Modify entity fridge to generalize as type of device
    -Modify entity temperature to generalize as type of sensor
    -Add flow control for different http error codes and create custom extends Error

## Api Module 
    -Add authentication jwt
    -Add header with Helmet
    -Add define generic body response and request (Header, Body, Validations)

## MQTT Module
    -Change backend mqtt to persistence database if is necessary 

## Sensor Module
    -There is a timer for all fridges. However in a real project the sensors are who emit the event, then each sensor have to implemented realtime-sensor and emit their information in parallel.
    -This model mustn't have realtime-db as a dependency, in this case is only to know the fridges name to consume rest service with temperature info (PragmaTeam) and simulate a sensor emmiting data, but in a better environment sensor module is called by a sensor device or by who emit the event.

## Front Module
    -Create pipe to re-transmite messages in server.js, this will make a easier code.
    -Remove hot deploy
    -Add serviveworker
    -Add lazy load

## Docker
    -Build a separated docker for Front, Api and MQTT modules
    -Clean folders before create image
    -Add script to validate if postgres is available

## General
    -Implement security sistem with jwt authentication for http and socket connections
    -For testing purpose create a module with fixtures generics for test all modules
    -I only implemented success test, but it is necessary add test with error flows.
    -It'd be better to wrapper the main Api module in the Express js (server.js) on Front module like a proxy.
    -Add many logic validations, for example: min must to be less than max temperature in the range.
    -Use TDD is something that take time at the beginning but it has countless benefits during the development and support process. In my opinion this is more be a professional than knowledge and technologies. It is a change of mind. 
    -Add auditory tables and audit the flow
    -Change mosca by other implementation because is deprecated maybe Aedes, RabbitMQ or other.
    -It is necessary validate the specific cases when the temperature down because of external factors like door open (sensor on device) or environment temperature (sensor on the truck or online service), and calculate the variance allowed in these cases
    -Analize static code with Sonar and implemented continuos integration with Jenkins
    -I develop a centralized error handler in realtime-common module, but it has to be improved controling diferent cases, auditing the erros, sending alerts and make an error code list to make easier the support of the platform.
    -I think I have good level of cyclomatic complex, but there are software pieces to improve, manly in realtime-front module.
