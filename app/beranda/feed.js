import { Text, View, Pressable, Image, ScrollView, TextInput } from 'react-native';
import React from 'react';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

const content = {
    title: 'Cara cepat mengiklaskan dia yang telah pergi sebelum kita.',
    img_url: 'https://placebeard.it/300x200',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac ipsum non est varius mattis. Suspendisse at leo vitae arcu feugiat hendrerit. Vivamus orci dolor, sagittis et lobortis eget, vulputate quis urna. Nunc fringilla tristique tincidunt. Vivamus vitae feugiat lorem. Pellentesque ultrices, dui sed fringilla consectetur, turpis ex porttitor orci, nec interdum sapien ligula quis magna. Praesent posuere arcu eu rhoncus malesuada. Aliquam dictum elit libero, luctus porta lectus commodo eget. Mauris congue eget massa a rhoncus. sapien ligula quis magna. Praesent posuere arcu eu rhoncus malesuada. Aliquam dictum elit libero, luctus porta lectus commodo eget. Mauris congue eget massa a rhoncus.',
    tags: ['Tips', 'Kehilangan', 'Kreativitas']
};

export default function Feed({ navigation, route }) {
    const nav = useNavigation();

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Icon
                    color={colors.primary}
                    name="west"
                    size={24}
                    type="material"
                    onPress={() => nav.goBack()}
                />
                <Image source={require('./../../assets/after-txt-red.png')} style={style.logo} />
                <View><Text> </Text></View>
            </View>
            
            <View style={style.scrollableWrapper}>
                <ScrollView contentContainerStyle={style.scrollableContent} style={style.scrollable}>
                    <View style={style.contentContainer}>
                        <Text style={style.h1}>{route.params?.item?.title ?? content.title}</Text>
                        <Image source={{ uri: route.params?.item?.img_url ?? content.img_url }} style={style.image} />
                        <Text style={style.text}>{content.content}</Text>
                        <View style={style.tagsContainer}>
                            {content.tags.map((item, index) => (
                                <View key={index} style={style.tag}>
                                    <Text style={style.tagText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const style = {
    container: {
        backgroundColor: colors.surfacecontainer,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'space-between',
    },
    logo: {
        width: 70,
        height: 20,
    },
    scrollableWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollable: {
        backgroundColor: colors.surfacecontainer,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // Only for Android
        width: '90%',
    },
    scrollableContent: {
        paddingVertical: 20,
    },
    contentContainer: {
        padding: 20,
    },
    h1: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.onsurface,
        alignSelf: 'center',
        marginBottom: 18,
    },
    image: {
        width: '100%',
        height: 140,
        alignSelf: 'center',
        borderRadius: 10,
    },
    text: {
        color: colors.onsurfacevariant,
        fontSize: 14,
        lineHeight: 20,
        marginTop: 20,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 30,
    },
    tag: {
        backgroundColor: colors.primarycontainer,
        borderRadius: 20,
        padding: 10,
        marginRight: 10,
        marginBottom: 5,
    },
    tagText: {
        color: colors.primary,
        fontSize: 12,
    }
};
