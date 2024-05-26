import { Text, View, Pressable, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { useBooking } from '../booking-context';

const content = [
    {
        id: 0,
        name: 'Pengurus Jenazah Profesional',
        description: 'Layanan pengurus jenazah profesional menyediakan bantuan komprehensif dan pengurusan lengkap dalam proses pemakaman atau pengurusan jenazah, mulai dari persiapan hingga pelaksanaan upacara pemakaman.\n- Ahli prosedur dan persyaratan Koordinasi dengan pihak terkait\n- Layanan yang dapat dipersonalisasikan\n- Profesionalisme dan etika\n- Kemudahan pengurusan dokumen dan administrasi',
        range_price: 'Start from Rp 75.000',
        img_url: 'https://placebeard.it/300x200',
        variants: [
            {
                id: 0,
                name: 'Petugas Pembersihan',
                price: 75000
            },
            {
                id: 1,
                name: 'Petugas Pemakaman',
                price: 120000
            }
        ]
    }
]

export default function Pengurus_jenazah() {
    const nav = useNavigation();

    const [selectedVariants, setSelectedVariants] = useState([]);
    
    const handleSelectVariant = (id, name, price) => {
        setSelectedVariants(prevState => {
            const index = prevState.findIndex(variant => variant.id === id);
            if (index > -1) {
                // Remove the variant if it's already selected
                return prevState.filter(variant => variant.id !== id);
            } else {
                // Add the variant if it's not selected
                return [...prevState, { id, name, price }];
            }
        });
    };

    const formatRupiah = (angka) => {
        var number_string = angka.toString(),
            sisa = number_string.length % 3,
            rupiah = number_string.substr(0, sisa),
            ribuan = number_string.substr(sisa).match(/\d{3}/g);
        if (ribuan) {
            var separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
        return rupiah;
    }

    const total =(selectedVariants) => {
        let total = 0;
        selectedVariants.forEach(variant => {
            total += variant.price;
        });
        return total;
    }

    const { addedContents, setAddedContents } = useBooking();

    const handleAddContents = () => {
        // Copy the current state of addedContents
        const newContents = {...addedContents};
        const index = newContents['booking'].findIndex(x => x.val === "pengurus_jenazah");
        // Push new variant to array
        newContents['booking'][index].id.id = selectedVariants.map(variant => variant.id);
        newContents['booking'][index].id.total = total(selectedVariants);

        // Set new state
        setAddedContents(newContents);
        setSelectedVariants([]);
        nav.navigate('options');
    };

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
                <Text style={style.h1}>Pengurus Jenazah Profesional</Text>
            </View>
            <Image source={require('./../../../assets/after-bg-secondary.png')} style={{ position: 'absolute', top: 60, justifyContent: 'center', alignSelf: 'center', marginBottom: 24, width: '90%', height: 174, overflow: 'hidden', zIndex: -1 }} />
            <Image source={{ uri: content[0].img_url }} style={{ width: 200, height: 149, alignSelf: 'center', borderRadius: 20 }} />
            <ScrollView style={{ ...style.scrollable, flex: 1 }} nestedScrollEnabled={true}>
                <View style={{ padding: 20 }}>
                    <Text style={{ ...style.h1, color: colors.onsurface }}>{content[0].name}</Text>
                    <Text style={{ ...style.text, marginTop: 10, color: colors.secondary, fontWeight: 600, backgroundColor: colors.secondarycontainer, padding: 5, alignSelf: 'flex-start', fontSize: 11, borderRadius: 10 }}>{content[0].range_price}</Text>
                    <Text style={{ ...style.text, marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: colors.outlinevariant, marginBottom: 20 }}>{content[0].description}</Text>
                    

                    {content[0].variants.map((item, index) => (
                        <View key={index}>
                            <Pressable style={{ ...style.option, marginTop: 10 }}
                                onPress={() => handleSelectVariant(item.id, item.name, item.price)}
                            >
                                {selectedVariants.some(variant => variant.id === item.id) ? (
                                    <Icon
                                        color={colors.primary}
                                        name="check-box"
                                        size={24}
                                        type="material"
                                        style={{ alignSelf: 'flex-start', marginRight: 10 }}
                                    />
                                ) : (
                                    <Icon
                                        color={colors.onsurfacevariant}
                                        name="check-box-outline-blank"
                                        size={24}
                                        type="material"
                                        style={{ alignSelf: 'flex-start', marginRight: 10 }}
                                    />
                                )}

                                <View>
                                    <Text style={style.text}>{item.name}</Text>
                                    <Text style={{ ...style.text, color: colors.secondary, fontWeight: 500 }}>
                                        Rp {formatRupiah(item.price)}
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    ))}
                </View>
                {selectedVariants.length > 0 ? (
                    <View style={{ height: 100 }}></View>
                ) : null}
            </ScrollView>
            {selectedVariants.length > 0  ? (
                <View style={{
                    bottom: 0, zIndex: 100, position: 'absolute', width: '100%', alignItems: 'center', borderTopStartRadius: 40, borderTopRightRadius: 40, borderWidth: 0.5, borderColor: colors.outlinevariant, backgroundColor: colors.surfacecontainer
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginBottom: 15, marginTop: 10 }}>
                        <Text style={{ ...style.text, fontWeight: 600 }}>Total Harga</Text>

                        <Text style={{ ...style.text, color: colors.secondary, fontWeight: 500 }}>Rp {formatRupiah(total(selectedVariants))}</Text>
                    </View>
                    <Pressable style={{ backgroundColor: colors.primary, padding: 15, borderRadius: 30, position: 'relative', width: '90%', marginBottom: 25 }}
                        onPress={handleAddContents}>
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
    },
    dropdown:{
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
    }
};
