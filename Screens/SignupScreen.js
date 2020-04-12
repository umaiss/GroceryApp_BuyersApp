import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TextInput, TouchableOpacity, Alert, AsyncStorage, StyleSheet } from 'react-native';
import { Card, CardItem, } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";


import { signup, emailVerification } from './AuthScreen'

import * as firebase from 'firebase'
import 'firebase/firestore'

export default class SignUpScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            UserName: '', email: '',
            password: '', confirmPassword: '',

            errUs: '', errem: '',
            errps: '', errcps: '',

            formEmptyDialog: false, formErrorDialog: false, btnIndicator: false,
            btnDisabled: false, signupErrorDialog: false, signupError: '',
        }
        this.initialState = this.state
        this.validate = this.validate.bind(this)
        this.goToLogin = this.goToLogin.bind(this)
        this.isFormEmpty = this.isFormEmpty.bind(this)
        this.isErrorFree = this.isErrorFree.bind(this)
    }
    validate(text, type) {
        if (type == 'UserName') {
            this.setState({ UserName: text })
            let msg = this.getMatch(/^[a-zA-Z]+(([\'\,\.\-][a-zA-Z])?[a-zA-Z])$/, text, "Username only contains alphabets")
            this.setState({ errfn: msg })
        }
        else if (type == 'email') {
            this.setState({ email: text })
            let msg = this.getMatch(/[A-Za-z]+([A-Za-z0-9]|[.]|[_])*[@][A-Za-z]+[.]com$/, text, "Email format example abc@abc.com")
            this.setState({ errem: msg })
        }
        else if (type == 'password') {
            this.setState({ password: text })
            let msg = this.getMatch(/^.{8,20}$/, text, "Password must be between 8 to 20 characters")
            this.setState({ errps: msg })
        }
        else if (type == 'confirmPassword') {
            this.setState({ confirmPassword: text })
            if (this.state.password != text)
                this.setState({ errcps: "Does not match password" })
            else
                this.setState({ errcps: "" })
        }
    }

    getMatch(regex, text, errMsg) {
        let msg = ''
        if (regex.test(text))
            msg = ""
        else
            msg = errMsg
        return msg
    }

    isFormEmpty() {
        if (this.state.UserName != '' && this.state.email != '' && this.state.password != '' && this.state.confirmPassword != '')
            return false
        this.setState({ formEmptyDialog: true })
        return true
    }

    isErrorFree() {
        if (this.state.errUs == '' && this.state.errem == '' && this.state.errps == '' && this.state.errcps == '')
            return true
        this.setState({ formErrorDialog: true })
        return false
    }

   goToLogin = async () => {
        console.log('hello i am here')
        let obj = { 'name': 'name' }
        await firebase.firestore().collection('Users').doc().set(obj).then(() => console.log('hello world')).catch((error) => console.log('hello2\n:::::', error));
    }

    /* goToLogin = async () => {
         console.log('Hello')
         if (!this.isFormEmpty() && this.isErrorFree()) {
             this.setState({ btnDisabled: true })
             this.setState({ btnIndicator: true })
 
             console.log('Hello2')
             await signup(this.state.email, this.state.password).then(async () => {
                 var user = firebase.auth().currentUser;
 
                 console.log('Hello3')
                 if (user) {
 
                     console.log('hello3')
                     var userObj = {
                         UserName: this.state.UserName,
                         email: this.state.email,
                         password: this.state.password,
                         type: 'Super User',
                         userID: user.uid,
                     }
                 } else
                     throw new Exception()
                 firebase.firestore().collection('Users').doc().set(userObj).then(() => console.log('hello world')).catch((error) => console.log(error));
                 emailVerification()
                 this.setState(this.initialState)
                 this.props.navigation.navigate('Login')
             }).catch((error) => {
                 this.setState({ signupError: error.message })
                 this.setState({ signupErrorDialog: true })
             }
             ).finally(() => {
                 this.setState({ btnDisabled: false })
                 this.setState({ btnIndicator: false })
             })
         }
     }*/

    render() {
        let btnDisplay;
        if (this.state.btnIndicator)
            btnDisplay = <ActivityIndicator size={responsiveHeight(4)} color={'white'} />
        else
            btnDisplay = <Text style={Styles.btnTxt}>SIGN UP</Text>

        return (
            <SafeAreaView style={Styles.container}>

                    <Card style={Styles.LoginContainer}>
                        <Text style={Styles.HearderText}>Create Account</Text>

                        <View style={Styles.InputImage}>
                            <Image
                                source={require('../Images/user.png')}
                                style={Styles.ImageStyle}
                            />
                            <TextInput
                                style={Styles.inputField}
                                placeholder='Enter UserName'
                                underlineColorAndroid="transparent"
                                onChangeText={text => this.validate(text, "UserName")}
                                value={this.state.UserName}
                            />
                        </View>
                        <Text style={Styles.error}>
                            {this.state.errfn}
                        </Text>

                        <View style={Styles.InputImage}>
                            <Image
                                source={require('../Images/lock.png')}
                                style={Styles.ImageStyle}
                            />
                            <TextInput
                                style={Styles.inputField}
                                placeholder='Password'
                                keyboardType='default'
                                underlineColorAndroid="transparent"
                                secureTextEntry={true}
                                onChangeText={text => this.validate(text, "password")}
                                value={this.state.password}
                            />
                        </View>
                        <Text style={Styles.error}>
                            {this.state.errps}
                        </Text>

                        <View style={Styles.InputImage}>
                            <Image
                                source={require('../Images/lock.png')}
                                style={Styles.ImageStyle}
                            />
                            <TextInput
                                style={Styles.inputField}
                                placeholder='Confirm Password'
                                keyboardType='default'
                                underlineColorAndroid="transparent"
                                secureTextEntry={true}
                                onChangeText={text => this.validate(text, "confirmPassword")}
                                value={this.state.confirmPassword}
                            />
                        </View>
                        <Text style={Styles.error}>{
                            this.state.errcps}
                        </Text>

                        <View style={Styles.InputImage}>
                            <Image
                                source={require('../Images/mail.png')}
                                style={Styles.ImageStyle}
                            />
                            <TextInput
                                style={Styles.inputField}
                                placeholder='Email Address'
                                keyboardType='email-address'
                                underlineColorAndroid="transparent"
                                onChangeText={text => this.validate(text, "email")}
                                value={this.state.email}
                            />
                        </View>
                        <Text style={Styles.error}>
                            {this.state.errem}
                        </Text>

                        <TouchableOpacity
                            style={Styles.SignUpBtns}
                            onPress={this.goToLogin}
                            disabled={this.state.btnDisabled}
                        >
                            <Text style={Styles.BtnText}>Log In</Text>
                        </TouchableOpacity>
                        <Text onPress={() => {
                            this.setState(this.initialState);
                            this.props.navigation.navigate('Login')
                        }}
                            style={{ color: '#4c516d', marginVertical: responsiveHeight(4) }}>
                            Already have an account?
                        <Text style={{ color: '#008080' }}>Login</Text>
                        </Text>
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
        textAlign: 'center',
        fontSize: responsiveFontSize(2.8),
        fontWeight: 'bold',
        width: 200,
        marginBottom: 60,
        color: 'white'
    },
    LoginContainer: {
        height: responsiveHeight(55),
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
        top: 15,
        margin: 4
    },
    ImageStyle: {
        height: 25,
        width: 25,
        margin: 5,
        justifyContent: 'center',
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    BtnText: {
        textAlign: 'center',
        fontSize: responsiveFontSize(2.4),
        color: 'white',
        fontWeight: 'bold',
    },
    SignUpBtns: {
        height: responsiveHeight(6),
        width: responsiveWidth(60),
        borderRadius: 15,
        backgroundColor: 'gray',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#60c7d9',
        marginTop: 15
    },
    txtLbl: {
        color: '#4c516d',
        fontSize: responsiveFontSize(1.9)
    },
    error: {
        marginTop: responsiveHeight(0.5),
        color: 'red'
    },
})
