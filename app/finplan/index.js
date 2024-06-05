import {View, Text, Pressable, TextInput, StatusBar, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import { colors } from '../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { supabase } from '../../lib/supabase';
import { useUser } from '../auth/user-context';
import { useNavigation } from '@react-navigation/native';







export default function Finplan() {
    const [activeButton, setActiveButton] = useState('berjalan');
    const navigation = useNavigation();

    
    const { user } = useUser();
    const [pesanan_berjalan, setPesananBerjalan] = useState([]);
    const [pesanan_selesai, setPesananSelesai] = useState([]);
    const handlePress = (button) => {
        setActiveButton(button);
    }
    useEffect(() => {
        const fetchBooking = async () => {
            const { data, error } = await supabase
                .from('booking')
                .select('*')
                .eq('user', user.id)
            if (error) {
                console.log(error);
            }
            console.log(data);
            data.map(item => {
                item.rincian = JSON.parse(item.rincian);
                console.log(item.rincian);
            });

            const berjalan = data.filter(item => item.selesai === false);
            const selesai = data.filter(item => item.selesai === true);
            setPesananBerjalan(berjalan);
            setPesananSelesai(selesai);
        }
        fetchBooking();
    }
    , [])

    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = date.getUTCDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getUTCFullYear();
    
        return `${day} ${month} ${year}`;
    }

    function generateContent(rincian) {
        let title = '';
        rincian.map((item, index) => {
            title += item.name;
            if (index < rincian.length - 1) {
                title += ', ';
            }
        });
        // split for 100 characters
        if (title.length > 90) {
            title = title.substring(0, 90) + '...';
        }
        return title;
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
                    <Pressable key={index} style={style.feed}
                    onPress={() => navigation.navigate('historydetail', {item: item})}
                    >
                        <View style={{padding: 15, width: '100%'}}>
                            <Text style={style.feed_title}>{(item.name)}</Text>
                            <Text style={style.feed_content}>{generateContent(item.rincian)}</Text>
                            <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginTop: 5}}>
                            <Text style={{color: colors.outline, fontSize: 12}}>Order date:   </Text>
                            <Text style={style.feed_date}>{formatDate(item.created_at)}</Text>
                            </View>
                        </View>
                    </Pressable>
                )) : pesanan_selesai.map((item, index) => (
                    <Pressable key={index} style={style.feed}
                    onPress={() => navigation.navigate('historydetail', {item: item})}>
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