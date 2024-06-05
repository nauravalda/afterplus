import { View, Text, Pressable, TextInput, StatusBar, Image, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useBooking, deleteBookingData } from './booking-context';
import { ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useUser } from '../auth/user-context';



export default function Payment() {
    const navigation = useNavigation();
    const { addedContents, setAddedContents } = useBooking();
    const [step, setStep] = useState(false);
    const [load, setLoad] = useState(false);
    const [data, setData] = useState(null);
    const { user } = useUser();

    const getIdsByVal = (val) => {
        const item = addedContents.find((item) => item.val === val);
        return item ? item.id : [];
    }
    const totalAdded = () => {
        let total = 0;
        addedContents['booking'].forEach(item => {
            if (item.val == 'booking_area_pemakaman' || item.val == 'perlengkapan_pemakaman' || item.val == 'sarana_prasarana_pemakaman') {
                total += item.id.length;
            } else if (item.val == 'konseling_mental') {
                total += item.id.contact != '' ? 1 : 0;
            } else {
                total += item.id.id.length;
            }

        });
        return total;
    }

    useEffect(() => {
        const fetchServicesData = async () => {
            console.log(addedContents['booking'])

            const { data, error } = await supabase
                .from('services')
                .select('*')
            if (error) {
                console.log(error);
            }
            var newData = []
            addedContents['booking'].forEach(item => {
                if (item.val == 'booking_area_pemakaman' || item.val == 'perlengkapan_pemakaman' || item.val == 'sarana_prasarana_pemakaman') {
                    item.id.forEach(subitem => {
                        // find in data by id
                        const index = data.findIndex(x => x.id === subitem.id);
                        newData.push({ id: subitem.id, name: data[index].nama_produk, price: subitem.price, variant: subitem.desc, val: item.val });



                    });
                } else if (item.val == 'konseling_mental') {
                    if (item.id.contact != '') {
                        newData.push({ id: item.id, name: 'Konseling Mental', price: 0, variant: item.id.contact, date: item.id.date, rangetime: item.id.rangetime, contact: item.id.contact, notes: item.id.notes, val: item.val });
                    }
                } else {
                    item.id.id.forEach(subitem => {
                        // find in data by val
                        const index = data.findIndex(x => x.kategori === item.val);
                        const variant = data[index].varian.split(', ');
                        const price = data[index].harga.split(', ');
                        if (item.val == 'pengurus_jenazah' || item.val == 'upacara_pemakaman') {
                            newData.push({ id: subitem, name: variant[subitem], price: price[subitem], variant: variant[subitem], val: item.val });
                        } else if (item.val == 'acara_peringatan') {
                            newData.push({ id: subitem, name: variant[subitem], price: price[subitem], variant: variant[subitem], alamat: item.id.alamat_lengkap, kecamatan: item.id.kecamatan, kota: item.id.kota, val: item.val });
                        } else if (item.val == 'perawatan_makam') {
                            newData.push({ id: subitem, name: variant[subitem], price: price[subitem], variant: variant[subitem], alamat: item.id.alamat_lengkap, kecamatan: item.id.kecamatan, kota: item.id.kota, val: item.val });
                        }





                    });
                }
            })
            setData(newData);

        }
        fetchServicesData();
    }, []);

    // 


    const deleteBookingData = () => {
        const newContents = {
            'booking': [
                {
                    val: 'booking_area_pemakaman',
                    id: [],
                },
                {
                    val: 'perlengkapan_pemakaman',
                    id: [],
                },
                {
                    val: 'sarana_prasarana_pemakaman',
                    id: [],
                },
                {
                    val: 'pengurus_jenazah',
                    id: {
                        id: [],
                        total: 0
                    }
                },
                {
                    val: 'upacara_pemakaman',
                    id: {
                        id: [],
                        total: 0
                    },
                },
                {
                    val: 'acara_peringatan',
                    id: {
                        id: [],
                        total: 0,
                        alamat_lengkap: '',
                        kecamatan: '',
                        kota: '',
                    },
                },
                {
                    val: 'perawatan_makam',
                    id: {
                        id: [],
                        total: 0,
                        alamat_lengkap: '',
                        kecamatan: '',
                        kota: '',
                    },
                },
                {
                    val: 'konseling_mental',
                    id: {
                        id: [],
                        date: '',
                        rangetime: '',
                        contact: '',
                        notes: ''
                    },
                }
            ],
            'serviceuser': {
                contact: '',
                name: '',
                address: '',
                district: '',
                city: '',
                notes: ''
            }
        };
        setAddedContents(newContents);
    }

    const handlePayment = () => {
        // setStep(true);
        sendBookingData(data);
        setLoad(true);
        load5sec();
        setStep(true);
    }

    const sendBookingData = async (rincian) => {
        console.log("TESTING DATA")
        console.log(JSON.stringify(rincian))
        const { data, error } = await supabase
            .from('booking')
            .insert([
                {
                    status: true,
                    total: totalAddedPrice(),
                    user: user.id,
                    kontak: addedContents['serviceuser'].contact,
                    name: addedContents['serviceuser'].name,
                    alamat: addedContents['serviceuser'].address,
                    kecamatan: addedContents['serviceuser'].district,
                    kota: addedContents['serviceuser'].city,
                    rincian: JSON.stringify(rincian),
                    notes: addedContents['serviceuser'].notes
                }
            ])
        if (error) {
            console.log(error);
            navigation.navigate('payment');

            return;
        }
    }

    const load5sec = () => {
        setTimeout(() => {
            setLoad(false);
        }, 5000);
    }

    formatVal = (str) => {
        array = str.split('_');
        newStr = '';
        array.forEach(word => {
            newStr += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
        });
        return newStr;
    }
    const totalAddedPrice = () => {
        let total = 0;
        addedContents['booking'].forEach(item => {
            if (item.val == 'booking_area_pemakaman' || item.val == 'perlengkapan_pemakaman' || item.val == 'sarana_prasarana_pemakaman') {
                item.id.forEach(subitem => {
                    total += subitem.price;
                });
            } else if (item.val == 'konseling_mental') {
                total += 0;
            } else {
                total += item.id.total;
            }

        })
        return total;
    }

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


    return (
        data === null ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
                <ActivityIndicator size="large" color={colors.background} />
            </View> :
            <View style={style.container}>
                {step ? (
                    <View>
                        {load ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.surfacecontainer }}>
                                <ActivityIndicator size="large" color={colors.primary} />
                            </View>
                        ) :

                            (
                                <View>
                                    <ScrollView style={{ backgroundColor: colors.surfacecontainer, padding: 30, paddingTop: 40 }}>

                                        <Text style={{ ...style.h1, color: colors.onsurface, marginBottom: 30 }}>Pembayaran Berhasil!</Text>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                            <Text style={{ ...style.text, color: colors.onsurface }}>Kode Pembayaran</Text>
                                            <Text style={{ ...style.text, color: colors.onsurface }}>1234567890</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                            <Text style={{ ...style.text, color: colors.onsurface }}>Tanggal Pembayaran</Text>
                                            <Text style={{ ...style.text, color: colors.onsurface }}>12/12/2021</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                            <Text style={{ ...style.text, color: colors.onsurface }}>Status</Text>
                                            <Text style={{ ...style.text, color: colors.onsurface }}>Berhasil</Text>
                                        </View>
                                        <Text style={{ ...style.h2, color: colors.onsurface, marginBottom: 10, marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderColor: colors.outlinevariant, fontSize: 17 }}>Rincian</Text>

                                        {data.map((item, index) => (
                                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                                <Text style={{ ...style.text, color: colors.onsurface }}>{item.name}</Text>
                                                <Text style={{ ...style.text, color: colors.onsurface }}>Rp {formatRupiah(item.price)}</Text>
                                            </View>
                                        ))}

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                            <Text style={{ ...style.text, color: colors.onsurface, fontWeight: 500 }}>Total</Text>
                                            <Text style={{ ...style.text, color: colors.onsurface, fontWeight: 500 }}>Rp {formatRupiah(totalAddedPrice())}</Text>
                                        </View>
                                        <View style={{ borderWidth: 1, borderColor: colors.outlinevariant, borderRadius: 10, padding: 15, marginTop: 30 }}>
                                            <View>
                                                <Text style={style.label}>Kontak Pemesan</Text>
                                                <Text style={{ ...style.box }}>{addedContents['serviceuser'].contact}</Text>
                                            </View>
                                            <View>
                                                <Text style={style.label}>Nama Pengguna Layanan</Text>
                                                <Text style={{ ...style.box }}>{addedContents['serviceuser'].name}</Text>
                                            </View>
                                            <View>
                                                <Text style={style.label}>Alamat Pengguna Layanan</Text>
                                                <Text style={{ ...style.box }}>{addedContents['serviceuser'].address}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
                                                <View style={{ width: '48%' }}>
                                                    <Text style={style.label}>Kecamatan</Text>
                                                    <Text style={{ ...style.box, width: '100%' }}>{addedContents['serviceuser'].district}</Text>
                                                </View>
                                                <View style={{ width: '48%' }}>
                                                    <Text style={style.label}>Kota</Text>
                                                    <Text style={{ ...style.box, width: '100%' }}>{addedContents['serviceuser'].city}</Text>
                                                </View>


                                            </View>

                                            <View>
                        <Text style={style.label}>Catatan</Text>
                        <Text style={{...style.box}}>{addedContents['serviceuser'].notes}</Text>
                        </View>



                                        </View>
                                        <View style={{ height: 250 }}></View>
                                    </ScrollView>
                                    <View style={{
                                        bottom: 0, zIndex: 100, position: 'absolute', width: '100%', alignItems: 'center', borderTopStartRadius: 40, borderTopRightRadius: 40, borderWidth: 0.5, borderColor: colors.outlinevariant, backgroundColor: colors.surfacecontainer

                                    }}>
                                        <Pressable style={{ backgroundColor: colors.primary, padding: 15, borderRadius: 30, position: 'relative', width: '90%', marginBottom: 25, marginTop: 15 }}
                                            onPress={() => {
                                                deleteBookingData();
                                                navigation.navigate('beranda');

                                            }
                                            }>
                                            <Text style={{ color: colors.surfacecontainer, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Kembali ke beranda</Text>
                                        </Pressable>
                                    </View>
                                </View>


                            )}
                    </View>
                ) :
                    (
                        <View style={style.container}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                                <Icon
                                    color={colors.surfacecontainer}
                                    name="west"
                                    size={24}
                                    type="material"
                                    style={{ alignSelf: 'flex-start', marginRight: 10 }}
                                    onPress={() => navigation.goBack()}
                                />

                            </View>
                            <Text style={{ ...style.text, color: colors.surfacecontainer, justifyContent: 'center', alignSelf: 'center' }}>Total Tagihan</Text>
                            <Text style={{ ...style.h1, color: colors.surfacecontainer, alignSelf: 'center' }}>Rp {formatRupiah(totalAddedPrice())}</Text>




                            <ScrollView style={{ ...style.scrollable, flex: 1 }} nestedScrollEnabled={true}>
                                <View style={{ padding: 20, paddingTop: 30 }}>
                                    <Text style={{ ...style.h2, color: colors.onsurface, marginBottom: 20 }}>Rincian Tagihan</Text>

                                    {data.map((item, index) => (
                                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                            <Text style={{ ...style.text, color: colors.onsurface }}>{item.name}</Text>
                                            <Text style={{ ...style.text, color: colors.onsurface }}>Rp {formatRupiah(item.price)}</Text>
                                        </View>
                                    ))}

                                    <View style={{ borderWidth: 1, borderColor: colors.outlinevariant, borderRadius: 10, padding: 15, marginTop: 30 }}>
                                        <View>
                                            <Text style={style.label}>Kontak Pemesan</Text>
                                            <Text style={{ ...style.box }}>{addedContents['serviceuser'].contact}</Text>
                                        </View>
                                        <View>
                                            <Text style={style.label}>Nama Pengguna Layanan</Text>
                                            <Text style={{ ...style.box }}>{addedContents['serviceuser'].contact}</Text>
                                        </View>
                                        <View>
                                            <Text style={style.label}>Alamat Pengguna Layanan</Text>
                                            <Text style={{ ...style.box }}>{addedContents['serviceuser'].address}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
                                            <View style={{ width: '48%' }}>
                                                <Text style={style.label}>Kecamatan</Text>
                                                <Text style={{ ...style.box, width: '100%' }}>{addedContents['serviceuser'].district}</Text>
                                            </View>
                                            <View style={{ width: '48%' }}>
                                                <Text style={style.label}>Kota</Text>
                                                <Text style={{ ...style.box, width: '100%' }}>{addedContents['serviceuser'].city}</Text>
                                            </View>

                                        </View>
                                        <View>
                        <Text style={style.label}>Catatan</Text>
                        <Text style={{...style.box}}>{addedContents['serviceuser'].notes}</Text>
                        </View>

                                    </View>

                                    <View style={{ borderTopWidth: 1, marginTop: 50, borderColor: colors.outlinevariant }}>
                                        <Text style={{ fontSize: 14, marginTop: 20, fontWeight: 500, marginBottom: 5 }}>Scan QR code di bawah untuk pembayaran!</Text>
                                        <Text style={{ fontSize: 12, color: colors.outline }}>Tekan tombol lanjut jika sudah menyelesaikan pembayaran. Kami akan melakukan verifikasi.</Text>
                                        <View style={{ alignItems: 'center', backgroundColor: 'white', width: 220, height: 220, alignSelf: 'center', justifyContent: 'center', borderRadius: 20, marginTop: 10 }}>
                                            <Image source={require('./../../assets/QR.png')} style={{ width: 200, height: 200, alignSelf: 'center' }} />
                                        </View>
                                    </View>

                                </View>
                                <View style={{ height: 100 }}></View>
                            </ScrollView>

                            <View style={{
                                bottom: 0, zIndex: 100, position: 'absolute', width: '100%', alignItems: 'center', borderTopStartRadius: 40, borderTopRightRadius: 40, borderWidth: 0.5, borderColor: colors.outlinevariant, backgroundColor: colors.surfacecontainer

                            }}>
                                <Pressable style={{ backgroundColor: colors.primary, padding: 15, borderRadius: 30, position: 'relative', width: '90%', marginBottom: 25, marginTop: 15 }}
                                    onPress={handlePayment}>
                                    <Text style={{ color: colors.surfacecontainer, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Lanjut</Text>
                                </Pressable>
                            </View>





                        </View>
                    )}
            </View>
    )
}

const style = {
    container: {
        backgroundColor: colors.primary,
        flex: 1,

    },
    h1: {
        fontSize: 28,
        marginBottom: 10,
        marginTop: 5,
        fontWeight: 700,
    }, text: {
        fontSize: 14,
        color: colors.onsurfacevariant,
        fontWeight: 400,
    }, h2: {
        fontSize: 18,
        fontWeight: 600,
    }, h3: {
        fontSize: 15,
        fontWeight: 600,
    },
    scrollable: {
        backgroundColor: colors.surfacecontainer,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 20,
        height: '100%',
    }, box: {
        height: 50,
        borderColor: colors.outlinevariant,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 16,
        fontSize: 16,
        width: '100%',
        margin: 5,
        paddingVertical: 15
    }, label: {
        position: 'absolute',
        backgroundColor: colors.surfacecontainer,
        top: -4,
        left: 10,
        zIndex: 100,
        padding: 3,
        fontSize: 12,
        color: colors.outline,
    }


}