import { View, Text, Pressable, Image } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '../../../constants/colors';
import { Icon } from '@rneui/themed';
import { SearchBar } from 'react-native-screens';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useBooking } from '../booking-context';


const contents=[
    {
        id: 0,
        name: 'Taman Makam Pahlawan',
        location: 'Jl. Medan Merdeka Barat No. 17, Jakarta Pusat',
        region: 'Jakarta Pusat',
        img_url: 'https://placebeard.it/300x200',
        range_price: 'Rp 1.000.000 - Rp 5.000.000',
        contents: 
            {
                description: 'Taman Makam Pahlawan adalah tempat pemakaman yang diperuntukkan bagi pahlawan yang telah berjasa bagi negara',
                img_url: 'https://placebeard.it/300x200',
                variants: [
                    {
                        name: 'Makam Tunggal',
                        price: 1000000
                    },
                    {
                        name: 'Makam Keluarga',
                        price: 5000000
                    },
                    {
                        name: 'Makam Umum',
                        price: 500000
                    }
                ]
            }
        

    },
    {
        id: 1,
        name: 'Taman Jaya Sentosa',
        location: 'Jl. Gatot Subroto No. 43, Bekasi',
        region: 'Bekasi',
        img_url: 'https://placebeard.it/300x202',
        range_price: 'Rp 3.000.000 - Rp 14.000.000',
        contents: 
            {
                description: 'Taman Pemakaman Jaya Sentosa adalah suatu tempat yang tenang dan terjaga dengan baik di Bekasi, dekat dengan pusat kota yang sibuk. Dikelilingi oleh alam hijau dan pemandangan yang menenangkan, pemakaman ini menawarkan lingkungan yang nyaman dan penuh ketenangan bagi yang berduka. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum.',
                img_url: 'https://placebeard.it/300x202',
                variants: [
                    {
                        name: 'Makam Tunggal',
                        price: 5000000
                    },
                    {
                        name: 'Makam Keluarga',
                        price: 14000000
                    },
                    {
                        name: 'Makam Umum',
                        price: 3000000
                    }
                ]
            }
    },
    {
        id: 2,
        name: 'Taman Makam Indah',
        location: 'Jl. Cipto Mangunkusumo No. 12, Surabaya',
        region: 'Surabaya',
        img_url: 'https://placebeard.it/300x200',
        range_price: 'Rp 2.000.000 - Rp 6.000.000',
        contents: {
            description: 'Taman Makam Indah adalah tempat pemakaman yang terletak di Surabaya, dikelilingi oleh alam yang indah dan nyaman. Tempat ini menawarkan berbagai pilihan makam untuk keluarga dan umum.',
            img_url: 'https://placebeard.it/300x200',
            variants: [
                { name: 'Makam Tunggal', price: 2000000 },
                { name: 'Makam Keluarga', price: 6000000 },
                { name: 'Makam Umum', price: 500000 }
            ]
        }
    },
    {
        id: 3,
        name: 'Taman Makam Damai',
        location: 'Jl. Pahlawan No. 23, Bandung',
        region: 'Bandung',
        img_url: 'https://placebeard.it/300x200',
        range_price: 'Rp 1.500.000 - Rp 4.500.000',
        contents: {
            description: 'Taman Makam Damai adalah tempat pemakaman yang terletak di Bandung, menyediakan lingkungan yang tenang dan damai untuk orang yang berduka.',
            img_url: 'https://placebeard.it/300x200',
            variants: [
                { name: 'Makam Tunggal', price: 1500000 },
                { name: 'Makam Keluarga', price: 4500000 },
                { name: 'Makam Umum', price: 400000 }
            ]
        }
    },
    {
        id: 4,
        name: 'Taman Makam Bahagia',
        location: 'Jl. Pahlawan No. 45, Yogyakarta',
        region: 'Yogyakarta',
        img_url: 'https://placebeard.it/300x200',
        range_price: 'Rp 1.200.000 - Rp 3.500.000',
        contents: {
            description: 'Taman Makam Bahagia adalah tempat pemakaman yang terletak di Yogyakarta, menyediakan lingkungan yang nyaman dan bahagia bagi yang berduka.',
            img_url: 'https://placebeard.it/300x200',
            variants: [
                { name: 'Makam Tunggal', price: 1200000 },
                { name: 'Makam Keluarga', price: 3500000 },
                { name: 'Makam Umum', price: 300000 }
            ]
        }
    },
    {
        id: 5,
        name: 'Taman Makam Sejahtera',
        location: 'Jl. Merdeka No. 67, Semarang',
        region: 'Semarang',
        img_url: 'https://placebeard.it/300x200',
        range_price: 'Rp 1.800.000 - Rp 5.000.000',
        contents: {
            description: 'Taman Makam Sejahtera adalah tempat pemakaman yang terletak di Semarang, menyediakan lingkungan yang sejahtera dan nyaman bagi yang berduka.',
            img_url: 'https://placebeard.it/300x200',
            variants: [
                { name: 'Makam Tunggal', price: 1800000 },
                { name: 'Makam Keluarga', price: 5000000 },
                { name: 'Makam Umum', price: 400000 }
            ]
        }
    },
    {
        id: 6,
        name: 'Taman Makam Sentosa',
        location: 'Jl. Sentosa No. 21, Malang',
        region: 'Malang',
        img_url: 'https://placebeard.it/300x200',
        range_price: 'Rp 1.700.000 - Rp 4.200.000',
        contents: {
            description: 'Taman Makam Sentosa adalah tempat pemakaman yang terletak di Malang, menyediakan lingkungan yang tenang dan sentosa bagi yang berduka.',
            img_url: 'https://placebeard.it/300x200',
            variants: [
                { name: 'Makam Tunggal', price: 1700000 },
                { name: 'Makam Keluarga', price: 4200000 },
                { name: 'Makam Umum', price: 300000 }
            ]
        }
    },
    
    
    
    
    
]



export default function Booking_area_pemakaman() {
    const navigation = useNavigation();
    const { addedContents, setAddedContents} = useBooking();
    useEffect(() => {
    }, []);
    
    const getIdsByVal = (val) => {
        const item = addedContents.find((item) => item.val === val);
        return item ? item.id : [];
    }

    const removeIdFromVal = (val, idToRemove) => {
        setAddedContents(prevContents => prevContents.map(content => {
            if (content.val === val) {
                return {
                    ...content,
                    id: content.id.filter(item => item.id !== idToRemove)
                };
            }
            return content;
        }));
    };

    const formatRupiah = (angka) => {
        var number_string = angka.toString(),
            sisa = number_string.length % 3,
            rupiah = number_string.substr(0, sisa),
            ribuan = number_string.substr(sisa).match(/\d{3}/g);
        if (ribuan) {
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
        return rupiah;
    }
    
    
    

    return (
        <View style={style.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
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
                    onPress={() => navigation.goBack()}
                />
                <Text style={style.h1}>Booking Area Pemakaman</Text>
            </View>

            {/* added contents */}
            { getIdsByVal('booking_area_pemakaman').length > 0 ? 
            (<View>
               <Text style={{color: colors.onsurface, fontSize: 13, fontWeight: 600, marginLeft: 20, marginBottom: 10}}>Ditambahkan</Text>
                {
                    getIdsByVal('booking_area_pemakaman').map((item, index) => (
                        <View key={index} style={ style.card}>
                            <Image source={{ uri: contents[item.id].img_url }} style={{ width: 64, height: 70, borderRadius: 15 }} />
                            <View style={{ paddingLeft: 15, paddingRight: 15, width: '73%' }}>
                                <Text style={{ color: colors.onsurface, fontSize: 14, fontWeight: 500 }} numberOfLines={1}>{contents[item.id].name}</Text>
                                <Text style={{ color: colors.onsurface, fontSize: 12, fontWeight: 400 }} numberOfLines={1}>{contents[item.id].location}</Text>
                                <Text style={{ color: colors.secondary, fontSize: 12, fontWeight: 500 }}>{item.desc} - Rp {formatRupiah(item.price)}</Text>

                            </View>
                            <Pressable style={{
                                width: 36,
                                height: 36,
                                backgroundColor: colors.primary,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'flex-end',
                                borderBottomEndRadius: 15,
                                borderTopStartRadius: 15,

                            }}
                            onPress={() => {
                                removeIdFromVal('booking_area_pemakaman', item.id);
                                
                            }}
                            >

                                <Icon
                                    color={colors.surfacecontainer}
                                    containerStyle={{}}
                                    disabledStyle={{}}
                                    iconProps={{}}
                                    iconStyle={{}}
                                    name="delete-forever"
                                    size={20}
                                    type="material"
                                />
                            </Pressable>
                        </View>
                    ))
                }
            </View>) : (null)

            }

            {/* search bar */}
            <Pressable style={style.searchbar}>


                    <Text style={{ color: colors.onsurface, marginLeft: 10 }}>Cari di area sekitarmu!</Text>
                    <Icon
                        color={colors.onsurface}
                        containerStyle={{}}
                        disabledStyle={{}}
                        iconProps={{}}
                        iconStyle={{}}
                        name="search"
                        size={24}
                        type="material"
                        style={{ alignSelf: 'flex-start' }}
                    />
            </Pressable>
            <ScrollView>
                {contents.map((item, index) => (
                    <Pressable key={index} style={style.card}
                    onPress={() => {
                        
                        navigation.navigate('detail', {item: item});
                    }}
                    >
                        <Image source={{ uri: item.img_url }} style={{ width: 64, height: 70, borderRadius: 15 }} />
                        <View style={{ paddingLeft: 15, paddingRight: 15, width: '73%' }}>
                            <Text style={{ color: colors.onsurface, fontSize: 14, fontWeight: 500 }} numberOfLines={1}>{item.name}</Text>
                            <Text style={{ color: colors.onsurface, fontSize: 12, fontWeight: 400 }} numberOfLines={1}>{item.location}</Text>
                            <Text style={{ color: colors.secondary, fontSize: 12, fontWeight: 500}}>{item.range_price}</Text>

                        </View>
                        <View style={{
                                        width: 36,
                                        height: 36,
                                        backgroundColor: colors.primary,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf:'flex-end',
                                        borderBottomEndRadius: 15,
                                        borderTopStartRadius: 15,

                                    }}>
                                        <Icon
                                            color={colors.surfacecontainer}
                                            containerStyle={{}}
                                            disabledStyle={{}}
                                            iconProps={{}}
                                            iconStyle={{}}
                                            name="add"
                                            size={20}
                                            type="material"
                                        />
                                    </View>
                    </Pressable>
                ))}

                {getIdsByVal('booking_area_pemakaman').length > 0 ? (
                    <View style={{height: 100}}></View>
                ) : (null
                )}
                
            </ScrollView>
            {getIdsByVal('booking_area_pemakaman').length > 0 ? (
                <View style={{bottom: 0, zIndex: 100, position: 'absolute', width:'100%', alignItems: 'center', borderTopStartRadius: 40, borderTopRightRadius: 40, borderWidth: 0.5, borderColor: colors.outlinevariant, backgroundColor: colors.surfacecontainer
                
                }}>
                <Pressable style={{ backgroundColor: colors.primary, padding: 15, borderRadius: 30, position: 'relative', width: '90%', marginBottom:25, marginTop: 15 }}
                onPress={() => 
                    navigation.navigate('options')
                }>
                    <Text style={{ color: colors.surfacecontainer, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Selanjutnya</Text>
                </Pressable>
                </View>
                
            ) : (null)}
        </View>

    )
}

const style = {
    container: {
        flex: 1,
        backgroundColor: colors.surfacecontainer,

    }, p: {
        color: colors.onsurface,
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 24, /* 150% */
    }, h1: {
        fontSize: 22,
        fontWeight: 400,
        marginLeft: 20,


    }, searchbar:{
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: colors.surfacecontainer, 
        borderRadius: 20, 
        padding: 10, 
        justifyContent: 'space-between', 
        marginBottom: 20,
        marginTop: 20,
        alignSelf: 'center',
        width: '90%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.outline,
        color: colors.onsurfacevariant

    }, card:{
        height: 70,
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
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
}