import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';


export default function Home() {
        return (
            <View>
                <Text>Onboarding</Text>
                <Pressable>
                    <Text>Continue</Text>
                </Pressable>
            </View>
        );
    }