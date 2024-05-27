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
        name: 'Ambulans',
        description: 'Ambulans dapat digunakan untuk mengangkut jenazah dari rumah atau tempat kejadian meninggal ke rumah duka atau langsung ke pemakaman.',
        img_url: 'https://placebeard.it/300x200',
        range_price: 'Rp 75.000 - Rp 500.000',
        contents: 
            {
                description: 'Ambulans dapat digunakan untuk mengangkut jenazah dari rumah atau tempat kejadian meninggal ke rumah duka atau langsung ke pemakaman.',
                img_url: 'https://placebeard.it/300x200',
                variants: [
                    {
                        name: 'Ambulans Standar',
                        price: 75000
                    }, {
                        name: 'Ambulans VIP',
                        price: 500000
                    }
                ]
            }
        

    },
    {
        id: 1,
        name: 'Mobil Pemakaman',
        description: 'Mobil Pemakaman digunakan untuk mengangkut jenazah dari rumah duka ke pemakaman.',
        img_url: 'https://placebeard.it/300x202',
        range_price: 'Rp 100.000 - Rp 500.000',
        contents: 
            {
                description: 'Mobil Pemakaman digunakan untuk mengangkut jenazah dari rumah duka ke pemakaman.',
                img_url: 'https://placebeard.it/300x200',
                variants: [
                    {
                        name: 'Mobil Pemakaman Standar',
                        price: 100000
                    }, {
                        name: 'Mobil Pemakaman VIP',
                        price: 500000
                    }
                ]
            }
    }, 
    {
        id: 2,
        name: 'Keranda',
        description: 'Keranda digunakan untuk mengangkut jenazah dari rumah duka ke pemakaman.',
        img_url: 'https://placebeard.it/300x240',
        range_price: 'Rp 50.000 - Rp 500.000',
        contents: 
            {
                description: 'Keranda digunakan untuk mengangkut jenazah dari rumah duka ke pemakaman.',
                img_url: 'https://placebeard.it/300x200',
                variants: [
                    {
                        name: 'Keranda Bambu',
                        price: 50000
                    },
                    {
                        name: 'Keranda Kayu',
                        price: 100000
                    },
                    {
                        name: 'Keranda Besi',
                        price: 500000
                    }
                ]
            }
    }
    
    
    
    
    
]



export default function Sarana_prasarana_pemakaman() {
    const navigation = useNavigation();
    const { addedContents, setAddedContents} = useBooking();
    useEffect(() => {
        console.log('keganti');
    }, []);
    
    const getIdsByVal = (val) => {
        if (!addedContents['booking']) {
            console.error("addedContents['booking'] is undefined");
            return [];
        }
        const item = addedContents['booking'].find((item) => item.val === val);
        return item ? item.id : [];
    };

    const removeIdFromVal = (val, idToRemove) => {
        setAddedContents(prevContents => {
            const newContents = { ...prevContents };
            newContents['booking'] = newContents['booking'].map(content => {
                if (content.val === val) {
                    return {
                        ...content,
                        id: content.id.filter(item => item.id !== idToRemove)
                    };
                }
                return content;
            });
            return newContents;
        });
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
                <Text style={style.h1}>Sarana Prasarana Pemakaman</Text>
            </View>

            {/* added contents */}
            { getIdsByVal('sarana_prasarana_pemakaman').length > 0 ? 
            (<View>
               <Text style={{color: colors.onsurface, fontSize: 13, fontWeight: 600, marginLeft: 20, marginBottom: 10}}>Ditambahkan</Text>
                {
                    getIdsByVal('sarana_prasarana_pemakaman').map((item, index) => (
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
                                removeIdFromVal('sarana_prasarana_pemakaman', item.id);
                                
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


                    <Text style={{ color: colors.onsurface, marginLeft: 10 }}>Cari sewaan yang kamu mau!</Text>
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
                        
                        navigation.navigate('detail', {item: item, val: 'sarana_prasarana_pemakaman'});
                    }}
                    >
                        <Image source={{ uri: item.img_url }} style={{ width: 64, height: 70, borderRadius: 15 }} />
                        <View style={{ paddingLeft: 15, paddingRight: 15, width: '73%' }}>
                            <Text style={{ color: colors.onsurface, fontSize: 14, fontWeight: 500 }} numberOfLines={1}>{item.name}</Text>
                            <Text style={{ color: colors.onsurface, fontSize: 12, fontWeight: 400 }} numberOfLines={1}>{item.description}</Text>
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

                {getIdsByVal('sarana_prasarana_pemakaman').length > 0 ? (
                    <View style={{height: 100}}></View>
                ) : (null
                )}
                
            </ScrollView>
            {getIdsByVal('sarana_prasarana_pemakaman').length > 0 ? (
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