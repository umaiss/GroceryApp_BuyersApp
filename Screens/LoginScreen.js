import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TextInput, TouchableOpacity, Alert, AsyncStorage, StyleSheet } from 'react-native';
import { Card, CardItem, } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import * as firebase from 'firebase'
import 'firebase/firestore'
import { login } from './AuthScreen'

console.disableYellowBox = true;

export default class LoginScreen extends Component {

    constructor(props) {
        super(props),
            this.state = {
                email: '',
                password: '',
            }
        this.initialState = this.state
    }

    SubmitForm = async () => {
        console.log('i am login', this.state)
        await AsyncStorage.setItem('Email', this.state.email)
        await login(this.state.email, this.state.password).then(async () => {
            console.log('Hello Home')
            //this.props.navigation.navigate('Map')
        })
    }

    render() {
        return (
            <SafeAreaView style={Styles.container}>
                <StatusBar backgroundColor="#29a9d2" barStyle="light-content" />
                <Card style={Styles.LoginContainer}>
                    <View style={Styles.SlognView}>
                        <Text style={Styles.Slogan1}>Be unique.</Text>
                        <Text style={Styles.Slogan2}>Be healthy.</Text>
                        <Text style={Styles.Slogan3}>Be happy.</Text>
                    </View>
                    <View style={Styles.InputImage}>
                        <Image
                            source={require('../Images/user.png')}
                            style={Styles.ImageStyle}
                        />
                        <TextInput
                            style={Styles.inputField}
                            placeholder='Enter Email'
                            underlineColorAndroid="transparent"
                            onChangeText={Email => this.setState({ "email": Email })}
                            value={this.state.email}
                        />
                    </View>
                    <View style={Styles.InputImage}>
                        <Image
                            source={require('../Images/lock.png')}
                            style={Styles.ImageStyle}
                        />
                        <TextInput
                            style={Styles.inputField}
                            placeholder='Enter Password'
                            keyboardType='default'
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            onChangeText={Password => this.setState({ "password": Password })}
                            value={this.state.password}
                        />
                    </View>
                    <TouchableOpacity style={Styles.Btns} onPress={this.SubmitForm}>
                        <Text style={Styles.BtnText}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.ForgetBtns}>
                        <Text style={Styles.TextStyle}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <Text style={Styles.LineSplit}> ────────────  or  ──────────── </Text>
                    <TouchableOpacity
                        style={Styles.CreateBtn}
                        onPress={() => {
                            this.setState(this.initialState);
                            this.props.navigation.navigate('Signup')
                        }}>
                        <Text style={Styles.TextStyle}>Create Account</Text>
                    </TouchableOpacity>
                </Card>
            </SafeAreaView>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        height: responsiveHeight(1),
        width: responsiveWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#60c7d9',
    },
    HearderText: {
        justifyContent: 'flex-start',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        width: 150,
        marginBottom: 60
    },
    LoginContainer: {
        height: responsiveHeight(50),
        width: responsiveWidth(80),
        borderRadius: 15,
        elevation: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputField: {
        height: responsiveHeight(12),
        width: responsiveWidth(60),
        fontSize: 15,
        marginLeft: 5,
        backgroundColor: 'rgba(230,230,230,0.0)',
    },
    InputImage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.2,
        borderColor: '#000',
        height: 40,
        borderRadius: 5,
        margin: 10,
        top:40
    },
    ImageStyle: {
        height: 25,
        width: 25,
        margin: 5,
        justifyContent: 'center',
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    Btns: {
        height: responsiveHeight(6),
        width: responsiveWidth(60),
        borderRadius: 15,
        backgroundColor: 'gray',
        justifyContent: 'center',
        backgroundColor: '#60c7d9',
        top:60
    },
    BtnText: {
        textAlign: 'center',
        fontSize: responsiveFontSize(2.4),
        color: 'white',
        fontWeight: 'bold',
    },
    ForgetBtns: {
        height: responsiveHeight(6),
        width: responsiveWidth(60),
        borderRadius: 15,
        justifyContent: 'center',
        top:60
    },
    LineSplit: {
        marginTop: 45,
        opacity: 0.1,
        fontSize: 15,
    },
    CreateBtn: {
        marginTop: 15,
        height: responsiveHeight(6),
        width: responsiveWidth(60),
        borderWidth: 1,
        borderColor:'#60c7d9',
        justifyContent: 'center',
    },
    SlognView: {
        flexDirection: 'row',
        textAlign:'center',
        justifyContent:'center',
        textAlign:'center'
    },
    Slogan1: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color:'#60c7d9',
        flex:1,
        marginLeft:30,
        marginRight:-15
    },
    Slogan2: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        flex:1,
        color:'#A5CBC3',
        marginRight:-15
    },
    Slogan3: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        flex:1,
        color:'#60c7d9'
    },
    TextStyle: {
        fontSize: responsiveFontSize(1.8),
        textAlign:'center',
        color:'#60c7d9',
        fontWeight:'bold'
    }
})
