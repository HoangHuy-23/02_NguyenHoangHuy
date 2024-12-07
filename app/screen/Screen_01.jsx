import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native';

export default function Screen_01() {
    const navigation = useNavigation();
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 20
        }}>
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'green'
            }}>Order your farvorites</Text>
            <Image source={require("../../assets/screen01.png")} style={{
                width: '100%',
                height: '70%',
            }} />
            <TouchableOpacity style={{
                backgroundColor: 'green',
                padding: 10,
                borderRadius: 20,
                marginTop: 20
            }}
                onPress={() => navigation.navigate('screen02')}
            >
                <Text style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
}