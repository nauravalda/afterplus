import { Text, View, Pressable, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from './../../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { useBooking } from '../booking-context';


export default function Detail({ navigation, route }) {
    const nav = useNavigation();
    const [selectedVariant, setSelectedVariant] = useState({
        id: '',
        name: '',
        price: ''
    });
    const handleSelectVariant = (id, name, price) => {
        setSelectedVariant({ id: id, name: name, price: price });
    }

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
    const { addedContents, setAddedContents } = useBooking();

    const handleAddContents = () => {
        // Copy the current state of addedContents
        const newContents = {...addedContents};
        const index = newContents['booking'].findIndex(x => x.val === route.params.val);
        // Push new variant to array
        newContents['booking'][index].id.push({ id: selectedVariant.id, desc: selectedVariant.name, price: selectedVariant.price });
        console.log(selectedVariant.id, selectedVariant.name, selectedVariant.price);
        // Set new state
        setAddedContents(newContents);
        setSelectedVariant({ id: '', name: '', price: '' });
        

        nav.navigate(route.params.val);
    };



    return (
        <View style={style.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                <Icon
                    color={colors.surfacecontainer}
                    containerStyle={{}}
                    disabledStyle={{}}
                    iconProps={{}}
                    iconStyle={{}}
                    name="west"
                    size={24}
                    type="material"
                    style={{ alignSelf: 'flex-start', marginRight: 10 }}
                    onPress={() => nav.goBack()}
                />
                <Text style={style.h1}>{route.params.item.name}</Text>
            </View>
            <Image source={require('./../../../assets/after-bg-secondary.png')} style={{ position: 'absolute', top: 60, justifyContent: 'center', alignSelf: 'center', marginBottom: 24, width: '90%', height: 174, overflow: 'hidden', zIndex: -1 }} />
            <Image source={{ uri: route.params.item.img_url }} style={{ width: 200, height: 149, alignSelf: 'center', borderRadius: 20 }} />
            <ScrollView style={{ ...style.scrollable, flex: 1 }} >
                <View style={{ padding: 20 }}>


                    <Text style={{ ...style.h1, color: colors.onsurface }}>{route.params.item.name}</Text>
                    {!route.params.item.location ? (null) : (<Text style={{ ...style.text, marginTop: 10, }}>{route.params.item.location}</Text>)
                    }
                    <Text style={{ ...style.text, marginTop: 10, color: colors.secondary, fontWeight: 600, backgroundColor: colors.secondarycontainer, padding: 5, alignSelf: 'flex-start', fontSize: 11, borderRadius: 10 }}>{route.params.item.range_price}</Text>
                    <Text style={{ ...style.text, marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: colors.outlinevariant, marginBottom: 20 }}>{route.params.item.contents.description}</Text>
                    {route.params.item.contents.variants.map((item, index) => (
                        <View key={index}>
                            <Pressable style={{ ...style.option }}
                                onPress={() => handleSelectVariant(route.params.item.id, item.name, item.price)}
                            >
                                {!(selectedVariant.name === item.name) ? (

                                    <Icon
                                        color={colors.onsurfacevariant}
                                        containerStyle={{}}
                                        disabledStyle={{}}
                                        iconProps={{}}
                                        iconStyle={{}}
                                        name="radio-button-unchecked"
                                        size={24}
                                        type="material"
                                        style={{ alignSelf: 'flex-start', marginRight: 10 }}
                                    />) : (
                                    <Icon
                                        color={colors.primary}
                                        containerStyle={{}}
                                        disabledStyle={{}}
                                        iconProps={{}}
                                        iconStyle={{}}
                                        name="radio-button-checked"
                                        size={24}
                                        type="material"
                                        style={{ alignSelf: 'flex-start', marginRight: 10 }}
                                    />
                                )}

                                <View style={{}}>
                                    <Text style={style.text}>{item.name}</Text>
                                    <Text style={{ ...style.text, color: colors.secondary, fontWeight: 500 }}>
                                        Rp {formatRupiah(item.price)}
                                    </Text>
                                </View>
                            </Pressable>



                        </View>
                    ))}


                </View>
                {selectedVariant.name !== '' ? (
                    <View style={{ height: 100 }}>

                    </View>
                ) : (null)}

            </ScrollView>
            {selectedVariant.name !== '' ? (
                <View style={{
                    bottom: 0, zIndex: 100, position: 'absolute', width: '100%', alignItems: 'center', borderTopStartRadius: 40, borderTopRightRadius: 40, borderWidth: 0.5, borderColor: colors.outlinevariant, backgroundColor: colors.surfacecontainer

                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginBottom: 15, marginTop: 10 }}>
                        <Text style={{ ...style.text, fontWeight: 600 }}>{selectedVariant.name}</Text>

                        <Text style={{ ...style.text, color: colors.secondary, fontWeight: 500 }}>Rp {formatRupiah(selectedVariant.price)}</Text>

                    </View>
                    <Pressable style={{ backgroundColor: colors.primary, padding: 15, borderRadius: 30, position: 'relative', width: '90%', marginBottom: 25 }}
                        onPress={() =>

                            handleAddContents()
                        }>
                        <Text style={{ color: colors.surfacecontainer, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Tambahkan</Text>
                    </Pressable>
                </View>

            ) : (null)}

        </View>
    )

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
    }, text: {
        color: colors.onsurfacevariant,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 20,
        marginHorizontal: 10
    }, option: {
        height: 70,
        width: '90%',
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

    }
}