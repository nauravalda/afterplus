import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '../../../constants/colors';
import { Icon } from '@rneui/themed';
import { SearchBar } from 'react-native-screens';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useBooking } from '../booking-context';
import { supabase } from '../../../lib/supabase';



export default function Sarana_prasarana_pemakaman() {
    const navigation = useNavigation();
    const { addedContents, setAddedContents} = useBooking();
    const [contents, setContents] = useState(null);

    useEffect(() => {
        const fetchContents = async () => {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('kategori', 'sarana_prasarana_pemakaman');

            if (error) {
                console.error(error);
                return;
            }

            // Parse data
            const parsedData = data.map((item) => {
                const variants = item.varian.split(',').map((variant, index) => {
                    return {
                        name: variant.trim(),
                        price: parseInt(item.harga.split(',')[index].trim())
                    };
                });
                // Find min and max price
                const minPrice = Math.min(...variants.map((variant) => variant.price));
                const maxPrice = Math.max(...variants.map((variant) => variant.price));
                return {
                    id: item.id,
                    name: item.nama_produk,
                    description: item.deskripsi_singkat,
                    img_url: item.img_url,
                    range_price: `Rp ${formatRupiah(minPrice)} - Rp ${formatRupiah(maxPrice)}`,
                    contents: {
                        description: item.deskripsi,
                        img_url: item.img_url,
                        variants: variants
                    }
                };
            });
            setContents(parsedData);
        }
        fetchContents();
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
    
    const getContentById = (id) => {
        return contents.find(content => content.id === id);
    }
    
    

    return (

        contents === null ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
            <ActivityIndicator size="large" color={colors.background} />
        </View> :
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
                            <Image source={{ uri: getContentById(item.id).img_url }} style={{ width: 64, height: 70, borderRadius: 15 }} />
                            <View style={{ paddingLeft: 15, paddingRight: 15, width: '73%' }}>
                                <Text style={{ color: colors.onsurface, fontSize: 14, fontWeight: 500 }} numberOfLines={1}>{getContentById(item.id).name}</Text>
                                <Text style={{ color: colors.onsurface, fontSize: 12, fontWeight: 400 }} numberOfLines={1}>{getContentById(item.id).location}</Text>
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