import { View, Text, TextInput, TouchableOpacity, Pressable, Image } from 'react-native';
import React, { useState, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/colors';




export default function Landing() {

    const navigation = useNavigation();
    



    return (


        <View style={style.container}>

            
            <Text style={style.h1}>Halo, selamat datang di After+ :D</Text>
            <Text style={style.text}>Apakah kamu pernah menggunakan aplikasi ini sebelumnya?</Text>

            <View style={style.option}>
                <Pressable style={style.optionbtn} onPress={() => navigation.navigate('auth')}>

                    <Image source={require('./../../assets/welcome-1.png')} style={{ width: 100, height: 100, marginBottom: 30, marginTop: 30, backgroundColor: 'white', borderRadius: 40 }} />

                    <View style={{backgroundColor: colors.primarycontainer, width: '100%', borderBottomEndRadius: 20, borderBottomStartRadius: 20}}>
                    <Text style={style.h2}>Sudah pernah!</Text>
                    <Text style={style.optiontext}>Langsung login dan pake aplikasinya!</Text>
                    </View>
                </Pressable>
                <Pressable style={style.optionbtn} onPress={() => navigation.navigate('tour')}>
                    <Image source={require('./../../assets/welcome-2.png')} style={{ width: 100, height: 100, marginBottom: 30, marginTop: 30, backgroundColor: 'white', borderRadius: 40 }} />
                    <View style={{backgroundColor: colors.primarycontainer, width: '100%', borderBottomEndRadius: 20, borderBottomStartRadius: 20}}>
                    <Text style={style.h2}>Belum nih!</Text>
                    <Text style={style.optiontext}>Yuk ikuti tur singkat tentang aplikasi ini</Text>
                    </View>
                </Pressable>
            </View>
            <View style={{height: 100}}></View>



        </View>
    );
}

const style = {
    container: {
        flex: 1,
        backgroundColor: colors.surfacecontainer,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },

    
    h1: {
        color: colors.onsurface,
        fontFamily: 'Roboto',
        fontSize: 24,
        fontWeight: 800,
        lineHeight: 36, /* 62.5% */
        letterSpacing: 0.1,
        marginBottom: 10,
        alignSelf: 'center',
        textAlign: 'center',
        width: '60%'
    },h2:{
        color: colors.onsurface,
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 24, /* 150% */
        letterSpacing: 0.4,
        marginBottom: 4,
        textAlign: 'center',
        marginTop: 16,

    },
    text: {
        color: colors.onsurface,
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 24, /* 150% */
        letterSpacing: 0.4,
        marginBottom: 32,
        textAlign: 'center',
        width: '70%'
    }, option:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 32,
    }, optionbtn: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        margin: 8,
        width: 160,
        justifyContent: 'center',
        alignItems: 'center',
    }, optiontext: {
        color: colors.onsurface,
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: 0.4,
        textAlign: 'center',
        marginBottom: 16,
        width: '80%',
        alignSelf: 'center'
    }

};