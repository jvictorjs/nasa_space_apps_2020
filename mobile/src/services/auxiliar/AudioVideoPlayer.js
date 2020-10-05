

import { Audio, Video } from 'expo-av';

export async function playSOM(stringFileNameNoExtension) {
    const soundObject = new Audio.Sound();
    console.log('vai tocar som...')
    var audios = {
        demo: require('../../../assets/sounds/demo.mp3'),
        pplay: require('../../../assets/sounds/pplay.mp3'),
        chicoamantes: require('../../../assets/sounds/chicoamantes.mp3')
    }

    try {
        await soundObject.loadAsync(audios[stringFileNameNoExtension]);
        await soundObject.playAsync();
        // Your sound is playing!

        // Don't forget to unload the sound from memory
        // when you are done using the Sound object
        // await soundObject.unloadAsync();
    } catch (error) {
        // An error occurred!
        console.log('erro no som = ' + error)
    }

}