import {
    View, Image, Text, Pressable, ScrollView, StatusBar
} from 'react-native';
import React, { useState } from 'react';
import { SectionList } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/colors';
import { color } from '@rneui/themed/dist/config';
import { shadow } from 'react-native-paper';

const feeds = [
    {
        title: 'Baru Menggunakan After+? Yuk Ikuti Tur',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum',
        img_url: 'https://placebeard.it/300x200'
    },

    {
        title: 'Tips Merelakan Kehilangan yang Meninggal',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum',
        img_url: 'https://placebeard.it/300x202'
    },
    {
        title: 'Mengatasi Kehilangan dengan Kreativitas',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum',
        img_url: 'https://placebeard.it/300x240'
    }

]


export default function Beranda() {

    const navigation = useNavigation();
    return (
        <View style={style.container}>
            <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
            <Image source={require('./../../assets/after-txt.png')} style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginBottom: 24, width:70, height:20 }}/>
            
                <View style={style.card}>
                    
                    <Text style={style.h1}>Pemesanan</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <View style={{alignItems: 'center'}}>
                        <Pressable style={style.small_pressable}
                        onPress={() => navigation.navigate('options')}
                        >
                            <Image source={require('./../../assets/home-pemakaman.png')}
                                style={{ width: '100%', height: 58, borderRadius: 20}}
                            />
                        </Pressable>
                        <Text style={style.small}>Pemakaman</Text>

                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Pressable style={style.small_pressable}
                        onPress={() => navigation.navigate('perawatan_makam')}
                        >
                            <Image source={require('./../../assets/home-perawatan.png')}
                                style={{ width: '100%', height: 58, borderRadius: 20}}
                            />
                        </Pressable>
                        <Text style={style.small}>Perawatan Makam</Text>

                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Pressable style={style.small_pressable}
                        onPress={() => navigation.navigate('konseling_mental')}
                        >
                            <Image source={require('./../../assets/home-konseling.png')}
                                style={{ width: '100%', height: 58, borderRadius: 20}}
                            />
                        </Pressable>
                        <Text style={style.small}>Konseling Mental</Text>

                    </View>
                    </View>

                </View>
                <View style={{...style.card, marginTop: 20, width: '100%', paddingBottom: 270}}>
                    <Text style={style.h1}>Feeds</Text>
                    <ScrollView style={{}}>
                        <View style={{height: 20}}></View>
                        {feeds.map((item, index) => {
                            return (
                                <Pressable key={index} style={style.feed}
                                onPress={() => navigation.navigate('feed', {item: item})}
                                >
                                    <Image source={{ uri: item.img_url }} style={{ width: '100%', height: 130, borderRadius: 10, marginBottom: 10 }} />
                                    <View style={{padding: 5}}>
                                    <Text style={style.h2}>{item.title}</Text>
                                    <Text style={style.desc}>{item.content}</Text>
                                    </View>
                                </Pressable>
                            )
                        })}
                        </ScrollView>
                </View>
        </View>
    );
}

const style = {
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingTop: 20,
        
    },
    card: {
        backgroundColor: colors.surfacecontainer,
        borderRadius: 20,
        width: '90%',
        flexDirection: 'column',
        marginBottom: 5,
        alignSelf: 'center',
        paddingBottom: 20,
    }, h1: {
        fontSize: 17,
        fontWeight: 500,
        color: colors.onsurface,
        marginBottom: 20,
        marginLeft: 30,
        marginTop: 20
    }, small: {
        fontSize: 11,
        color: colors.onsurface,
        fontWeight: 500,
        textAlign: 'center',
        maxWidth: 64,
        marginTop: 5,
        

    }, small_pressable: {
        backgroundColor: colors.primarycontainer,
        height: 58,
        width: 58,
        borderRadius: 25,

    }, feed: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: colors.surfacecontainer,
        borderRadius: 15,
        padding: 10,
        marginBottom: 20,
        shadowColor: colors.onsurface,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 11,
        
    }, h2: {
        fontSize: 14,
        fontWeight: 500,
        color: colors.onsurface,
        marginBottom: 5,
    }, desc:{
        fontSize: 12,
        color: colors.onsurfacevariant,
    }
}