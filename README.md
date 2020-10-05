# Team Firesafe - Nasa Space Apps 2020 (Location: Recife)

Link to the project description: https://2020.spaceappschallenge.org/challenges/confront/spot-fire-3/teams/firesafe/project

The system is divided into two parts: the dashboard and the mobile app. Here are the instructions to run what we have implemented during the competition.

## Running the dashboard

First of all, you need to run:
```
pip install -r requirements.txt
```
so that you will install the required libraries.

Then, you have to download two databases and put them inside the folder "dashboard_and_risk":

* https://firms.modaps.eosdis.nasa.gov/data/active_fire/noaa-20-viirs-c2/shapes/zips/J1_VIIRS_C2_South_America_24h.zip
* https://e4ftl01.cr.usgs.gov/MOTA/MCD12C1.006/2019.01.01/MCD12C1.A2019001.006.2020220162300.hdf

You need to create an account in Mapbox (https://www.mapbox.com/) and put your token in the "keys.py" file. Also, an account in Mateomatics is needed and your username and password must also be put in the mentioned file.

Finally, make sure you are inside the folder "dashboard_and_risk" and run:
```
python dashboard_demo.py
```

### What has been implemented?

Just a small part of the dashboard was implemented:

* Active fire (data from FIRMS) visualization with high risk areas (prediction made with a very simple heuristic using only the wind direction - there was no time to build a prediction model);
* Relative humidity visualization;
* Wind speed and direction. In this map, the wind direction is represented by a rocket due to the absense of an arrow in the icons database (plotly dash). For wind speed, hover the mouse over each rocket.


## Running the mobile app

### What has been implemented?
