import React, { useState, useEffect } from 'react';
import { Feather, MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import {
    View, FlatList, Image, Text, TouchableOpacity,
    ActivityIndicator, Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as AudioVideoPlayerLib from '../../services/auxiliar/AudioVideoPlayer';
import { Tooltip } from 'react-native-elements';
import { Audio, Video } from 'expo-av';
import axios from 'axios';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';

import styles from './styles';

import logoImg from '../../../assets/logo_firesafe.png';
import focosImg from '../../../assets/focos.png';

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute();

    const [userPhone, setUserPhone] = useState(route.params?.bftk);
    const [loading, setLoading] = useState(false);
    const [risk, setRisk] = useState('indefinido');

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    function navigationBack() {
        navigation.goBack();
    }


    async function getRisk() {
        console.log('getRisk() --- START')
        setLoading(true)
        var deuErroNaAPI = false;
        var erroNaResposta = ''
        var url = "https://api.thefiresafe.co/risk"
        console.log('risk URL = ' + url)

        const response = await axios.post(url).catch(error => {
            console.log('API Error ')
            deuErroNaAPI = true
            erroNaResposta = error.toString();
            console.log(error)
        });
        console.log('response.data = ' + JSON.stringify(response.data))

        if (!deuErroNaAPI) {
            if (response.data) { // se retornou o array, é porque tenho acesso válido à API, sem acesso = erro aqui
                console.log(response.data)
                setRisk(response.data.risk)
            }
        }
        console.log('getRisk() --- END')
        setLoading(false)
    }

    async function getLocation() {
        console.log('getLocation() --- START ' + new Date().toISOString())
        // location request, access the GPS of Phone
        setLoading(true)
        text = 'Waiting...';
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(JSON.stringify('location = ' + JSON.stringify(location)))
        setLocation(location);
        console.log('getLocation() --- END')
        setLoading(false)
    }


    useEffect(() => {
        console.log('✅ ' + new Date() + ' START--->  useEffect(() => {}');
        setLoading(true)
        getRisk();
        if (route.params?.userPhone) {
            console.log(route.params?.userPhone);
            setUserPhone(route.params.userPhone);
        }

        (async () => { // location request, access the GPS of Phone
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(JSON.stringify('location = ' + JSON.stringify(location)))
            setLocation(location);
        })();

        console.log('END--->  useEffect(() => {}');
        setLoading(false)
    }, [route.params?.userPhone]);


    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location, null, 2);
    }




    return (


        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} style={{ transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }] }} />

                <TouchableOpacity onPress={() => {
                    getRisk()
                    getLocation()
                }}>
                    <MaterialCommunityIcons name="refresh" size={20} color="#737380" />
                </TouchableOpacity>
                <Tooltip containerStyle={{
                    flex: 0.5, height: 300, width: 200, flexDirection: "column",
                    flexGrow: 1,
                    flex: 1,
                }} backgroundColor={'#FFF'} overlayColor={'rgba(222, 222, 222, 0.65)'} popover={
                    <View style={{ flex: 1, flexShrink: 1 }}>
                        <Text style={styles.description}>location ={'\n' + text}</Text>
                    </View>
                }>


                    <View style={{ flexDirection: 'row' }}>
                        <AntDesign name="question" size={20} color="#737380" />
                        {loading ?
                            <ActivityIndicator size="large" color="green" />
                            :
                            <Text style={styles.headerText}>
                                <Text style={styles.headerTextBold}>
                                    Ajuda</Text>
                            </Text>
                        }
                    </View>
                </Tooltip>

                <TouchableOpacity onPress={navigationBack}>
                    <Feather name="arrow-left" size={33} color="green" />
                </TouchableOpacity>
            </View>

            <Tooltip containerStyle={{
                flex: 0.5, height: 300, width: 200, flexDirection: "column",
                flexGrow: 1,
                flex: 1,
            }} backgroundColor={'#FFF'} overlayColor={'rgba(222, 222, 222, 0.65)'} popover={
                <View style={{ flex: 1, flexShrink: 1 }}>
                    <Text style={styles.description}>location ={'\n' + text}</Text>
                </View>
            }>


                <View style={{ flexDirection: 'column', borderWidth: 0 }}>
                    <Text style={styles.title}>Bem-vindo, Firesafer {userPhone}.{'\n'}</Text>
                    <Text style={styles.description}>Na sua localização atual, seu grau de risco a incêndio é = {risk+'\n'}</Text>
                </View>
            </Tooltip>

            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 10 }}>


                <Image source={focosImg} style={{ alignSelf: 'center', marginBottom: 10, transform: [{ scaleX: 1 }, { scaleY: 1 }] }} />

                <Text style={[styles.description,{textAlignVertical:'center'}]}>{'\n\n'}</Text>
                <View style={{ flexDirection: "row" }}>

                    <Text style={[styles.description,{textAlignVertical:'center'}]}>Reportar</Text>
                    <TouchableOpacity style={styles.actionZAP} onPress={getLocation}>
                        <MaterialCommunityIcons name="whatsapp" size={33} color="green" />
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}