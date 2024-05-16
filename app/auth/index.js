import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CountryPicker } from 'react-native-country-codes-picker';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { createContext } from 'react';
import { colors } from './../../constants/colors';
import { supabase } from './../../lib/supabase';
import { makeRedirectUri } from 'expo-auth-session'

const redirectTo = makeRedirectUri()

const { error } = await supabase.auth.signInWithOtp({
  email: 'example@email.com',
  options: {
    emailRedirectTo: redirectTo,
  },
})



export default function Auth() {
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+62');
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const navigation = useNavigation();
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    

    const signInWithEmail = async () => {
        try {

        }
    };

    const confirmCode = async () => {
        try {
            const userCredential = await confirm.confirm(code);
            const user = userCredential.user;
            // check if user exists in firestore
            const userDocument = await firestore().collection('users').doc(user.uid).get();
            if (userDocument.exists) {
                // check if user has completed identity
                if (userDocument.data().name && userDocument.data().birthdate) {
                    console.log('User exists');
                    setIsLogged(true);
                    setUser(userDocument.data());

                    navigation.navigate('activities', { user: userDocument.data() });}
                else {
                    console.log('User exists but not completed identity');
                    setIsLogged(true);
                    setUser(userDocument.data());
                    navigation.navigate('onboarding', { id: user.uid });
                }
                // navigate to home screen
            } else {
                console.log('User does not exist');
                // add new user to firestore
                await firestore().collection('users').doc(user.uid).set({
                    phoneNumber: user.phoneNumber,
                });
                setIsLogged(true);
                navigation.navigate('onboarding', { id: user.uid});
                // navigate to onboarding screen

            }
        } catch (e) {
            console.error(e);
        }
    }

    const backToPhoneInput = () => {
        setConfirm(null);
    }


    return (


        <View style={style.container}>

            <Icon
                color={colors.primary}
                containerStyle={{}}
                disabledStyle={{}}
                iconProps={{}}
                iconStyle={{}}
                name="west"
                size={24}
                type="material"
                style={{ alignSelf: 'flex-start' }}
                onPress={backToPhoneInput}
            />
            {!confirm ?
            (<View style={style.content}>
                <Text style={style.h1}>Masukkan Emailmu</Text>
                <Text style={style.text}>Masukkan emailmu! Kami akan kirimkan kode verifikasi untuk melanjutkan.</Text>
                <View style={style.form}>
                    <View style={style.input}>
                        
                           
                        <TextInput
                            placeholder="Email"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            style={style.inputBox}
                            keyboardType="numeric"
                        />
                    </View>
                    <Pressable 
                        style={style.submitbtn}
                        onPress={signInWithPhoneNumber}
                    >
                        <Text style={{
                            color: colors.background,
                            fontSize: 14,
                            fontWeight: 500,
                            letterSpacing: 0.1,
                        }}>Masuk atau Daftar</Text>
                    </Pressable>

                </View>

            </View>)
            
            :

            (
                
                <View style={style.content}>
                    <Text style={style.h1}>Verifikasi</Text>
                    <Text style={style.text}>Kami telah mengirimkan kode verifikasi ke nomor +62-852-6323-XXXX. Masukan kode untuk melanjutkan</Text>
                    
                        <TextInput
                            style={style.inputCode}
                            keyboardType="numeric"
                            placeholder='XXXXXX'
                            maxLength={6}
                            onChangeText={setCode}    
                        />
                    
                    <Pressable 
                        style={style.submitbtn}
                        onPress={confirmCode}
                    >
                        <Text style={{
                            color: '#FFF8F3',
                            fontSize: 14,
                            fontWeight: 500,
                            letterSpacing: 0.1,
                        }}>Verifikasi</Text>
                    </Pressable>
                </View>)
            
        }
        </View>
    );
}

const style = {
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 24,
    },
    content: {
        flex: 1,
        margin: 16,
        marginTop: 32,

    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    h1: {
        color: colors.onsurface,
        fontFamily: 'Roboto',
        fontSize: 22,
        fontWeight: 800,
        lineHeight: 36, /* 62.5% */
        letterSpacing: 0.1,
        marginBottom: 10,
    },
    text: {
        color: colors.onsurface,
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 24, /* 150% */
        letterSpacing: 0.4,
        marginBottom: 32,
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',

    }, inputBox: {
        width: '100%',
        height: 60,
        borderColor: colors.outline,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        fontSize: 16,
    }, submitbtn: {
        backgroundColor: colors.primary,
        borderRadius: 50,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    }

};