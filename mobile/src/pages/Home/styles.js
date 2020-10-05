import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerText:{
        fontSize: 15,
        color: '#737380'
    },

    headerTextBold: {
        fontWeight: 'bold'
    },

    title: {
        fontSize: 21,
        marginBottom: 3,
        marginTop: 3,
        color: '#13131a',
        fontWeight: 'bold'
    },

    description: {
        fontSize: 15,
        lineHeight: 15,
        color: '#737380'
    },

    incidentList: {
        marginTop: 8,
    },

    incident: {
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#FFF',
        margin:5,
        elevation:5
    },

    incidentProperty: {
        fontSize: 18,
        color: '#41414d',
        fontWeight: 'bold',
    },

    incidentValue: {
        marginTop: 4,
        fontSize: 13,
        marginBottom: 2,
        color: '#737380'
    },

    detailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
    },

    detailsButtonText: {
        color: '#E02041',
        fontSize: 13,
        fontWeight: 'bold'
    }
});