import {View, Text} from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';

export default function Detail({navigation, route}) {
    return (
        <View style={styles.container}>
            <Icon
                color="#201B13"
                containerStyle={{}}
                disabledStyle={{}}
                iconProps={{}}
                iconStyle={{}}
                name="west"
                size={24}
                type="material"
                style={{ alignSelf: 'flex-start' }}
                onPress={() => 
                    console.log(route.params.activity.title)

                }
            />
            <View style={styles.card}>
                <Text>
                    <Text style={styles.h3}>{route.params.activity.title}</Text>
                </Text>
            </View>
        </View>
    );

}

const styles = {
    container: {
        flex: 1,
        backgroundColor: "#DBA140",
        padding: 24,
    }, card:{
        backgroundColor: '#FFF8F3',
        padding: 24,
        borderRadius: 20,
        marginBottom: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 178,
    }, 
    recommendation: {
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 5,
        borderRadius: 20,
        height : 80,
    }, h3: {
        fontSize: 14,
        fontWeight: 500,
        color: '#201B13',
    }, p: {
        fontSize: 12,
        color: '#4F4539',
        flexShrink:1,
        flexWrap: 'wrap',
        fontWeight: 500,
        maxWidth: 200,

    }, image:{
        width: 80,
        height: 80,
        borderRadius: 20,
        marginRight: 10,
    }
}