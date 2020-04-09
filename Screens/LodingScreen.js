import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Platform,
    Alert,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { Container, Card, CardItem, } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'

export default class LodingScreen extends Component {
    render() {
        return (
            <Container style={Styles.container}>
                <StatusBar backgroundColor="#C5E0C3" barStyle="light-content" />
                <LinearGradient colors={['#E8F8C2', '#C5E0C3', '#A5CBC3']} style={Styles.BackGround}>
                    <View style={Styles.SlognView}>
                            <Text style={Styles.Slogan1}>Be unique.</Text>
                            <Text style={Styles.Slogan2}>Be healthy.</Text>
                            <Text style={Styles.Slogan3}>Be happy.</Text>
                    </View>
                    <Image style={Styles.ImageStyle} source={require('../Images/scooter.png')} />

                    <TouchableOpacity style={Styles.BtnLogin}>
                        <Text style={Styles.BtnText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.BtnSignUp}>
                        <Text style={Styles.BtnText}>SignUp</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Container>
        )
    }
}


const Styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        height: responsiveHeight(1),
        width: responsiveWidth(100),
    },
    BackGround: {
        height: responsiveHeight(100),
        width: responsiveWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    ImageStyle: {
        width: responsiveWidth(80),
        height: responsiveHeight(35),
        elevation: 10,
        bottom: 10
    },
    BtnLogin: {
        width: responsiveWidth(80),
        height: responsiveHeight(7),
        elevation: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        justifyContent: 'center',
        top: 70
    },
    BtnText: {
        textAlign: 'center',
        fontSize: responsiveFontSize(2.4),
        fontWeight: 'bold',
    },
    BtnSignUp: {
        width: responsiveWidth(80),
        height: responsiveHeight(7),
        elevation: 10,
        backgroundColor: '#A5CBC3',
        borderRadius: 10,
        justifyContent: 'center',
        top: 90
    },
    SlognView: {
        bottom:60,
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Slogan1: {
        fontSize: responsiveFontSize(2.7),
        fontWeight: 'bold',
        flex:1,
        marginLeft:40,
        marginRight:-15,
        color:'#FFFFFF'
    },
    Slogan2: {
        fontSize: responsiveFontSize(2.7),
        fontWeight: 'bold',
        flex:1,
        marginLeft:5,
        color:'#A5CBC3'
    },
    Slogan3: {
        fontSize: responsiveFontSize(2.7),
        fontWeight: 'bold',
        flex:1,
        marginLeft:-8,
        color:'#FFFFFF'
    },
    
})