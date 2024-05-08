import {View, Text, Pressable, TextInput} from 'react-native';
import React, {useState} from 'react';

export default function Finplan() {
    return (
        <View style={style.container}>
            <Text style={style.p}>Fitur belum diimplementasikan</Text>
        </View>
    );
}

const style = {
    container:{
        flex: 1,
        backgroundColor: "#FFF8F3",
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        
    }, p:{
        color: '#281800',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 24, /* 150% */
    }

}