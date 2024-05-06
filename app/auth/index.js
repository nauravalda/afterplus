import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CountryPicker } from 'react-native-country-codes-picker';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';




export default function Auth() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+62');
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const navigation = useNavigation();

    const signInWithPhoneNumber = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(formatPhoneNumber(phoneNumber, countryCode));
            setConfirm(confirmation);
        } catch (e) {
            console.error("Error sending code: ", e);
        }
    };

    const formatPhoneNumber = (phoneNumber, countryCode) => {
        if (phoneNumber[0] === '0') {
            phoneNumber = phoneNumber.slice(1);
        }
        return countryCode + phoneNumber;


    }
    const confirmCode = async () => {
        try {
            const userCredential = await confirm.confirm(code);
            const user = userCredential.user;
            // check if user exists in firestore
            const userDocument = await firestore().collection('users').doc(user.uid).get();
            if (userDocument.exists) {
                console.log('User exists');
                navigation.navigate('home');
                // navigate to home screen
            } else {
                console.log('User does not exist');
                // add new user to firestore
                await firestore().collection('users').doc(user.uid).set({
                    phoneNumber: user.phoneNumber,
                });
                navigation.navigate('onboarding');
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
                color="#201B13"
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
                <Text style={style.h1}>Masuk</Text>
                <Text style={style.text}>Masuk dengan nomor telepon Anda untuk mulai mengakses After+ dan dapatkan dukungan terbaik dalam menghadapi perubahan hidup</Text>
                <View style={style.form}>
                    <View style={style.input}>
                        <View style={style.countryPicker}>
                            <TouchableOpacity
                                onPress={() => setShow(true)}
                                style={{
                                    width: 80,
                                    height: 60,
                                    borderColor: '#817567',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',

                                }}
                            >
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 500,
                                    lineHeight: 24,
                                    letterSpacing: 0.1,
                                    alignSelf: 'center',
                                    borderColor: '#817567',
                                    borderRadius: 10,

                                }}>
                                    {countryCode}
                                </Text>
                            </TouchableOpacity>

                            <CountryPicker
                                show={show}
                                // when picker button press you will get the country object with dial code
                                pickerButtonOnPress={(item) => {
                                    setCountryCode(item.dial_code);
                                    setShow(false);
                                }}
                                showOnly={["ID", "US", "IN", "JP", "KR", "CN"]}
                            />
                        </View>
                        <TextInput
                            placeholder="Nomor Telepon"
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
                            color: '#FFF8F3',
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
        backgroundColor: "#FFF8F3",
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
        color: '#281800',
        fontFamily: 'Roboto',
        fontSize: 32,
        fontWeight: 800,
        lineHeight: 36, /* 62.5% */
        letterSpacing: 0.1,
        marginBottom: 10,
    },
    text: {
        color: '#281800',
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
        width: 240,
        height: 60,
        borderColor: '#817567',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        fontSize: 16,
    }, submitbtn: {
        backgroundColor: '#DBA140',
        borderRadius: 50,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    }, inputCode: {
        height: 60,
        borderColor: '#817567',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        letterSpacing: 10,
    }

};