# Team Firesafe - Nasa Space Apps 2020 (Location: Recife)

The system is divided into two parts: the dashboard and the mobile app. Here are the instructions to run what we have implemented during the competition.

Link to the project description: https://2020.spaceappschallenge.org/challenges/confront/spot-fire-3/teams/firesafe/project

<details> 
  <summary><h3>Project Description</h3></summary>

  ### Spot That Fire V3.0
Recent wildfires worldwide have demonstrated the importance of rapid wildfire detection, mitigation, and community impact assessment analysis. Your challenge is to develop and/or augment an existing application to detect, predict, and assess the economic impacts from actual or potential wildfires by leveraging high-frequency data from a new generation of geostationary satellites, data from polar-orbiting environmental satellites, and other open-source datasets.

### Firesafe: Giving Quick Response to Wildfires

### Summary
The early and effective combat to wildfires is critical to avoid major damages. However, a few challenges are posed, especially in poor countries: fire notifications usually take some time to be processed; wildfires demand more firefighters in different places than the amount available; there is a lack of data about the active fire. Thus, our project aims at providing a dashboard with near real-time crowd-sourced and satellite data. In this dashboard, active fires would be shown besides high-risk areas, highlighting areas with a higher probability of human and economic losses, so that any commander could quickly take more assertive strategical decisions in order to minimize such damages.

### How We Addressed This Challenge
The proposed system has two parts: the management dashboard and the mobile app. The management dashboard must show active fires and high-risk areas in a map divided in several cells that form a grid. The high-risk areas are cells that have borders to cells with active fires and are classified as such by a machine learning model. Such a model takes into account the relative humidity in the cell on fire, wind speed, wind direction, atmospheric temperature and fuel to predict whether the fire will reach a given cell and when. The target of the training database for a given sample (cell) is how long the fire from a neighbor burning cell took to arrive, since the fire started in the given neighbor cell. Also, using land cover data, cells with human constructions are detected and when these areas are at risk, a stronger alert is emitted. With such a feature, a commander can take strategical decisions in order to better distribute firefighters and brigadists in an attempt to minimize human, wildlife and economic losses, even though firefighters and brigadists are scarse. Also, with this data being quickly available, important actions can be taken as early as possible.

However, there are periods and places that remain in blind spot areas for some time, which can be critical to avoid major damages. Therefore, an alternative mean for early notification of wildfires is through crowd-sourcing. Anyone using the mobile app can quickly send a geolocalized notification to the system, which will be shown in the strategical dashboard. This way, blind spots in the satellite-provided data can be diminished by the users of the mobile app. Our hypothesis is that we can reach nearly real-time notifications of active fires with a higher coverage than the sattelite-only based solutions. Also, notifying a fire station through a telephone call can be very inefficient, since a fire notification usually takes some time to reach a commander and be transformed into an effective action. Thus, the fire notifications sent through the system can quickly reach whoever is in charge to take strategical decisions and reduce the time to response. In case the user does not have internet connection, what usually happens in poor countries when the user is far from urban areas, an SMS with its location as text content is sent to the central system, which must receive the text, parse it and store the sent notification.

Still regarding the dashboard visualization, the commander can also quickly notify registered firefighters and brigadists to show up as soon as possible in the fire station in order to give the briefing of the mission and combat a given notified wildfire. Besides, the people that are located in high risk areas and are using the mobile app can receive a fire alert whenever the commander finds it necessary. Such a decision can be taken by observing the areas classified as high risk by the prediction model. The mobile app will then show the alert to the user and it will be aways showing a map with the high risk area highlighted. Our hypothesis is that such a solution can reduce the number of deaths or material losses if people leave early with their most importan belongings from high risk areas.

### How We Developed This Project
We have seen everyday news about wildfires in Brazil, USA and Australia with terrible consequences, not only to the wildlife and human life, but also to the economy. It is clear that wildfires are happening more and more often as the time goes by and due to the climate changes, their extensions are becoming larger and larger. It means that combating such a hazard will be even harder in the future. Thus, we found extremely necessary to create a computational tool to augment the combat capacity of firefighters and brigadists. Since there is lots and lots of useful data available on the internet nowadays, we have decided that our approach should be data-driven.

We've spent some time looking for news and academic papers to understand the main problems in the field and their potential solutions, until we came across a paper where the authors propose a model to predict the spread of wildfires and allocate optimally human resources in order to minimize the life and economic losses: "A spatial optimization model for resource allocation for wildfire suppression and resident evacuation", written by Zhou and Erdogan, both from San Jose State University, and published in 2019 in the journal Computers & Industrial Engineering (Elsevier). It seemed to be a relatively simple approach to solve and extremely important problem. Then, this approach served as a basis for the core of our project: the management dashboard. Also, to better understand the problems and validate our solution, we've talked to three firefighters (Captains) from our state, Pernambuco, Brazil. We were amazed by the number of interesting problems they have and that we can solve using currently available technologies.

In order to partially develop some of the main features, we used Python for the dashboard, which was built in Plotly Dash, and React Native and Node to the mobile app. Unfortunately we did not have time to implement the wildfire spread prediction algorithm. However, in order to implement the dashboard, we developed a very simples heuristic using only the wind direction. We couldn't implement features such as user CRUD or the communication between the mobile app and the dashboard.

### How We Used Space Agency Data in This Project
Space agency data was utterly important to propose our prediction model and build our dashboard. As already mentioned, the following variables were used as the input of our model, followed by their respective sources:

- Active Fire: FIRMS - NASA (https://firms.modaps.eosdis.nasa.gov/active_fire/#firms-shapefile)

- Wind speed, wind direction, humidity and atmospheric temperature: Meteomatics API(https://www.meteomatics.com/en/api/request/)

- Land cover: USGS - NASA (https://e4ftl01.cr.usgs.gov/MOTA/MCD12C1.006/2019.01.01/MCD12C1.A2019001.006.2020220162300.hdf)


### Project Demo
https://drive.google.com/file/d/1E3SJT9Yf7oL0TciXfgmyYx31dwxgzJlF/view

### Project Code
https://github.com/lacerdamarcelo/nasa_space_apps_2020

### Data & Resources
FIRMS - NASA (https://firms.modaps.eosdis.nasa.gov/active_fire/#firms-shapefile)

Meteomatics API (https://www.meteomatics.com/en/api/request/)

Land cover: USGS - NASA (https://e4ftl01.cr.usgs.gov/MOTA/MCD12C1.006/2019.01.01/MCD12C1.A2019001.006.2020220162300.hdf)

### Judging
This project was submitted for consideration during the Space Apps Judging process.

</details> 


## NASA International Space Apps Challenge
It is the largest annual space & science hackathon in the world!
https://www.spaceappschallenge.org/about/
> The NASA International Space Apps Challenge (Space Apps) is an international hackathon for coders, scientists, designers, storytellers, makers, builders, technologists, and others in cities around the world, where teams engage the National Aeronautics and Space Administration’s (NASA’s) free and open data to address real-world problems on Earth and in space. 

> Each October, over the course of two days, Space Apps brings participants from around the world together at hundreds of in-person and virtual local events to solve challenges submitted by NASA experts. After the hackathon, project submissions are judged by space agency experts and winners are selected for one of 10 Global Awards.

> Space Apps provides problem-solvers worldwide with NASA’s free and open data, giving teams the opportunity to learn how to use these resources to solve each year’s challenges.

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

To run the mobile just run at /mobile folder:
```bash
npm install
```
and then:
```bash
npm start
```
It will open the Expo server. You can install the Expo App in your phone, scan the Expo QR code, so the app will be running.

### What has been implemented?

* We launched a MVP app, still not integrated with the active fire API. Just a base app for future improvements.
<img src="https://user-images.githubusercontent.com/28718999/196056312-d90a8b25-86da-4432-b4cb-977c72638f00.jpg" width="400" />


## UPDATE! We got the 2nd place!
Here it is a journal news with our names: https://blogs.ne10.uol.com.br/mundobit/2020/10/27/pernambucanas-sao-as-primeiras-colocadas-no-nasa-space-apps-challenge/
> Em segundo lugar, ficou a equipe composta por Arthur Felipe, mestre em Ciência da Computação pela UFPE/ CTO na Intelivix; Camylle Vieira, designer gráfico pela UFPE; João Victor, analista de T.I no Ministério da Economia; e Marcelo Gomes, cientista de Dados sênior na Procuradoria Geral do Estado de PE. Eles crioram o projeto “Firesafe”, uma aplicação mobile que tem o objetivo de aumentar a capacidade de combate aos incêndios por parte do Corpo de Bombeiros com o apoio da população. A solução permite a junção de dados de satélite com fogo ativo e notificações enviadas pela população civil, agilizando a comunicação com os bombeiros.

Instagram post: https://www.instagram.com/p/CGHzBfUIV4R/?hl=en
![Screenshot 2022-10-15 002038](https://user-images.githubusercontent.com/28718999/195966645-4639aaad-9ec4-4b1a-9563-2e5e34a71e78.png)

Another related post with some pictures:
https://www.instagram.com/p/CGIxh_1IF6K/?utm_source=ig_web_copy_link
![Screenshot 2022-10-15 002434](https://user-images.githubusercontent.com/28718999/195966771-f9eb1d76-cbd5-46ff-a10b-980f2fa1174d.png)

