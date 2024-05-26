import { Text, View, Pressable, Image } from 'react-native';
import React, { useContext } from 'react';
import {Link, Stack} from 'expo-router';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './landing/option';
import Tour from './landing/tour';
import Auth from './auth';
import Beranda from './beranda';
import Profile from './profile';
import Finplan from './finplan';
import Options from './booking/options';
import Booking_area_pemakaman from './booking/detail/booking_area_pemakaman';
import Perlengkapan_pemakaman from './booking/detail/perlengkapan_pemakaman';
import Sarana_prasarana_pemakaman from './booking/detail/sarana_prasarana_pemakaman';
import Pengurus_jenazah from './booking/detail/pengurus_jenazah';
import Upacara_pemakaman from './booking/detail/upacara_pemakaman';
import Acara_peringatan from './booking/detail/acara_peringatan';
import Perawatan_makam from './booking/detail/perawatan_makam';
import Konseling_mental from './booking/detail/konseling_mental';
import Input_biodata from './booking/input_biodata';
import Feed from './beranda/feed';
import Payment from './booking/payment';
import Detail from './booking/detail/detail';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from './../constants/colors';
import {BookingProvider}  from './booking/booking-context';



const user = false;

export default function App() {
    const Stack = createStackNavigator();
    if (user) {
        return (
            <NavigationContainer independent={true}>
              <BookingProvider>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="mytabs" component={MyTabs} />
                      <Stack.Screen name="options" component={Options} />
                      <Stack.Screen name="booking_area_pemakaman" component={Booking_area_pemakaman} />
                      <Stack.Screen name="perlengkapan_pemakaman" component={Perlengkapan_pemakaman} />
                      <Stack.Screen name="sarana_prasarana_pemakaman" component={Sarana_prasarana_pemakaman} />
                      <Stack.Screen name="pengurus_jenazah" component={Pengurus_jenazah} />
                      <Stack.Screen name="upacara_pemakaman" component={Upacara_pemakaman} />
                      <Stack.Screen name="acara_peringatan" component={Acara_peringatan} />
                      <Stack.Screen name="perawatan_makam" component={Perawatan_makam} />
                      <Stack.Screen name="konseling_mental" component={Konseling_mental} />
                      <Stack.Screen name="input_biodata" component={Input_biodata} />
                      <Stack.Screen name="payment" component={Payment} />
                      <Stack.Screen name="feed" component={Feed} />

                      
                      <Stack.Screen name="detail" component={Detail} />
                      
                    
                </Stack.Navigator>
                </BookingProvider>
            </NavigationContainer>

          );
    }
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            
            <Stack.Screen
            name="landing" component={Landing}
            />

            <Stack.Screen name="tour" component={Tour} />
            
            <Stack.Screen  
            name="auth" component={Auth} 
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