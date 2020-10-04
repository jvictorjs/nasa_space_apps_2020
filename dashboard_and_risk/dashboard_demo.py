import json
import h5py
from keys import mateomatics_user, password_user, mapbox_token
import requests
import pandas as pd
import numpy as np
from io import StringIO
from requests.auth import HTTPBasicAuth
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import plotly.express as px
import meteomatics.api as api
import plotly.graph_objects as go
import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output

def convert_grid_into_coordinates_box(index_lat, index_lon):
    cell_size_lat = 0.049975
    cell_size_lon = 0.04999001
    lower_lat = index_lat * cell_size_lat - 90
    lower_lon = index_lon * cell_size_lon - 180
    higher_lat = index_lat * cell_size_lat + cell_size_lat - 90
    higher_lon = index_lon * cell_size_lon + cell_size_lon - 180
    return [lower_lat, lower_lat, higher_lat, higher_lat], [lower_lon, higher_lon, higher_lon, lower_lon]

def get_polygon(lons, lats, color='blue'):
    if len(lons) != len(lats):
        raise ValueError('the legth of longitude list  must coincide with that of latitude')
    geojd = {"type": "FeatureCollection"}
    geojd['features'] = []
    coords = []
    for lon, lat in zip(lons, lats): 
        coords.append((lon, lat))   
    coords.append((lons[0], lats[0]))  #close the polygon  
    geojd['features'].append({ "type": "Feature",
                               "geometry": {"type": "Polygon",
                                            "coordinates": [coords] }})
    layer=dict(sourcetype = 'geojson',
             source =geojd,
             below='',  
             type = 'fill',   
             color = color)
    return layer

px.set_mapbox_access_token(mapbox_token)
grid_rows = 3600
grid_cols = 7200

wildfire_data = pd.read_csv('J1_VIIRS_C2_South_America_24h.csv')
climate_data = pd.read_csv('climate_data.csv')
climate_data.drop_duplicates(['lat', 'lon'])
f = h5py.File("MCD12C1.A2019001.006.2020220162300.h5", "r")
data_land_cover = f['MOD12C1']['Data Fields']['Majority_Land_Cover_Type_1']

external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

app = dash.Dash(__name__, external_stylesheets=external_stylesheets)

min_data = wildfire_data['acq_date'].min()
wildfire_data['acq_time'] = wildfire_data['acq_time'].astype('str').str.zfill(4)
wildfire_data['seconds'] = wildfire_data.apply(lambda x: (datetime.strptime(x['acq_date'], '%Y-%m-%d')-datetime.strptime(min_data, '%Y-%m-%d')).total_seconds()+(datetime.strptime(x['acq_time'], '%H%M')-datetime(1900, 1, 1)).total_seconds(), axis=1)
wildfire_data['seconds'] = wildfire_data['seconds']/(3600*24)
wildfire_data['bright'] = (wildfire_data['bright_ti4'] + wildfire_data['bright_ti5']) / 2
selected_data = wildfire_data[((wildfire_data['seconds'] >= 0.687400) & (wildfire_data['seconds'] <= 0.687600))]
selected_data = selected_data[(selected_data['latitude'] >= -9.507758) & (selected_data['latitude'] <= -7.324463) & \
                              (selected_data['longitude'] >= -41.447827) & (selected_data['longitude'] <= -34.867246)]

app.layout = html.Div(children=[
    html.H1(
        children='Firesafe - Painel de Monitoramento',
        style={
            'textAlign': 'center',
        }
    ),

    dcc.Graph(id='fig1',
              style={
                        'height': '80vh',
                    }),
    dcc.Dropdown(
        id='layer',
        options=[
            {'label': 'Active Fire', 'value': 'act_fire'},
            {'label': 'Relative Humidity', 'value': 'rel_hum'},
            {'label': 'Wind Speed', 'value': 'wind_speed'}
        ],
        searchable=False
    )
    ]
)

@app.callback(
    Output(component_id='fig1', component_property='figure'),
    [Input(component_id='layer', component_property='value')]
)
def plot_fig1(layer):
    if layer == 'rel_hum':
        fig = px.scatter_mapbox(climate_data, lat="lat", lon="lon", color="relative_humidity_2m:p",
                                color_continuous_scale=px.colors.sequential.Blues, size=[20] * climate_data.shape[0], zoom=5,
                                mapbox_style='open-street-map')
    elif layer == 'wind_speed':
        angle_wind = climate_data['wind_dir_10m:d'] - 90
        fig = go.Figure(go.Scattermapbox(
            mode = "markers",
            lon = climate_data['lon'], lat = climate_data['lat'],
            marker = {'size': 10, 'symbol': ["rocket" for i in range(climate_data.shape[0])],
                      'color': ['rgb(255, 0, 0)' for i in range(climate_data.shape[0])],
                      'angle': angle_wind}, text=['Velocidade: ' + str(value) + ' Km/h' for value in climate_data['wind_speed_10m:kmh'].values]))

        fig.update_layout(
            mapbox = {
                'accesstoken': mapbox_token,
                'style': "outdoors", 'zoom': 7, 'center': {'lat':-8.053061, 'lon':-35.893754}},
            showlegend = False)
    else:
        fire_grid = np.zeros((3600, 7200))
        for i in range(selected_data.shape[0]):
            lat, lon = selected_data.iloc[[i]]['latitude'].values[0], selected_data.iloc[[i]]['longitude'].values[0]
            row_index = int(round(((lat + 90) / 180) * grid_rows))
            column_index = int(round(((lon + 180) / 360) * grid_cols))
            fire_grid[row_index][column_index] = 1
            r = requests.get(f'https://api.meteomatics.com/2020-10-02T18ZPT2H:PT20M/relative_humidity_2m:p,wind_speed_10m:kmh,wind_dir_10m:d/{lat},{lon}/csv?model=mix',
                         auth=HTTPBasicAuth(mateomatics_user, password_user))
            TESTDATA = StringIO(r.text)
            df_temp = pd.read_csv(TESTDATA, sep=";")
            if 'wind_dir_10m:d' in df_temp.columns:
                wind_angle = df_temp['wind_dir_10m:d'].iloc[[0]].values[0]   
                if wind_angle >= 337.5 and wind_angle < 22.5:
                    fire_grid[row_index+1][column_index-1] = 2
                    fire_grid[row_index+1][column_index] = 2
                    fire_grid[row_index+1][column_index+1] = 2
                elif wind_angle >= 22.5 and wind_angle < 67.5:
                    fire_grid[row_index+1][column_index] = 2
                    fire_grid[row_index+1][column_index+1] = 2
                    fire_grid[row_index][column_index+1] = 2
                elif wind_angle >= 67.5 and wind_angle < 112.5:
                    fire_grid[row_index+1][column_index+1] = 2
                    fire_grid[row_index][column_index+1] = 2
                    fire_grid[row_index-1][column_index+1] = 2
                elif wind_angle >= 107.5 and wind_angle < 157.5:
                    fire_grid[row_index][column_index+1] = 2
                    fire_grid[row_index-1][column_index+1] = 2
                    fire_grid[row_index-1][column_index] = 2
                elif wind_angle >= 147.5 and wind_angle < 202.5:
                    fire_grid[row_index-1][column_index+1] = 2
                    fire_grid[row_index-1][column_index] = 2
                    fire_grid[row_index-1][column_index-1] = 2
                elif wind_angle >= 192.5 and wind_angle < 247.5:
                    fire_grid[row_index-1][column_index] = 2
                    fire_grid[row_index-1][column_index-1] = 2
                    fire_grid[row_index][column_index-1] = 2
                elif wind_angle >= 237.5 and wind_angle < 292.5:
                    fire_grid[row_index-1][column_index-1] = 2
                    fire_grid[row_index][column_index-1] = 2
                    fire_grid[row_index+1][column_index-1] = 2
                elif wind_angle >= 282.5 and wind_angle < 337.5:
                    fire_grid[row_index][column_index-1] = 2
                    fire_grid[row_index+1][column_index-1] = 2
                    fire_grid[row_index+1][column_index] = 2
        data = [go.Densitymapbox(lat=selected_data.latitude, lon=selected_data.longitude, z=selected_data.bright,
                                 radius=10)]
        #set the layout to plot
        layout = go.Layout(autosize=True,
                           mapbox = dict(center= dict(lat=-8.053061,
                                         lon=-35.893754),        
                                         accesstoken=mapbox_token,
                                         zoom=7,
                                         style='light',
                                       ),
                            title = 'Sweden')
        fig = go.Figure(data=data, layout=layout)
        fig.update_layout(mapbox_style='open-street-map')
        fig.update_layout(margin={"r":0,"t":0,"l":0,"b":0})
        mylayers =[]
        indexes = np.array(np.where(fire_grid != 0)).transpose()
        for i in indexes:
            lats, lons = convert_grid_into_coordinates_box(i[0], i[1])
            #print(lats, lons)
            if fire_grid[i[0]][i[1]] == 1:
                mylayers.append(get_polygon(lons=lons,
                                            lats=lats,  color="rgba(255,127,0,0.2)"))
            elif fire_grid[i[0]][i[1]] == 2:
                center_lat = (max(lats) + min(lats)) / 2
                center_lon = (max(lons) + min(lons)) / 2
                row_index_land = int(round((-(center_lat + 90) / 180) * 3600))
                column_index_land = int(round(((center_lon + 180) / 360) * 7200))
                if data_land_cover[row_index_land][column_index_land] == 13:
                    mylayers.append(get_polygon(lons=lons,
                                                lats=lats,  color="rgba(255,0,0,0.6)"))
                else:
                    mylayers.append(get_polygon(lons=lons,
                                                lats=lats,  color="rgba(255,0,0,0.2)"))
        fig.layout.update(mapbox_layers =mylayers);
    return fig

if __name__ == '__main__':
    app.run_server(debug=True)