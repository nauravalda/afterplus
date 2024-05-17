import { View, Text, Pressable, TextInput, StatusBar, Image } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { shadow } from 'react-native-paper';
import { useBooking } from './booking-context';

const options = [
    {
        label: 'Layanan Sebelum Pemakaman',
        value: 'layanan_sebelum_pemakaman',
        contents: [
            {
                label: 'Booking Area Pemakaman',
                value: 'booking_area_pemakaman',
                desc: 'Pesan area pemakaman yang diinginkan',
                icon: require('./../../assets/booking_area_pemakaman.png')
            },
            {
                label: 'Perlengkapan Pemakaman',
                value: 'perlengkapan_pemakaman',
                desc: 'Siapkan alat peti mati, kain kafan, dan perlengkapan lainnya',
                icon: require('./../../assets/perlengkapan_pemakaman.png')
            }
        ]

    },
    {
        label: 'Layanan Saat Pemakaman',
        value: 'layanan_saat_pemakaman',
        contents: [
            {
                label: 'Sarana Prasarana Pemakaman',
                value: 'sarana_prasarana_pemakaman',
                desc: 'Sewa sarana prasarana untuk memakamkan',
                icon: require('./../../assets/sarana_prasarana_pemakaman.png')
            },
            {
                label: 'Pengurus Jenazah',
                value: 'pengurus_jenazah',
                desc: 'Sewa pengurus jenazah profesional',
                icon: require('./../../assets/pengurus_jenazah.png')
            },
            {
                label: 'Upacara Pemakaman',
                value: 'upacara_pemakaman',
                desc: 'Layanan upacara dan penguburan jenazah',
                icon: require('./../../assets/upacara_pemakaman.png')
            }
        ]
    },
    {
        label: 'Layanan Pasca Pemakaman',
        value: 'layanan_pasca_pemakaman',
        contents: [
            {
                label: 'Acara Peringatan',
                value: 'acara_peringatan',
                desc: 'Siapkan acara pelepasan untuk peringatan orang yang telah meninggal',
                icon: require('./../../assets/acara_peringatan.png')
            },
            {
                label: 'Perawatan Makam',
                value: 'perawatan_makam',
                desc: 'Pemeliharaan lahan kuburan dan penataan taman makam',
                icon: require('./../../assets/perawatan_makam.png')
            },
            {
                label: 'Konseling Mental',
                value: 'konseling_mental',
                desc: 'Konselor atau terapis yang dapat membantu keluarga yang berduka untuk mengatasi kesedihan dan trauma yang terkait dengan kehilangan',
                icon: require('./../../assets/konseling_mental.png')
            }

        ]
    }
]
export default function Options() {
    const navigation = useNavigation();
    const { addedContents, setAddedContents } = useBooking();
    const getIdsByVal = (val) => {
        const item = addedContents.find((item) => item.val === val);
        return item ? item.id : [];
    }
    return (
        <View style={style.container}>
            <StatusBar backgroundColor={colors.surfacecontainer} barStyle="dark-content" />
            <Icon
                color={colors.primary}
                containerStyle={{}}
                disabledStyle={{}}
                iconProps={{}}
                iconStyle={{}}
                name="west"
                size={24}
                type="material"
                style={{ alignSelf: 'flex-start', marginLeft: 20, marginTop: 20 }}
                onPress={() => navigation.goBack()}
            />
            <ScrollView>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={style.h1}>Isi Layanan yang Diinginkan</Text>
                    <Text style={{ ...style.text, marginBottom: 20 }}>Isi layanan pemakaman yang kamu butuhkan. Kamu dapat mengisi satu hingga semua layanan berbeda.</Text>
                </View>
                <View style={{ alignSelf: 'center', width: '90%' }}>
                    {options.map((item, index) => {
                        const [isPressed, setIsPressed] = useState(false);
                        return (

                            <View key={index} style={style.option}>
                                <Pressable style={{
                                    padding: 10,
                                    marginBottom: 20,
                                    borderBottomWidth: 1,
                                    borderColor: colors.outlinevariant,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}
                                    onPress={() => setIsPressed(!isPressed)}
                                >
                                    <Text style={style.h2}>{item.label}</Text>
                                    {isPressed ?
                                        (<Icon
                                            color={'black'}
                                            containerStyle={{}}
                                            disabledStyle={{}}
                                            iconProps={{}}
                                            iconStyle={{}}
                                            name="arrow-drop-up"
                                            size={24}
                                            type="material"
                                            style={{ alignSelf: 'flex-start' }}
                                        />) :
                                        (<Icon
                                            color={'black'}
                                            containerStyle={{}}
                                            disabledStyle={{}}
                                            iconProps={{}}
                                            iconStyle={{}}
                                            name="arrow-drop-down"
                                            size={24}
                                            type="material"
                                            style={{ alignSelf: 'flex-start' }}
                                        />)
                                    }

                                </Pressable>

                                {isPressed ?
                                    (item.contents.map((content, index) => (
                                        <Pressable key={index} style={style.sub_option}
                                            onPress={() => navigation.navigate('booking_area_pemakaman')}
                                        >
                                            <Image source={content.icon} style={style.sub_option_img} />
                                            <View style={{ flex: 1 }}>
                                                <Text style={style.h3}>{content.label}</Text>
                                                <Text style={style.text} numberOfLines={2} >{content.desc}</Text>
                                            </View>
                                            {getIdsByVal(content.value).length > 0 ? (
                                                <View style={{left:10}}>
                                                <View style={{
                                                    width: 36,
                                                    height: 44,
                                                    backgroundColor: colors.primary,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignSelf: 'flex-end',
                                                    borderTopEndRadius: 15,
                                                    borderTopStartRadius: 15,

                                                }}>
                                                    <Text style={{color: colors.surfacecontainer, fontWeight: 500}}>{getIdsByVal(content.value).length}</Text>

                                                    
                                                    </View>
                                                    <View style={{
                                                    width: 36,
                                                    height: 36,
                                                    backgroundColor: colors.primary,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignSelf: 'flex-end',
                                                    borderBottomEndRadius: 15,

                                                }}>
                                                    <Icon
                                                        color={colors.surfacecontainer}
                                                        containerStyle={{}}
                                                        disabledStyle={{}}
                                                        iconProps={{}}
                                                        iconStyle={{}}
                                                        name="east"
                                                        size={20}
                                                        type="material"
                                                    />
                                                    </View>
                                                
                                                </View>
                                            ) : (
                                                <View style={{
                                                    width: 36,
                                                    height: 36,
                                                    backgroundColor: colors.primary,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignSelf: 'flex-end',
                                                    left: 10,
                                                    top: 10,
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
                                                        type="material" />
                                                </View>

                                            )}

                                        </Pressable>
                                    ))) : (null)
                                }
                            </View>
                        )
                    }
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

const style = {
    container: {
        backgroundColor: colors.surfacecontainer,
        flex: 1,

    },
    h1: {
        fontSize: 22,
        marginBottom: 10,
        marginTop: 20,
        fontWeight: 700,
    }, text: {
        fontSize: 13,
        color: colors.onsurfacevariant,
        fontWeight: 400,
    }, h2: {
        fontSize: 14,
        fontWeight: 600,
    }, h3: {
        fontSize: 15,
        fontWeight: 600,
    }, sub_option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 80,
        backgroundColor: colors.surfacecontainer,
        marginBottom: 10,
        borderRadius: 15,
        shadowColor: colors.onsurface,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }, sub_option_img: {
        width: 40,
        height: 40,
        marginRight: 10,

    }


}