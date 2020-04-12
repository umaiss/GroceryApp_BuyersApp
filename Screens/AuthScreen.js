import React, { Component } from 'react';
import {
    View,
    StatusBar,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import firestore from 'firebase/firestore'
import firebase from 'firebase'

console.disableYellowBox = true;

export async function signup(email, password) {
    await firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        console.log("User created successfully")
    }).catch((error) => {
        throw error
    })
}

export async function logout() {
    firebase.auth().signOut().then(function () {
        console.log('Logout Successful')
    }).catch(function (error) {
        console.log('Logout Unsuccessful')
    });
}

export async function login(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        return true
        console.log("Login Successful")
    }).catch(error => {
        console.log('i am here ', error)
        throw error;
    })
}

export async function resetPassword(email) {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        console.log("Email has been sent to you")
    }).catch((error) => {
        throw error
    })
}

export async function emailVerification() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        console.log('Email verified = ', user.emailVerified)
    }).catch(error => {
        console.log(error.message)
    });
}

export async function isUserVerified() {
    var user = firebase.auth().currentUser;
    console.log(user.emailVerified)
    if (user) {
        return user.emailVerified
    } else {
        return false
    }
}

export async function UpdateLocation(Lat, Long) {
    var user = firebase.auth().currentUser;
    let uid
    uid = user.uid

    console.log(uid, Lat, Long)
    if (user != null) {
        await firebase.firestore().collection('Users').where('userID', '==', uid).get().then(async snapshot => {
            snapshot.docs.forEach(doc => {
                if (doc.data().userID == uid) {
                    let u = doc.data()
                    u.Latitude = Lat
                    u.Longitude = Long
                    this.setState({ userObj: [doc.id, u] });

                }
            })
            await firebase.firestore().collection('Users').doc(this.state.userObj[0]).set(this.state.userObj[1])
        }).catch(error => { console.log(error) })

        console.log('hello its me', this.state.userObj)

    } else {
        return false
    }

}

