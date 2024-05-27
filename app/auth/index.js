import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useContext } from 'react';
import { supabase } from '../../lib/supabase';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { colors } from './../../constants/colors';
import { useRef } from 'react';




export default function Auth() {
    const [email, setEmail] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isCodeFilled, setIsCodeFilled] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const ref_1 = useRef();
    const ref_2 = useRef();
    const ref_3 = useRef();
    const ref_4 = useRef();
    const ref_5 = useRef();
    const ref_6 = useRef();
    

    const signInWithEmail = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.signInWithOtp({
                email: email,
            })
            if (error) {
                console.error(error);
            } else {
                setConfirm(true);
            }
            setLoading(false);
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };

    const confirmCode = async () => {
        try {
            setLoading(true);
            const {
                data: {session},
                error
            } = await supabase.auth.verifyOtp({
                email: email,
                token: code.join(''),
                type: 'email',
            });
            console.log(code.join(''));
            if (error) {
                console.error(error);
                setLoading(false);
            } else {
                console.log(session);
                navigation.navigate('options');
            }

        } catch (e) {
            console.error(e);
        }
    }

    const backToEmailInput = () => {
        setConfirm(null);
    }

    const setCodeByIndex = (index, value) => {
        let newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        // Check if all code input is filled with instance of number from 0-9 using regex
        setIsCodeFilled(newCode.join('').match(/^[0-9]{6}$/) !== null);


        if (value !== '') {
            switch (index) {
                case 0:
                    ref_2.current.focus();
                    break;
                case 1:
                    ref_3.current.focus();
                    break;
                case 2:
                    ref_4.current.focus();
                    break;
                case 3:
                    ref_5.current.focus();
                    break;
                case 4:
                    ref_6.current.focus();
                    break;
                default:
                    break;
            }
        } else {
            switch (index) {
                case 1:
                    ref_1.current.focus();
                    break;
                case 2:
                    ref_2.current.focus();
                    break;
                case 3:
                    ref_3.current.focus();
                    break;
                case 4:
                    ref_4.current.focus();
                    break;
                case 5:
                    ref_5.current.focus();
                    break;
                default:
                    break;
            }
        }
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
                onPress={
                            () => {
                                if (confirm) {
                                    backToEmailInput();
                                } else {
                                    navigation.goBack();
                                }
                            }
                        }
                    />
                    {!confirm ?
            (<View style={style.content}>
                <Text style={style.h1}>Masukkan Nomor Teleponmu</Text>
                <Text style={style.text}>Masukkan nomor teleponmu! Kami akan kirimkan kode verifikasi untuk melanjutkan.</Text>
                <View style={style.form}>
                    <View style={style.input}>
                        
                           
                        <TextInput
                            placeholder='Email'
                            value={email}
                            onChangeText={setEmail}
                            style={style.inputBox}
                        />
                    </View>
                    <Pressable 
                        style={{...style.submitbtn, backgroundColor: loading ? colors.outline : colors.primary}}
                        onPress={signInWithEmail}
                        disabled={loading}
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
                    
                    <View style={style.codeInput}>
                        <TextInput
                            ref={ref_1}
                            style={style.inputBox}
                            autoFocus={true}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(value) => setCodeByIndex(0, value)}
                        />
                        <TextInput
                            ref={ref_2}
                            style={style.inputBox}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(value) => setCodeByIndex(1, value)}
                        />
                        <TextInput
                            ref={ref_3}
                            style={style.inputBox}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(value) => setCodeByIndex(2, value)}
                        />
                        <TextInput
                            ref={ref_4}
                            style={style.inputBox}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(value) => setCodeByIndex(3, value)}
                        />
                        <TextInput
                            ref={ref_5}
                            style={style.inputBox}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(value) => setCodeByIndex(4, value)}
                        />
                        <TextInput
                            ref={ref_6}
                            style={style.inputBox}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(value) => setCodeByIndex(5, value)}
                        />
                    </View>
                    <Pressable 
                        style={{...style.submitbtn, backgroundColor: isCodeFilled ? colors.primary : colors.outline}}
                        onPress={confirmCode}
                        disabled={!isCodeFilled}
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
    codeInput: {
        flex: 1,
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
        flex: 1,
        height: 60,
        borderColor: colors.outline,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        margin: 4,
        fontSize: 16,
    }, submitbtn: {
        backgroundColor: colors.primary,
        borderRadius: 50,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    }

};