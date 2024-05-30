import { Text, View, Pressable, Image, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { supabase } from '../../lib/supabase';
import { useUser } from './user-context';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

export default function Register() {
    const nav = useNavigation();




    const [name, setName] = useState('');

    const [address, setAddress] = useState('')

    const [city, setCity] = useState('')

    const [district, setDistrict] = useState('')

    const { user, setUser } = useUser();

    const [open, setOpen] = useState(false)

    const [date, setDate] = useState(dayjs());


    const formatDate = (date) => {
        return dayjs(date).format('YYYY-MM-DD')
    }



    const handleNext = async () => {
        // update user data


        const { error } = await supabase
            .auth.updateUser({
                email: user.email,
                data: {
                    nama_lengkap: name,
                    alamat: address,
                    kota: city,
                    kecamatan: district,
                    tanggal_lahir: formatDate(date)

                }
            })

        if (error) {
            console.log(error)
            console.log(user.id)
            console.log(user.email)
            return
        }

        setUser({
            ...user,
            name: name,
            address: address,
            city: city,
            district: district,
            birthdate: date,
            email: user.email
        })


        nav.navigate('mytabs')
    }

    return (
        <View style={style.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                <Icon
                    color={colors.primary}
                    name="west"
                    size={24}
                    type="material"
                    style={{ alignSelf: 'flex-start', marginRight: 10 }}
                />


            </View>

            <ScrollView style={{ ...style.scrollable, flex: 1 }} nestedScrollEnabled={true}>
                <View style={{ padding: 20, paddingTop: 5 }}>



                    <View style={{ ...style.input, paddingBottom: 20, borderBottomWidth: 1, borderColor: colors.outlinevariant, marginBottom: 25 }}>
                        <Text style={style.h1}>Isi Biodatamu</Text>
                        <Text style={{ ...style.text, paddingBottom: 10, width: '100%' }}>
                            Isi identitasmu agar kami dapat mengenalimu saat menggunakan layanan kami
                        </Text>

                        <TextInput
                            placeholder="Nama Lengkap"
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
                        <View style={{ ...style.input, paddingTop: 20, marginBottom: 20, width: '100%' }}>
                                

                                <Pressable style={{ alignItems: 'center', flexDirection: 'row', width: '100%', height: 60, borderColor: colors.outlinevariant, borderWidth: 1, borderRadius: 10, justifyContent: 'space-between', paddingHorizontal: 16 }}
                                    onPress={() => setOpen(!open)}
                                >

                                    <Text style={{ opacity: 0.65, fontSize: 16 }}>Tanggal Lahir</Text>
                                    <Icon
                                        color={colors.onsurface}
                                        name="calendar-month"
                                        size={24}
                                        type="material"
                                        style={{ alignSelf: 'flex-start', marginRight: 10, opacity: 0.65 }}
                                    />
                                </Pressable>
                                {open ? (
                                    <View style={{ marginTop: 5, padding: 9, ...style.schedule }} nestedScrollEnabled={true}>
                                        <DateTimePicker
                                            mode="single"
                                            date={date}
                                            onChange={(params) => setDate(params.date)}
                                            minDate={new Date().getDate()}
                                            isVisible={false}
                                        />

                                    </View>
                                ) : null}

                            </View>

                    </View>


                </View>
                {date != '' && name != '' && address != '' && district != '' && city != '' ? (
                    <View style={{ height: 100 }}></View>
                ) : null}
            </ScrollView>
            {date != '' && name != '' && address != '' && district != '' && city != '' ? (
                <View style={{
                    bottom: 0, zIndex: 100, position: 'absolute', width: '100%', alignItems: 'center', borderTopStartRadius: 40, borderTopRightRadius: 40, borderWidth: 0.5, borderColor: colors.outlinevariant, backgroundColor: colors.surfacecontainer
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginBottom: 15, marginTop: 10 }}>
                    
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
        backgroundColor: colors.surfacecontainer,
        flex: 1,
    },
    h1: {
        fontSize: 26,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        color: colors.onsurface,
        marginBottom: 10
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
        marginHorizontal: 10,
        marginBottom: 20,
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

