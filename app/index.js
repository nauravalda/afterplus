import { Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import {Link, Stack} from 'expo-router';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from './auth';
import Onboarding from './onboarding';
import Activities from './activities';
import Profile from './profile';
import Finplan from './finplan';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './mainscreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function App() {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const user = "ojan";
    if (user) {
        return (

              <MyTabs />
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
            <Stack.Screen  
            name="activities" component={Activities} 
            />
        
        </Stack.Navigator>
        
    );
    }

    function MyTabs() {
        const Tab = createBottomTabNavigator();
        return (
          <Tab.Navigator
            initialRouteName="activities"
            screenOptions={{
              

              headerShown: false,
              tabBarStyle: { backgroundColor: '#F8ECDF', height: 80},
                tabBarLabelStyle: styles.label,
                tabBarIconStyle: {width: 24, height: 24},
                tabBarActiveBackgroundColor: '#ebe0d5'

                
                    
            }}

            
          >
            <Tab.Screen
              name="activities"
              component={Activities}
              options={{
                tabBarLabel: 'Aktivitas',
                tabBarIcon: ({ color, size }) => (
                  <Image source={require('./../assets/navbar-1.png')} style={styles.icon} />
                ),
              }}
            />
            <Tab.Screen
              name="finplan"
              component={Finplan}
              options={{
                tabBarLabel: 'Keuangan',
                tabBarIcon: ({ color, size }) => (
                  <Image source={require('./../assets/navbar-2.png')} style={styles.icon}/>
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
                    <Image source={require('./../assets/navbar-3.png')} style={styles.icon}/>
                ),
              }}
            />
          </Tab.Navigator>
        );
      }
      

const styles = {
    navbar : {
        backgroundColor: '#F8ECDF',
        height: 80,
    },
    label:{
        fontSize: 12,
        color: '#201B13',
        fontWeight: 600,
        paddingBottom: 20,    
    },
    icon:{
        width: 24,
        height: 24,
        marginTop: 18,

    }
}