import {View, Text, Pressable, TextInput, StatusBar} from 'react-native';
import React, {useState} from 'react';
import { colors } from '../../constants/colors';

export default function Profile() {
    return (
        <View style={style.container}>
            <StatusBar backgroundColor={colors.surfacecontainer} barStyle="dark-content" />
            <Text style={style.p}>Fitur belum diimplementasikan</Text>
        </View>
    );
}

const style = {
    container:{
        flex: 1,
        backgroundColor: colors.surfacecontainer,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        
    }, p:{
        color: colors.onsurface,
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 24, /* 150% */
    }
}