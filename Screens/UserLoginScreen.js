import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Alert, AsyncStorage, StyleSheet, Dimensions } from 'react-native';
import { Card, CardItem, } from 'native-base'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { TextInput, Button } from 'react-native-paper';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { SocialIcon } from 'react-native-elements';

import { GoogleSignin } from '@react-native-community/google-signin';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import * as firebase from 'firebase'
import 'firebase/firestore'
import { login } from './AuthScreen'
var { width } = Dimensions.get("window")

console.disableYellowBox = true;

export default class UserLoginScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            id_facebook: null,
            picture: null,
            name: null,
            token: null,

            errem: '',
            errps: '',


            formEmptyDialog: false, formErrorDialog: false,
        }
        this.initialState = this.state
        this.validate = this.validate.bind(this)
        this.isFormEmpty = this.isFormEmpty.bind(this)
        this.isErrorFree = this.isErrorFree.bind(this)
    }

    validate(text, type) {
        if (type == 'email') {
            this.setState({ email: text })
            let msg = this.getMatch(/[A-Za-z]+([A-Za-z0-9]|[.]|[_])*[@][A-Za-z]+[.]com$/, text, "Email format example abc@abc.com")
            this.setState({ errem: msg })
        }
        else if (type == 'password') {
            this.setState({ password: text })
            let msg = this.getMatch(/^.{6,20}$/, text, "Password must be between 8 to 20 characters")
            this.setState({ errps: msg })
        }
    }

    isFormEmpty() {
        if (this.state.email != '' && this.state.password != '')
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

    SubmitForm = async () => {
        console.log('i am login', this.state)
        await AsyncStorage.setItem('Email', this.state.email)
        await login(this.state.email, this.state.password).then(async () => {
            console.log('Hello Home')
            //this.props.navigation.navigate('Map')
        })
    }

    //google signin


    componentDidMount = () => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '702463648312-hl16nfsu44dsmmbndubung5mqesahfoj.apps.googleusercontent.com',
            offlineAccess: true
        });
    }

    async googleLogin() {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfo = await GoogleSignin.signIn();
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            if (!firebaseUserCredential.user) {
                throw new Error('Something went wrong obtaining the users access token');
            }
            this.setState({ googleLogin: true })
        }
        catch (error) {
            console.log(error.message);
            this.setState({ googleLogin: false })
        }
        finally {
            if (this.state.googleLogin) {
                await getCurrentUid().then(async uid => {
                    await getUserFirestoreObj().then(async user => {
                        if (!user) {
                            await firebase.firestore().collection('Users').add({
                                'phoneNumber': '',
                                'userID': uid,
                                'type': 'Super User',
                                'account': 'google'
                            })
                        }
                        this.props.navigation.navigate('Main')
                    }).catch(error => {
                        this.setState({ loginMessage: error.message })
                        this.setState({ loginDialog: true })
                    })
                })
            }
            else {
                console.log('google login error');
                this.setState({ loginMessage: error.message })
                this.setState({ loginDialog: true })
            }
        }
    }


    //end google signin






    _AuthFB() {
        const dhis = this
        // Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    console.log(
                        "Login success with permissions: " +
                        result.grantedPermissions.toString()
                    );
                    dhis._setDataFB()
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }


    async _setDataFB() {
        // get token from facebook
        const tokenData = await AccessToken.getCurrentAccessToken().then(
            (data) => {
                return data.accessToken.toString()
            }
        )
        // get data about profile from api graph
        const datajson = await this.apiGraphFace(tokenData)

        if (datajson.success) {
            // variable para enviar post
            const data_fb = {
                id_facebook: datajson.data.id,
                email: datajson.data.email,
                name: datajson.data.name,
                picture: datajson.data.picture
            }
            this.setState(data_fb);
        }
    }


    async apiGraphFace(token) {

        const resface = await fetch('https://graph.facebook.com/v2.10/me?fields=id,name,email,picture.width(500)&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                const data = {
                    data: json,
                    success: true
                }
                return data;
            })
            .catch((error) => {
                const data = {
                    message: error,
                    success: false
                }
                return data;
            })

        return resface;
    }


    render() {
        return (
            <View style={Styles.container}>
                <View style={{
                    marginBottom: 30
                }}>
                    <Image style={{
                        height: responsiveHeight(20),
                        width: responsiveWidth(40),

                    }}

                        source={require('../Images/logo.jpg')}
                    />
                </View>

                <View style={Styles.email}>
                    <TextInput
                        label='Email'
                        value={this.state.email}
                        onChangeText={text => this.validate(text, "email")} />
                </View>
                <Text style={Styles.error}>
                    {this.state.errem}
                </Text>


                <View style={Styles.pass}>
                    <TextInput
                        label='Password'
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={text => this.validate(text, "password")} />
                </View>
                <Text style={Styles.error}>
                    {this.state.errps}
                </Text>



                <View style={Styles.btn}>
                    <Button icon={require('../Images/enter.png')} mode="outlined"
                        onPress={this.SubmitForm} >
                        login
                </Button>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text>Don't have account?</Text>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Signup')
                    }}>
                        <Text style={{ color: 'purple' }}>  Sign Up</Text>
                    </TouchableOpacity>
                </View>



                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


                    <View style={{ justifyContent: 'center' }}>
                        {/* <Image source={{ uri: this.state.picture.data.url }} style={{ width: 200, height: 200 }} /> */}
                        <View style={{ height: 20 }} />
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{this.state.name}</Text>
                        <Text style={{ fontSize: 20 }}>{this.state.email}</Text>
                        <View style={{ height: 20 }} />

                    </View>







                </View>

                <View style={{ flexDirection: 'row', }}>
                    <SocialIcon
                        onPress={() => this._AuthFB()}


                        type='facebook'
                    />
                    <SocialIcon
                        onPress={this.googleLogin}
                        type='google'
                    />

                </View>





            </View>

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
        backgroundColor: 'white',
        paddingBottom: 50,
    },

    email: {

        width: responsiveWidth(80),
        justifyContent: 'center',

    },
    pass: {
        width: responsiveWidth(80),
        justifyContent: 'center',
        paddingTop: 10,
    },
    btn: {
        justifyContent: 'center',
        width: responsiveWidth(50),
        paddingTop: 10,

    },
    error: {

        color: 'red',
        paddingTop: 5,
        alignSelf: 'center'
    },


})
