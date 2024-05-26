import {View, Text, Pressable, TextInput, StatusBar, Image} from 'react-native';
import React, {useState} from 'react';
import { colors } from '../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';


// dummy data
const pesanan_selesai = [
    {
        kode: 'Pemakaman',
        content: 'Mobil jenazah, keranda, kain kafan, pengurus jenazah, ...',
        orderdate: '12/12/2023',
    },
    {
        kode: 'Perawatan Makam',
        content: 'Pemasangan tembok, penghijauan rumput, penambahan tanaman',
        orderdate: '20/12/2023',
    },
    {
        kode: 'Konseling Mental',
        content: 'Konseling pada tanggal 15 Desember 2023 secara virtual.',
        orderdate: '12/12/2023',
    }
]

const pesanan_berjalan = [
    { 
        kode: 'Pemakaman',
        content: 'Area pemakaman, kain kafan',
        orderdate: '02/01/2024',
    },

]




export default function Finplan() {
    const [activeButton, setActiveButton] = useState('berjalan');

    const handlePress = (button) => {
        setActiveButton(button);
    }
    return (
        <View style={style.container}>
            <StatusBar backgroundColor={colors.surfacecontainer} barStyle="dark-content" />
            <Image source={require('./../../assets/after-txt-red.png')} style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginBottom: 24, width:70, height:20 }}/>
            <Text style={style.h1}>Pesananmu</Text>
            <View style={{ flexDirection: 'row', marginBottom: 24, marginTop: 20}}>
                <Pressable style={{width: '50%', alignItems: 'center', backgroundColor: activeButton === 'berjalan' ? colors.secondarycontainer : 'transparent', height: 48, justifyContent: 'center', borderTopLeftRadius: 50, borderBottomLeftRadius: 50, borderWidth: 1, borderColor: colors.outline}}
                            onPress={() => handlePress('berjalan')}>
                    <Text style={style.segmented_text}>Berjalan</Text>
                </Pressable>
                <Pressable style={{width: '50%', alignItems: 'center', backgroundColor: activeButton === 'selesai' ? colors.secondarycontainer : 'transparent', height: 48, justifyContent: 'center', borderTopRightRadius: 50, borderBottomRightRadius: 50, borderWidth: 1, borderColor: colors.outline}}
                            onPress={() => handlePress('selesai')}>
                    <Text style={style.segmented_text}>Selesai</Text>
                </Pressable>
            </View>
            <ScrollView>
                {activeButton === 'berjalan' ? pesanan_berjalan.map((item, index) => (
                    <Pressable key={index} style={style.feed}>
                        <View style={{padding: 15, width: '100%'}}>
                            <Text style={style.feed_title}>{item.kode}</Text>
                            <Text style={style.feed_content}>{item.content}</Text>
                            <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginTop: 5}}>
                            <Text style={{color: colors.outline, fontSize: 12}}>Order date:   </Text>
                            <Text style={style.feed_date}>{item.orderdate}</Text>
                            </View>
                        </View>
                    </Pressable>
                )) : pesanan_selesai.map((item, index) => (
                    <Pressable key={index} style={style.feed}>
                        <View style={{padding: 15, width: '100%'}}>
                            <Text style={style.feed_title}>{item.kode}</Text>
                            <Text style={style.feed_content}>{item.content}</Text>
                            <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginTop: 5}}>
                            <Text style={{color: colors.outline, fontSize: 12}}>Order date:   </Text>
                            <Text style={style.feed_date}>{item.orderdate}</Text>
                            </View>
                        </View>
                    </Pressable>
                ))    
                }
            </ScrollView>
        </View>
    );
}

const style = {
    container:{
        backgroundColor: colors.surfacecontainer,
        flex: 1,
        padding: 20,
        
    }, h1:{
        fontSize: 17,
        fontWeight: 500,

    }, feed:{
        backgroundColor: colors.primarycontainer,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    }, feed_title:{
        fontSize: 15,
        fontWeight: 500,
    }, feed_content:{
        borderTopWidth: 0.5,
        borderColor: colors.outline,
        fontSize: 13,
        fontWeight: 400,
        color: colors.onsurfacevariant,
        width: '100%',
        paddingTop: 8,
        marginTop: 4,
    }, segmented_text:{
        fontSize: 15,
        fontWeight: 500,
        color: colors.onsurfacevariant,
    }, feed_date:{
        fontSize: 12,
        color: colors.primary,
        fontWeight: 500,
    }

}