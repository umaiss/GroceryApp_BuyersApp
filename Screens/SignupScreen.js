import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Image, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { Card, CardItem, } from 'native-base'
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

import * as firebase from 'firebase'
import 'firebase/firestore'

import { signup, emailVerification } from './AuthScreen'

console.disableYellowBox = true;

export default class SignUpScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            UserName: '', email: '',
            password: '', PhoneNumber: '',
            ShopName: '', ShopLocation: [],

            errUs: '', errem: '',
            errps: '', errpn: '',
            errsn: '',

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
            let msg = this.getMatch(/^.{6,20}$/, text, "Password must be between  to 20 characters")
            this.setState({ errps: msg })
        }
        else if (type == 'PhoneNumber') {
            this.setState({ PhoneNumber: text })
            let msg = this.getMatch(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/, text, "Phone Number Incorrect")
            this.setState({ errpn: msg })
        }
        else if (type == 'ShopName') {
            this.setState({ ShopName: text })
        }
    }

    isFormEmpty() {
        if (this.state.UserName != '' && this.state.email != '' && this.state.password != '' && this.state.PhoneNumber != '' && this.state.ShopName != '')
            return false
        this.setState({ formEmptyDialog: true })
        return true
    }

    isErrorFree() {
        if (this.state.errUs == '' && this.state.errem == '' && this.state.errps == '' && this.state.errpn == '' && this.state.errsn == '')
            return true
        this.setState({ formErrorDialog: true })
        return false
    }

    getMatch(regex, text, errMsg) {
        let msg = ''
        if (regex.test(text))
            msg = ""
        else
            msg = errMsg
        return msg
    }

    /* goToLogin = async () => {
         console.log('hello i am pressed')
         let obj = { 'name': 'name' }
         await firebase.firestore().collection('Users').doc().set(obj).then(() => console.log('hello world')).catch((error) => console.log('hello2\n:::::', error));
     }*/

    goToLogin = async () => {
        if (!this.isFormEmpty() && this.isErrorFree()) {
            this.setState({ btnDisabled: true })
            this.setState({ btnIndicator: true })

            await signup(this.state.email, this.state.password).then(async () => {
                var user = firebase.auth().currentUser;
                if (user) {
                    var userObj = {
                        UserName: this.state.UserName,
                        email: this.state.email,
                        password: this.state.password,
                        phonenumber: this.state.PhoneNumber,
                        Shopname: this.state.ShopName,
                        type: 'Super User',
                        userID: user.uid,
                    }
                } else
                    throw new Exception()
                console.log('heloo')
                await firebase.firestore().collection('Users').doc().set(userObj).then(() => console.log('hello world')).catch((error) => console.log(error));
                // emailVerification()
                this.setState(this.initialState)
                this.props.navigation.navigate('Login')
            }).catch((error) => {
                Alert.alert(error.message)
                this.setState({ signupError: error.message })
                this.setState({ signupErrorDialog: true })
            }
            ).finally(() => {
                this.setState({ btnDisabled: false })
                this.setState({ btnIndicator: false })
            })
        }
    }

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

                    <View style={Styles.InputImage}>
                        <Image
                            source={require('../Images/lock.png')}
                            style={Styles.ImageStyle}
                        />
                        <TextInput
                            style={Styles.inputField}
                            placeholder='Phone Number'
                            keyboardType='number-pad'
                            underlineColorAndroid="transparent"
                            onChangeText={text => this.validate(text, "PhoneNumber")}
                            value={this.state.PhoneNumber}
                        />
                    </View>
                    <Text style={Styles.error}>{
                        this.state.errpn}
                    </Text>

                    <View style={Styles.InputImage}>
                        <Image
                            source={require('../Images/lock.png')}
                            style={Styles.ImageStyle}
                        />
                        <TextInput
                            style={Styles.inputField}
                            placeholder='Shop Name'
                            underlineColorAndroid="transparent"
                            onChangeText={text => this.validate(text, "ShopName")}
                            value={this.state.ShopName}
                        />
                    </View>
                    <Text style={Styles.error}>{
                        this.state.errsn}
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
                        style={{ color: '#4c516d', marginVertical: responsiveHeight(4), fontSize: responsiveFontSize(1.8) }}>
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
