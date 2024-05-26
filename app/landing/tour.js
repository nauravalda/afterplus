import { View, Text, TextInput, TouchableOpacity, Pressable, Image } from 'react-native';
import React, { useState, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/colors';


const content=[
    {
        title: 'Di After+ kamu bisa Booking Area Pemakaman',
        desc: 'Kamu bisa memesan area pemakaman secara online, tanpa harus repot datang ke lokasi secara langsung!',
        img_url: require('./../../assets/tour-1.png')
    },
    {
        title: "Pilihan Perlengkapan Lengkap",
        desc: "Dari peti mati hingga bunga dan lilin, kamu dapat menemukan semua perlengkapan pemakaman yang kamu butuhkan dengan mudah di dalam aplikasi kami!",
        img_url: require('./../../assets/tour-2.png')
    },{
        title: "Layanan Profesional Pengurus Jenazah",
        desc: "Kami bekerja sama dengan pengurus jenazah yang berpengalaman dan terpercaya untuk membantu kamu dalam proses pemakaman dengan penuh pengertian!",
        img_url: require('./../../assets/tour-3.png')
    }
]

export default function Tour() {

    const [title, setTitle] = useState(content[0].title);
    const [desc, setDesc] = useState(content[0].desc);
    const [img, setImg] = useState(content[0].img_url);
    const [done, setDone] = useState(false);

    const handlePressNext = () => {
        const index = content.findIndex(item => item.title === title);
        if (index < content.length - 1) {
            setTitle(content[index + 1].title);
            setDesc(content[index + 1].desc);
            setImg(content[index + 1].img_url);
        } else {
            setDone(true);
        }
    }

    const handlePressPrev = () => {
        const index = content.findIndex(item => item.title === title);
        if (index > 0) {
            setTitle(content[index - 1].title);
            setDesc(content[index - 1].desc);
            setImg(content[index - 1].img_url);
        }

    }


    const navigation = useNavigation();

    return (


        <View style={{...style.container}}>
            {!done ? (
                <View style={style.container}>
            <View style={style.background_img}></View>
            <Image source={img} style={style.image_b}></Image>
            <View style={{height:'100%', flexDirection: 'column', justifyContent:'space-between', paddingVertical: 40}}>
            <View></View>
            <View>
            <Text style={style.h1}>{title}</Text>

            <Text style={style.text}>{desc}</Text>
            <View style={style.option}>
                <Pressable style={{...style.optionbtn,
                backgroundColor: title === content[0].title ? '#1D1B201F' : colors.primary

                }} onPress={() => {
                    handlePressPrev();
                }}>

                    <Icon name="west"  size={24} color={title === content[0].title ? '#8A8A8A' : 'white'} />
                </Pressable>
                <Pressable style={{...style.optionbtn,
                backgroundColor: colors.primary

                }} onPress={() => {
                    handlePressNext();
                }}>

                    <Icon name="east"  size={24} color={'white'} />
                </Pressable>
            </View>
            </View>
            </View>
            </View>
            
            ) : (
                <View style={{backgroundColor: colors.primary, height: '100%', justifyContent:'space-evenly', alignItems:'center'}}>
                    <Text style={{...style.h1, color: colors.surfacecontainer, alignSelf:'center',textAlign: 'center', marginTop: 10}}>Selain itu apa lagi?</Text>
                    <Text style={{color:colors.surfacecontainer, alignSelf:'center', width: '60%', textAlign: 'center'}}>
                    After+ juga merupakan aplikasi yang bisa membantu kamu mempersiapkan kesejahteraan kematian kamu atau kerabatmu nanti!
                    </Text>

                    <View>
                        <View style={{flexDirection:'row', backgroundColor: colors.surfacecontainer, width: '80%', borderRadius: 10, padding: 20, alignItems: 'center'}}>
                            <Icon name="check" size={30} color={colors.primary} style={{marginRight: 20}}/>
                            <View>
                                <Text style={{color:colors.onsurface, fontWeight: 700}}>Acara Peringatan</Text>
                                <Text style={{color:colors.onsurface, fontWeight: 500}}>Rencanakan acara peringatan yang sangat personal dan bermakna</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', backgroundColor: colors.surfacecontainer, width: '80%', borderRadius: 10, padding: 20, alignItems: 'center', marginTop: 10}}>
                            <Icon name="check" size={30} color={colors.primary} style={{marginRight: 20}}/>
                            <View>
                                <Text style={{color:colors.onsurface, fontWeight: 700}}>Acara Peringatan</Text>
                                <Text style={{color:colors.onsurface, fontWeight: 500}}>Rencanakan acara peringatan yang sangat personal dan bermakna</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', backgroundColor: colors.surfacecontainer, width: '80%', borderRadius: 10, padding: 20, alignItems: 'center', marginTop: 10}}>
                            <Icon name="check" size={30} color={colors.primary} style={{marginRight: 20}}/>
                            <View>
                                <Text style={{color:colors.onsurface, fontWeight: 700}}>Acara Peringatan</Text>
                                <Text style={{color:colors.onsurface, fontWeight: 500}}>Rencanakan acara peringatan yang sangat personal dan bermakna</Text>
                            </View>
                        </View>
                    </View>

                    <Image source={require('./../../assets/tour-4.png')} style={{width: 255, height: 200, marginTop: 20}}></Image>
                    <Pressable style={{...style.optionbtn, backgroundColor: colors.surfacecontainer, width:'45%', marginBottom: 10}} onPress={() => navigation.navigate('auth')}>
                        <Text style={{color: colors.onsurface, fontWeight: 700}}>Coba Sekarang!</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const style = {
    container: {

        backgroundColor: colors.surfacecontainer,
    },

    
    h1: {
        color: colors.onsurface,
        fontFamily: 'Roboto',
        fontSize: 24,
        fontWeight: 800,
        letterSpacing: 0.1,
        marginBottom: 10,
        marginTop: 30,
        alignSelf: 'center',
        width: '80%'
    },h2:{
        color: colors.onsurface,
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 24, /* 150% */
        letterSpacing: 0.4,
        marginBottom: 4,
        textAlign: 'center',
        marginTop: 16,

    },
    text: {
        color: colors.onsurface,
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 20, /* 150% */
        letterSpacing: 0.4,
        marginBottom: 32,
        width: '80%',
        alignSelf: 'center',
    }, image_b: {
        width: 325,
        height: 300,
        position: 'absolute',
        top: 150,
        left: 30,

        
    },
    option:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        marginTop: 20,
        alignSelf: 'center'
    }, optionbtn: {
        height: 40,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    }, background_img :{
        backgroundColor: colors.primary,
        width: 800,
        height: 800,
        borderBottomLeftRadius: 1000,
        transform: [{rotate: '-45deg'}],
        position: 'absolute',
        left: -180,
        top: -50
    }

};