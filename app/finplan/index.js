import {View, Text, Pressable, TextInput, StatusBar, Image} from 'react-native';
import React, {useState} from 'react';
import { colors } from '../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';


// dummy data
const pesanan_berjalan = [
    {
        title: 'Pemakaman',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum',
        img_url: 'https://placebeard.it/300x200'
    },
    {
        title: 'Perawatan Makam',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum',
        img_url: 'https://placebeard.it/300x202'
    },
    {
        title: 'Pemakaman',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum',
        img_url: 'https://placebeard.it/300x240'
    }
]

const pesanan_selesai = [
    { 
        title: 'Anjay',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum',
        img_url: 'https://placebeard.it/300x200'
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
                        <Image source={{uri: item.img_url}} style={style.feed_img}/>
                        <View style={{padding: 10}}>
                            <Text style={style.feed_title}>{item.title}</Text>
                            <Text style={style.feed_content}>{item.content}</Text>
                        </View>
                    </Pressable>
                )) : pesanan_selesai.map((item, index) => (
                    <Pressable key={index} style={style.feed}>
                        <Image source={{uri: item.img_url}} style={style.feed_img}/>
                        <View style={{padding: 10}}>
                            <Text style={style.feed_title}>{item.title}</Text>
                            <Text style={style.feed_content}>{item.content}</Text>
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

    }

}