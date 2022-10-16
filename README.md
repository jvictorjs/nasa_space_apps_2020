# Team Firesafe - Nasa Space Apps 2020 (Location: Recife)

Link to the project description: https://2020.spaceappschallenge.org/challenges/confront/spot-fire-3/teams/firesafe/project

The system is divided into two parts: the dashboard and the mobile app. Here are the instructions to run what we have implemented during the competition.

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

