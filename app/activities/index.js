import {View, Image, Text, Pressable, ScrollView} from 'react-native';
import React, {useState} from 'react';
import { SectionList } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';

// dummy data for testing (in one day, there are several activities that can be done like cooking in 08.00-09.00, meeting in 10.00-11.00, etc.)
const activities = [
    {
        id: '1',
        time: '08.00',
        title: 'Sarapan pagi!',
        desc: 'Masak telor dadar pedas',
        category: 'daily',
        date: '1',
        tags: 'Masak'
    },
    {
        time: '10.00',
        title: 'Laundry',
        desc: 'Antar laundry ke Jl. Kaliurang km 5',
        category: 'daily',
        date: '1',
        tags: 'Bersih-bersih'
    },
    {
        time: '13.00',
        title: 'Membaca buku',
        desc: 'Baca buku novel di taman',
        category: 'daily',
        date: '1',
        tags: 'Hobi'
    }, 
    {
        time: '16.00',
        title: 'Urus Perpindahan nama rumah',
        desc: 'Urus perpindahan nama rumah ke notaris ',
        category: 'important',
        date: '1',
        tags: 'Penting'
    },
    {
        time: '18.00',
        title: 'Menyapu rumah',
        desc: 'Sapu lantai dan bersihkan kamar mandi',
        category: 'daily',
        date: '1',
        tags: 'Bersih-bersih'
    }
];

const today = new Date().getDate();
const current_time = '08.00';



export default function Activities() {
    const navigation = useNavigation();
        return (
            <View style={style.container}>
                <ScrollView>
                <View style={style.calendar}>
                    <ScrollView>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                        <Pressable style={style.day}>
                            <Text style={style.font_day}>1</Text>
                        </Pressable>

                        <View>
                            
                            
                                {activities.map((activity, index) => {
                                    if (activity.time == current_time){
                                        return (
                                            <Pressable key={index} style={{...style.activity, backgroundColor: '#FFFFFF'}}
                                            onPress={() => navigation.navigate('detail', {activity: activity})}
                                            >
                                                <Text style={style.title}>{activity.title}</Text>
                                                <View style={{flexDirection: 'row'}}>
                                                <Text style={style.desc}>{activity.time}</Text>
                                                <Text> </Text>
                                                <Text> - </Text>
                                                <Text> </Text>
                                                <Text style={style.desc}>{activity.desc}</Text>
                                                </View>
                                            </Pressable>
                                        )
                                    }
                                    else if (activity.category == 'important'){
                                        return (
                                            <Pressable key={index} style={{...style.activity, backgroundColor: '#D9E2FF'}}
                                            onPress={() => navigation.navigate('detail', {activity: activity})}
                                            >
                                                <Text style={style.title}>{activity.title}</Text>
                                                <View style={{flexDirection: 'row'}}>
                                                <Text style={style.desc}>{activity.time}</Text>
                                                <Text> </Text>
                                                <Text> - </Text>
                                                <Text> </Text>
                                                <Text style={style.desc}>{activity.desc}</Text>
                                                </View>
                                            </Pressable>
                                        )
                                    }
                                    return (

                                        <Pressable key={index} style={style.activity}
                                        onPress={() => navigation.navigate('detail', {activity: activity})}
                                        >
                                            <Text style={style.title}>{activity.title}</Text>
                                            <View style={{flexDirection: 'row'}}>
                                            <Text style={style.desc} numberOfLines={2}>{activity.time}</Text>
                                            <Text> </Text>
                                            <Text> - </Text>
                                            <Text> </Text>
                                            <Text style={style.desc}>{activity.desc}</Text>
                                            </View>
                                        </Pressable>
                                    )
                                })}

                        </View>
                    </View>
                    </ScrollView>

                </View>
                <Pressable style={{...style.med_card, backgroundColor: '#008673'}}>
                        <Image source={require('./../../assets/activity-1.png')}
                        style={{width: 80, height: 80, paddingLeft: 20}}
                         />
                        <View style={{flexDirection: 'column', paddingLeft:20,}}>
                        <Text style={{...style.title, color: '#FFFFFF'}}>Ingin tambah aktivitas baru?</Text>
                        <Text style={{...style.desc, color: '#EFE0CF'}}>Tambahkan aktivitas baru pada jadwal aktivitasmu sehari-hari!</Text>
                        </View>
                        
                </Pressable>

                <Pressable style={style.med_card}>
                        
                        <View style={{flexDirection: 'column', marginLeft:20,}}>
                        <Text style={style.title}>Belum mengurus perpindahan?</Text>
                        <Text style={style.desc}>Urus perpindahan harta dan warisan lebih mudah bersama kami!</Text>
                        </View>
                        <Image source={require('./../../assets/activity-2.png')}
                        style={{width: 80, height: 80, marginLeft:20}}
                         />
                        
                </Pressable>

                <Pressable style={style.med_card}>
                        
                        <View style={{flexDirection: 'column', marginLeft:20,}}>
                        <Text style={style.title}>Keuangan bulan ini!</Text>
                        <Text style={style.desc}>Kamu belum mengurus keuangan bulan ini! Ayo cek segera</Text>
                        </View>
                        <Image source={require('./../../assets/activity-3.png')}
                        style={{width: 80, height: 80, marginLeft:70}}
                         />
                        
                </Pressable>

                <View style={style.large_card}>
                    <Image source={require('./../../assets/activity-4.png')} style={{width:210, height:210}}/>

                        <View style={{flexDirection: 'column',}}>
                        <Text style={style.h2}>Bosan?</Text>
                        <Text style={{...style.desc, maxWidth:100}}>Yuk lihat hobi-hobi baru yang kami rekomendasikan! </Text>
                        <Pressable style={style.button}>
                            <Text style={{color: '#FFFFFF'}}>Periksa</Text>
                        </Pressable>
                        </View>
                </View>
                </ScrollView>
            </View>
        );
    }

const style = {
    container: {
        flex: 1,
        backgroundColor: "#FFF8F3",
        padding: 24,
    },
    calendar:{
          backgroundColor: '#DBA140',
            borderRadius: 20,
            padding: 10, 
            height: 295,
            width: '100%', 
            flexDirection: 'column',  
            marginBottom: 5,
    },
    day:{
        backgroundColor: '#EFE0CF',
        borderRadius: 40,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#281800',
    },
    font_day:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#281800',
    }, activity:{
        backgroundColor: '#FFDDB0',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: 270,
    }, title:{
        fontSize: 14,
        fontWeight: 500,
        color: '#281800',
    }, desc:{
        fontSize: 12,
        color: '#281800',
        flexShrink:1,
        flexWrap: 'wrap',
        maxWidth: 200,

    }, med_card:{
        backgroundColor: '#F2E6DA',
        borderRadius: 20,
        marginTop: 5,
        marginBottom: 5,
        height: 80,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    }, large_card:{
        backgroundColor: '#D9E2FF',
        borderRadius: 20,
        marginTop: 5,
        marginBottom: 5,
        height: 215,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }, h2:{
        color: '#001946',
        fontFamily: 'Roboto',
        fontSize: 32,
        fontWeight: 800,

    }, button:{
        backgroundColor: '#001946',
        borderRadius: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    }
}