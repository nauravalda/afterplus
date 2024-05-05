import { Text, View } from 'react-native';
import React from 'react';
import {Link, Stack} from 'expo-router';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from './auth';
import Onboarding from './onboarding';

export default function App() {
    const Stack = createStackNavigator();
    const user = null;
    if (user) {
        return (
            <View>
            <Text>Welcome {user.phoneNumber}</Text>
            </View>
        );
    }
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen  
            name="onboarding" component={Onboarding} 
            />
        </Stack.Navigator>
    );
    }