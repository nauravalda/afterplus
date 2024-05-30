import { Text, View, Pressable, Image, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { useBooking } from './booking-context';
import { useUser } from './../auth/user-context';

export default function Input_biodata() {
    const nav = useNavigation();

    const { addedContents, setAddedContents } = useBooking();



    const [contact, setContact] = useState('');

    const [name, setName] = useState('');

    const [notes, setNotes] = useState('');

    const [address, setAddress] = useState('')

    const [city, setCity] = useState('')

    const [district, setDistrict] = useState('')

    const { user } = useUser();

    const [activeButton, setActiveButton] = useState('diri_sendiri');

    const handlePress = (button) => {
        setActiveButton(button);
    }




    const handleNext = () => {
        const newContents = { ...addedContents };
        if (activeButton === 'diri_sendiri') {
            newContents['serviceuser'].contact = contact;
            newContents['serviceuser'].name = user.name;
            newContents['serviceuser'].notes = notes;
            newContents['serviceuser'].address = user.address;
            newContents['serviceuser'].city = user.city;
            newContents['serviceuser'].district = user.district;
            setAddedContents(newContents);
            nav.navigate('payment')
            return;
        }
        newContents['serviceuser'].contact = contact;
        newContents['serviceuser'].name = name;
        newContents['serviceuser'].notes = notes;
        newContents['serviceuser'].address = address;
        newContents['serviceuser'].city = city;
        newContents['serviceuser'].district = district;
        setAddedContents(newContents);

        nav.navigate('payment')
    }

    return (
        <View style={style.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                <Icon
                    color={colors.surfacecontainer}
                    name="west"
                    size={24}
                    type="material"
                    style={{ alignSelf: 'flex-start', marginRight: 10 }}
                    onPress={() => nav.goBack()}
                />
                <Text style={style.h1}>Input Rincian Pemesanan</Text>
            </View>

            <ScrollView style={{ ...style.scrollable, flex: 1 }} nestedScrollEnabled={true}>
                <View style={{ padding: 20 }}>

                    <View style={{ ...style.input, paddingTop: 20, borderBottomWidth: 1, borderColor: colors.outlinevariant, marginBottom: 25 }}>
                        <Text style={{ ...style.text, paddingBottom: 10, width: '100%' }}>
                            Input kontak yang bisa dihubungi
                        </Text>

                        <TextInput
                            placeholder="Nomor Telepon"
                            value={contact}
                            onChangeText={setContact}
                            style={{ ...style.inputBox, width: '100%', marginBottom: 20 }}

                        />
                    </View>

                    <View style={{ ...style.input, paddingBottom: 20, borderBottomWidth: 1, borderColor: colors.outlinevariant, marginBottom: 25 }}>
                        <Text style={{ ...style.text, paddingBottom: 10, width: '100%' }}>
                            Input biodata pemakai layanan
                        </Text>

                        <View style={{ flexDirection: 'row', marginBottom: 24, marginTop: 20 }}>
                            <Pressable style={{ width: '50%', alignItems: 'center', backgroundColor: activeButton === 'diri_sendiri' ? colors.secondarycontainer : 'transparent', height: 48, justifyContent: 'center', borderTopLeftRadius: 50, borderBottomLeftRadius: 50, borderWidth: 1, borderColor: colors.outline }}
                                onPress={() => handlePress('diri_sendiri')}>
                                <Text style={style.segmented_text}>Diri Sendiri</Text>
                            </Pressable>
                            <Pressable style={{ width: '50%', alignItems: 'center', backgroundColor: activeButton === 'orang_lain' ? colors.secondarycontainer : 'transparent', height: 48, justifyContent: 'center', borderTopRightRadius: 50, borderBottomRightRadius: 50, borderWidth: 1, borderColor: colors.outline }}
                                onPress={() => handlePress('orang_lain')}>
                                <Text style={style.segmented_text}>Orang Lain</Text>
                            </Pressable>


                        </View>

                        {activeButton === 'orang_lain' ? (

                            <View style={{ width: '100%'}}>



                        <TextInput
                            placeholder="Nama"
                            value={name}
                            onChangeText={setName}
                            style={{ ...style.inputBox, width: '100%', marginBottom: 20 }}

                        />



                        <TextInput
                            placeholder="Alamat Lengkap"
                            value={address}
                            onChangeText={setAddress}
                            style={{ ...style.inputBox, width: '100%', marginBottom: 20 }}

                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <TextInput
                                placeholder="Kecamatan"
                                value={district}
                                onChangeText={setDistrict}
                                style={{ ...style.inputBox, width: '48%' }}

                            />
                            <TextInput
                                placeholder="Kota"
                                value={city}
                                onChangeText={setCity}
                                style={{ ...style.inputBox, width: '48%' }}

                            />

                        </View>
                        </View>
                        ) : 
                        (
                            <View style={{ width: '100%'}}>



                            <Text
                                style={{ ...style.inputBox, width: '100%', marginBottom: 20, paddingVertical:18 }}
    
                            >{user.name}</Text>
    
    
    
                            <Text
                                
                                style={{ ...style.inputBox, width: '100%', marginBottom: 20, paddingVertical:18 }}
    
                            >
                                {user.address}
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <Text
                                 
                                    style={{ ...style.inputBox, width: '48%', paddingVertical:18 }}
    
                                > {user.district}</Text>
                                <Text style={{ ...style.inputBox, width: '48%', paddingVertical:18 }}>
                                    {user.city}
                                </Text>
    
                            </View>
                            </View>

                        )}

                    </View>

                    <View style={{ ...style.input, borderTopWidth: 0, borderColor: colors.outlinevariant }}>
                        <Text style={{ ...style.text, paddingBottom: 10, width: '100%' }}>
                            Input catatan untuk pemesanan (opsional)
                        </Text>

                        <TextInput
                            placeholder="Catatan"
                            value={notes}
                            onChangeText={setNotes}
                            style={{ ...style.inputBox, width: '100%', marginBottom: 20 }}

                        />
                    </View>
                </View>
                {(contact != '' && name != '' && address != '' && district != '' && city != '') || (contact != '' && activeButton=='diri_sendiri') ? (
                    <View style={{ height: 100 }}></View>
                ) : null}
            </ScrollView>
            {(contact != '' && name != '' && address != '' && district != '' && city != '') || (contact != '' && activeButton=='diri_sendiri') ? (
                <View style={{
                    bottom: 0, zIndex: 100, position: 'absolute', width: '100%', alignItems: 'center', borderTopStartRadius: 40, borderTopRightRadius: 40, borderWidth: 0.5, borderColor: colors.outlinevariant, backgroundColor: colors.surfacecontainer
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginBottom: 15, marginTop: 10 }}>
                        <Text style={{ ...style.text, fontWeight: 600 }}></Text>
                    </View>
                    <Pressable style={{ backgroundColor: colors.primary, padding: 15, borderRadius: 30, position: 'relative', width: '90%', marginBottom: 25 }}
                        onPress={handleNext}>
                        <Text style={{ color: colors.surfacecontainer, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Tambahkan</Text>
                    </Pressable>
                </View>
            ) : null}
        </View>
    );
}

const style = {
    container: {
        backgroundColor: colors.primary,
        flex: 1,
    },
    h1: {
        fontSize: 17,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: colors.surfacecontainer
    },
    scrollable: {
        backgroundColor: colors.surfacecontainer,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 20,
        height: '100%',
    },
    text: {
        color: colors.onsurfacevariant,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 20,
        marginHorizontal: 10
    },
    option: {
        height: 70,
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        backgroundColor: colors.surfacecontainer,
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: colors.onsurface,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    dropdown: {
        height: 60,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        backgroundColor: colors.surfacecontainer,
        borderRadius: 15,
        marginBottom: 15,
        borderColor: colors.outlinevariant,
        borderWidth: 1,
    },
    input: {

        alignItems: 'center',
        marginBottom: 16,
        marginHorizontal: 10
    }, inputBox: {
        height: 60,
        borderColor: colors.outlinevariant,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingLeft: 16,
        fontSize: 16,
    },
    schedule: {
        height: 470,
        width: '95%',
        backgroundColor: colors.surfacecontainer,
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: colors.onsurface,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
};

