import { View, Text, Pressable, TextInput, StatusBar, Image, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';



export default function HistoryDetail({navigation, route}) {
    const nav = useNavigation();
    const [step, setStep] = useState(false);
    const [load, setLoad] = useState(false);
    const [data, setData] = useState(null);

// 



 


    const formatVal= (str) =>{
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
            if (item.val == 'booking_area_pemakaman' || item.val == 'perlengkapan_pemakaman' || item.val == 'sarana_prasarana_pemakaman'){
                item.id.forEach(subitem => {
                    total += subitem.price;
                });
            } else if (item.val == 'konseling_mental'){
                total += 0;
            } else {
                total += item.id.total;
            }
            
        })
        return total;
    }

    const formatDate =() => {
        const date = new Date();
        const day = date.getUTCDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getUTCFullYear();

        const hour = date.getHours();
        const minute = date.getMinutes();
        return `${day} ${month} ${year} - ${hour}:${minute}` ;
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

        <View style={style.container}>

                <View>
                <ScrollView style={{backgroundColor: colors.surfacecontainer, padding: 30, paddingTop: 40}}>

                    <Text style={{ ...style.h1, color: colors.onsurface, marginBottom: 30 }}>Detail Pemesanan</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={{ ...style.text, color: colors.onsurface }}>Kode Pembayaran</Text>
                        <Text style={{ ...style.text, color: colors.onsurface }}>{route.params.item.id}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={{ ...style.text, color: colors.onsurface }}>Tanggal Pembayaran</Text>
                        <Text style={{ ...style.text, color: colors.onsurface }}>{formatDate(route.params.item.created_at)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={{ ...style.text, color: colors.onsurface }}>Status</Text>
                        <Text style={{ ...style.text, color: colors.onsurface }}>
                            {route.params.item.status == false ? 'Menunggu Pembayaran' : 'Berhasil'}
                        </Text>
                        </View>
                        <Text style={{ ...style.h2, color: colors.onsurface, marginBottom: 10, marginTop:10, paddingTop: 10, borderTopWidth: 1,  borderColor: colors.outlinevariant, fontSize: 17 }}>Rincian</Text>
                    
                    {(route.params.item.rincian).map((item, index) => (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Text style={{ ...style.text, color: colors.onsurface }}>{item.name}</Text>
                            <Text style={{ ...style.text, color: colors.onsurface }}>Rp {formatRupiah(item.price)}</Text>
                        </View>
                    ))} 
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={{ ...style.text, color: colors.onsurface, fontWeight: 500 }}>Total</Text>
                        <Text style={{ ...style.text, color: colors.onsurface, fontWeight: 500 }}>Rp {formatRupiah(route.params.item.total)}</Text>
                    </View>
                    <View style={{borderWidth: 1, borderColor: colors.outlinevariant, borderRadius: 10, padding: 15, marginTop: 30}}>
                        <View>
                        <Text style={style.label}>Kontak Pemesan</Text>
                        <Text style={{...style.box}}>{route.params.item.kontak}</Text>
                        </View>
                        <View>
                        <Text style={style.label}>Nama Pengguna Layanan</Text>
                        <Text style={{...style.box}}>{route.params.item.name}</Text>
                        </View>
                        <View>
                        <Text style={style.label}>Alamat Pengguna Layanan</Text>
                        <Text style={{...style.box}}>{route.params.item.alamat}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}} >
                        <View style={{width: '48%'}}>
                        <Text style={style.label}>Kecamatan</Text>
                        <Text style={{...style.box, width: '100%'}}>{route.params.item.kecamatan}</Text>
                        </View>
                        <View style={{width: '48%'}}>
                        <Text style={style.label}>Kota</Text>
                        <Text style={{...style.box, width: '100%'}}>{route.params.item.kota}</Text>
                        </View>
                        
                        
                    </View>
                    <View>
                        <Text style={style.label}>Catatan</Text>
                        <Text style={{...style.box}}>{route.params.item.notes}</Text>
                        </View>
                    
                    

                </View>
                <View style={{height: 250}}></View>
                </ScrollView>
                <View style={{bottom: 0, zIndex: 100, position: 'absolute', width:'100%', alignItems: 'center', borderTopStartRadius: 40, borderTopRightRadius: 40, borderWidth: 0.5, borderColor: colors.outlinevariant, backgroundColor: colors.surfacecontainer
                
                }}>
                <Pressable style={{ backgroundColor: colors.primary, padding: 15, borderRadius: 30, position: 'relative', width: '90%', marginBottom:25, marginTop: 15 }}
                onPress={() => 
                    navigation.goBack()
                }>
                    <Text style={{ color: colors.surfacecontainer, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Kembali</Text>
                </Pressable>
                </View>
                </View>
                

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
    }, box:{
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
    }, label:{
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