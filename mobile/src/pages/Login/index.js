import React, { useState, useEffect } from 'react';
import { Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Input } from 'react-native-elements';


import logoImg from '../../../assets/logo_firesafe.png';

import styles from './styles';

import { Audio, Video } from 'expo-av';
import * as AudioVideoPlayerLib from '../../services/auxiliar/AudioVideoPlayer';

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://b.jvictor.com.br'
})

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [userPhone, setUserPhone] = useState('empty');
    const [bankrollManagementUnits, setBankrollManagementUnits] = useState([{qty_available:0},{qty_available:0},{qty_available:0}]);

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });

    }

    function navigateToInPlayEvents() {
        console.log('input = ' + userPhone)
        if (userPhone.length < 2) {
            Alert.alert(`Usuário inválido ⚠️`,'',
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: true });
        } else {
            // AudioVideoPlayerLib.playSOM('demo');
            navigation.navigate('Home', { userPhone , bankrollManagementUnits});
        }
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total) { // caso o total é igual ao carregado, nao precisa mais carregar nada novo
            return
        }

        setLoading(true);
        const response = await api.get('incidents', {
            params: { page }
        })

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);

        console.log(new Date().toString().substr(0, 33) + '----> LoadIncidents');
    }



    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Image source={logoImg} style={{transform: [{scaleX:0.9}, {scaleY:0.9}]}}/>
                
            </View>

            <Text style={styles.title}>{'\n\n'}Bem-vindo!{'\n'}</Text>
    <Text style={styles.description}>Ajude no combate aos incêndios florestais. {'\n\n\n'}Após inserir seu identificador de acesso, aperte o extintor.{'\n\n\n\n'}</Text>

           


            <Input
                placeholder='insira o identificador'
                leftIcon={<MaterialCommunityIcons name="lock" size={33} color="gray" />}
                onChangeText={value => setUserPhone(value)}
            />
            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

            <TouchableOpacity
                style={styles.detailsButton}
                onPress={navigateToInPlayEvents}
            >
                <Text style={styles.detailsButtonText}></Text>
                <FontAwesome name="fire-extinguisher" size={85} color="green" />
            </TouchableOpacity>

            </View>
            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVertitalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency', currency: 'BRL'
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}