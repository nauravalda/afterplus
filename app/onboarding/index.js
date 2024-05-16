import {View, Text, Pressable, TextInput, Image} from 'react-native';
import React, {useState} from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firestore from '@react-native-firebase/firestore';
import { Paragraph } from 'react-native-paper';



export default function Onboarding({navigation, route}) {
    const [nextstep, setNextstep] = useState(false);
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState(0);
    const onConfirmSingle = (output) => {
        setOpen(false);
        setBirthdate(output);
    }
    const onCancelSingle = () => {
        setOpen(false);
    }

    const saveData = async () => {
        const user = firestore().collection('users').doc(route.params.id);
        await user.set({
            name: name,
            birthdate: birthdate,
        });
    }





    return (
        <View style={style.container}>
            {!nextstep ? (
                <View style={style.content}>
                <Text style={style.h1}>Kenalan Yuk!</Text>
                <Text style={style.text}>Sebelum mulai, yuk lengkapi identitasmu untuk pengalaman pribadi yang lebih baik!</Text>
                
                <View style={style.form}>
                    <TextInput
                        style={style.inputBox}
                        maxLength={50}
                        onChangeText={setName}
                        placeholder='Nama'    
                    />
                    <Pressable style={style.inputBox} onPress={() => setOpen(true)}>
                        <Text>{(birthdate=='') ? ('Tanggal lahir') : (birthdate.toString())}</Text>
                    </Pressable>

                    <DateTimePickerModal
                        isVisible={open}
                        mode="date"
                        onCancel={onCancelSingle}
                        onConfirm={onConfirmSingle}
                    />
                </View>
          
                    <Text style={style.text}>Dengan melanjutkan, kamu menyetujui Syarat dan Ketentuan penggunaan kami</Text>
                <Pressable 
                    disabled={name=='' && birthdate==''}
                    style={style.submitbtn}
                    onPress={() => {
                        setNextstep(true);
                        saveData();
                    }}
                >
                    <Text style={{
                        color: '#FFF8F3',
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: 0.1,
                    }}>Lanjut</Text>
                </Pressable>
            </View>
            ):(
                <View style={style.content}>
                <Text style={style.h1}>Halo, {name}!</Text>
                <Text style={style.text}>Selamat datang di After+{"\n"}Tidak perlu menghadapinya sendiri, kami akan membantumu dalam menjalani hidup baru.</Text>
                <Text style={style.text}>Apakah kamu sudah memindahkan aset dari nama yang ditinggalkan ke kepemilikanmu sendiri?</Text>
                <View style={{marginBottom: 28, marginTop: 20}}>
                <View style={style.optionBox}>
                    <Pressable style={(option==0) ? {...style.optionBox, backgroundColor: '#008673'} : {...style.optionBox}}
                    onPress={() => setOption(0)}
                    >
                        <Image source={require('./../../assets/welcome-1.png')} 
                            style={{width: 100, height: 100, paddingLeft: 32}}
                        
                        />
                        <View style={{flexDirection: 'column', paddingRight:32}}>
                        <Text style={(option==0) ? {...style.h3, color: 'white'} : {...style.h3}}>Sudah nih!</Text>
                        <Text style={(option==0) ? {...style.text, color: 'white', flexShrink: 1} : {...style.text, flexShrink: 1}}>Aku ingin langsung mengatur{"\n"}keseharianku dengan After+</Text>
                        </View>
                    </Pressable>
                </View>

                <View style={style.optionBox}>
                    <Pressable style={(option==1) ? {...style.optionBox, backgroundColor: '#008673', color: 'white'} : {...style.optionBox}}
                    onPress={() => setOption(1)}
                    >
                        <Image source={require('./../../assets/welcome-2.png')}
                        style={{width: 100, height: 100, paddingLeft: 20}}
                         />
                        <View style={{flexDirection: 'column', paddingRight: 32}}>
                        <Text style={(option==1) ? {...style.h3, color: 'white'} : {...style.h3}}>Belum, gimana dong?</Text>
                        <Text style={(option==1) ? {...style.text, color: 'white', flexShrink: 1} : {...style.text, flexShrink: 1}}>Bantu aku mengurus aset{"\n"}peninggalan</Text>
                        </View>
                    </Pressable>
                </View>
                </View>


                
                    
                <Pressable 
                    style={style.submitbtn}
                    onPress={() => {
                        setNextstep(true);
                        navigation.navigate('activities', {id: route.params.id});

                    }}
                >
                    <Text style={{
                        color: '#FFF8F3',
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: 0.1,
                    }}>Lanjut</Text>
                </Pressable>
            </View>

            )}
            
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
        marginTop: 40,

    },
    h1: {
        color: '#281800',
        fontFamily: 'Roboto',
        fontSize: 32,
        fontWeight: 800,
        lineHeight: 36, /* 62.5% */
        letterSpacing: 0.1,
        marginBottom: 10,
    }, h3:{
        color: '#281800',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 800,
        lineHeight: 36, 
    },
    text: {
        color: '#281800',
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: 0.2,
        marginBottom: 8,
    },
    form: {
        width: '100%',
        display: 'flex',
        height: 140,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 24,
        marginTop: 24,

    }, inputBox: {
        width: '100%',
        height: 60,
        borderColor: '#817567',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 16,
        fontSize: 16,
    }, submitbtn: {
        backgroundColor: '#DBA140',
        borderRadius: 50,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    }, optionBox:{
        width: '100%',
        height: 100,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F2E6DA',
        marginBottom: 5,
        marginTop: 5,
    }

};