import {
    View, Text, Pressable, Image, ScrollView
} from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';
import { useState } from 'react';

// dummy data
const recommendation = [{
    title: 'Telor dadar pedas',
    desc: 'Telor dadar enak dengan 5 bahan dan waktu memasak hanya 5 menit',
    content: "Telur Dadar Pedas Sederhana\n\n Bahan-Bahan:\n 1. 2 butir telur\n 2. 1 cabai merah besar, iris tipis (atau sesuai selera)\n 3. Sedikit daun seledri atau daun bawang, iris halus \n 4. Garam secukupnya \n 5. Minyak untuk menumis\n\nInstruksi:\n1. Kocok Telur: Kocok telur dalam sebuah mangkuk besar hingga tercampur rata.\n 2. Tambahkan Bumbu: Tambahkan irisan cabai merah, daun seledri atau daun bawang, dan garam ke dalam mangkuk dengan telur yang telah dikocok. Aduk hingga semua bahan tercampur merata.\n 3. Panaskan Minyak: Panaskan sedikit minyak di atas wajan dengan api sedang.\n 4. Tuangkan Adonan: Tuangkan adonan telur ke dalam wajan yang sudah dipanaskan. Ratakan permukaannya dengan spatula jika perlu.\n 5. Goreng Hingga Matang: Biarkan telur dadar mengeras dan matang di bagian bawahnya sebelum diputar atau dibalik. Setelah bagian bawahnya matang, balik telur dadar dan masak hingga kedua sisi berwarna kecokelatan dan matang sempurna.\n 6. Angkat dan Sajikan: Angkat telur dadar dari wajan dan letakkan di atas piring saji. Telur dadar pedas sederhana siap disajikan!\n",
    img_url: 'https://cdn0-production-images-kly.akamaized.net/96cejMLvediHcW0OKb8XJFV2174=/0x0:1920x1082/800x450/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2559225/original/035309500_1546271126-kitchen-775746_1920.jpg'
},
{
    title: 'Roti Panggang dengan Alpukat',
    desc: 'Roti panggang dengan alpukat enak dengan 4 bahan dan waktu memasak hanya 7 menit',
    content: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'
}
]


export default function Detail({ navigation, route }) {
    const [desc, setDesc] = useState(route.params.activity.desc);
    const dateString = route.params.activity.datetime.date;
    const day = (new Date(dateString)).getDate();

    const renderContent = (content) => {
        const lines = content.split('\n');
        return lines.map((line, index) => {
            if (line.startsWith('Bahan-Bahan:') || line.startsWith('Instruksi:')) {
                return (
                    <Text key={index} style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>{line}</Text>
                );
            } else if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.') || line.startsWith('6.')) {
                return (
                    <Text key={index} style={{ marginLeft: 20 }}>{line}</Text>
                );
            } else {
                return (
                    <Text key={index}>{line}</Text>
                );
            }
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Icon
                color="#201B13"
                name="west"
                size={24}
                type="material"
                style={{ alignSelf: 'flex-start', marginBottom: 20 }}
                onPress={() =>
                    navigation.goBack()

                }
            />
            <View style={styles.card}>
                <View style={{ flexDirection: "row" }}>
                    <Pressable style={styles.day}>
                        <Text style={styles.font_day}>{day}</Text>
                    </Pressable>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginLeft: 20 }}>
                        <Text style={styles.h3}>{route.params.activity.title}</Text>
                        <Text style={styles.p}>{route.params.activity.datetime.starttime} - {route.params.activity.datetime.endtime}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Icon
                        color="#817567"
                        name="label"
                        size={24}
                        type="material"
                        style={{ alignSelf: 'flex-start', paddingTop: 5, paddingLeft: 10 }}
                    />
                    <Text style={styles.tag}>{route.params.activity.tags}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        color="#817567"
                        name="notes"
                        size={24}
                        type="material"
                        style={{ alignSelf: 'flex-start', paddingTop: 15, paddingLeft: 10 }}
                    />
                    <Text style={{ ...styles.p, marginLeft: 32, marginTop: 10 }}>Rekomendasi: {desc}</Text>
                </View>


            </View>

            <Text style={{ ...styles.h2 }}>Rekomendasi</Text>
            {recommendation.map((item, index) => {
                return (
                    <Pressable style={styles.recommendation} key={index}
                        onPress={() => setDesc(item.content)}>

                        <View style={{ flexDirection: 'column', width: '80%' }}>
                            <Text style={styles.h3}>{item.title}</Text>
                            <Text style={styles.p}>{item.desc}</Text>
                        </View>
                        <Image source={{ uri: item.img_url }} style={{ ...styles.image, width: '20%' }} />
                    </Pressable>
                )
            })}
        </ScrollView>
    );

}

const styles = {
    container: {
        flex: 1,
        backgroundColor: "#DBA140",
        padding: 24,
    }, card: {
        backgroundColor: '#FFF8F3',
        padding: 24,
        borderRadius: 20,
        marginBottom: 10,
        flexDirection: 'column',
    }, recommendation: {
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 5,
        borderRadius: 20,
        height: 80,
        backgroundColor: '#F2E6DA',
        paddingLeft: 20,
    }, h3: {
        fontSize: 14,
        fontWeight: 500,
        color: '#201B13',
    }, p: {
        fontSize: 12,
        color: '#4F4539',
        flexShrink: 1,
        flexWrap: 'wrap',
        fontWeight: 500,
    }, image: {
        width: 80,
        height: 80,
        borderRadius: 20,
        marginRight: 10,
    }, day: {
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
    font_day: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#281800',
    },
    tag: {
        backgroundColor: '#A0F2DE',
        borderRadius: 4,
        padding: 4,
        color: '#00201A',
        fontSize: 11,
        fontWeight: 500,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 32,
        marginTop: 5,

    }, h2: {
        color: '#FFFFFF',
        fontWeight: 800,
        fontSize: 20,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',

    },

}