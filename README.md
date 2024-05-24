# Smart Home Automation

## Project Overview
The Smart Home Automation project is designed to provide real-time environmental monitoring through a dynamic web interface. This system uses a combination of six different sensors: Light Dependent Resistor (LDR), DHT11 (Temperature and Humidity), MQ5 (Gas), MQ2 (Smoke), Sound, and Proximity sensors. The data from these sensors is visualized on a dynamic website built with HTML, CSS, JavaScript, and React. The visualization includes live graphs that display the changes in sensor values over time, with graph lines that turn red when values exceed predefined thresholds, otherwise remaining green.

## Features
- **Real-Time Monitoring**: Continuously track environmental data from multiple sensors.
- **Dynamic Data Visualization**: Live graphs displaying real-time sensor data on a web interface.
- **Threshold Alerts**: Graph lines change color based on sensor value thresholds to indicate critical conditions.

## Technologies Used
### Frontend Development:
- **HTML & CSS**: Used for structuring and styling the website, ensuring it is visually appealing and functional.
- **JavaScript**: Provides the interactive elements on the website, handling the dynamic updating of sensor data.
- **React**: A powerful JavaScript library used to build the user interface components, enabling the seamless rendering of updates to the data visualizations without needing to reload the page.

### Sensors:
- **LDR (Light Dependent Resistor)**: Measures light levels to monitor changes in lighting conditions.
- **DHT11**: Captures temperature and humidity data, critical for managing indoor climate.
- **MQ5 Gas Sensor**: Detects levels of various gases, useful for identifying leaks or unsafe conditions.
- **MQ2 Smoke Sensor**: Essential for early detection of fires through smoke monitoring.
- **Sound Sensor**: Monitors noise levels, which can be used for security alerts or noise pollution management.
- **Proximity Sensor**: Detects the presence or absence of objects or individuals, useful for security and automated room settings.

## Usage
Once the application is running, navigate to the homepage which will display live graphs for each sensor. Watch as the graph lines change from green to red when sensor values exceed their thresholds.


<iframe width="560" height="315" src="https://www.youtube.com/embed/eygm6eAkMXQ?si=Eu1w01w6v8qWR8ky" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

