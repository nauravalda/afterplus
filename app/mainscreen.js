import { createBottomTabNavigator, Image } from '@react-navigation/bottom-tabs';
import Activities from "./activities";
import Profile from "./profile";
import Finplan from "./finplan";
const Tab = createBottomTabNavigator();

export default function MainScreen() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen 
            name="aktivitas" component={Activities}>
                <Image source={require('./../assets/navbar-1.png')} />
            </Tab.Screen>
            <Tab.Screen name="keuangan" component={Finplan} />
            <Tab.Screen name="profil" component={Profile} />

        </Tab.Navigator>
    );
}