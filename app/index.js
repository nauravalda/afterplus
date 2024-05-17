import { Text, View, Pressable, Image } from 'react-native';
import React, { useContext } from 'react';
import {Link, Stack} from 'expo-router';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from './auth';
import Onboarding from './onboarding';
import Beranda from './beranda';
import Profile from './profile';
import Finplan from './finplan';
import Detail from './detail';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from './../constants/colors';



const user = true;

export default function App() {
    const Stack = createStackNavigator();
    if (user) {
        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="mytabs" component={MyTabs} />
                    <Stack.Screen name="detail" component={Detail} />
                </Stack.Navigator>
            </NavigationContainer>

          );
    }
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen  
            name="auth" component={Auth} 
            />
            <Stack.Screen  
            name="onboarding" component={Onboarding} 
            />
        </Stack.Navigator>
        
    );
    }

    function MyTabs() {
        const Tab = createBottomTabNavigator();
        return (
          <Tab.Navigator
            initialRouteName="beranda"
            screenOptions={{
              

              headerShown: false,
              tabBarStyle: { backgroundColor: colors.surfacecontainer, height: 80},
                tabBarLabelStyle: styles.label,
                tabBarIconStyle: {width: 24, height: 24},
                tabBarActiveTintColor: colors.primarycontainer,

                
                    
            }}

            
          >
            <Tab.Screen
              name="beranda"
              component={Beranda}
              options={{
                tabBarLabel: 'Beranda',
                tabBarIcon: ({ color, size }) => (
                  <Image source={require('./../assets/navbar-1.png')} style={{...styles.icon, width: 30}} />
                ),
              }}
            />
            <Tab.Screen
              name="finplan"
              component={Finplan}
              options={{
                tabBarLabel: 'Pemesanan',
                tabBarIcon: ({ color, size }) => (
                  <Image source={require('./../assets/navbar-2.png')} style={{...styles.icon, width: 20}}/>
                ),
                // tabBarBadge: 3,
              }}
            />
            <Tab.Screen
              name="profile"
              component={Profile}
              options={{
                tabBarLabel: 'Profil',
                tabBarIcon: ({ color, size }) => (
                    <Image source={require('./../assets/navbar-3.png')} style={{...styles.icon, width: 25, height: 34}}/>
                ),
              }}
            />
          </Tab.Navigator>
        );
      }
      

const styles = {
    navbar : {

    },
    label:{
        fontSize: 12,
        color: colors.onsurface,
        fontWeight: 600,
        paddingBottom: 20,    
    },
    icon:{
        height: 25,
        marginTop: 18,

    }
}