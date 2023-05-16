import { View, ScrollView, StyleSheet, Button, TextInput, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';

export default function Add() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    return (
        <SafeAreaView>
            <View style={style.inputs}>
                <TextInput 
                style={style.input} 
                onChangeText={setName}
                value={name}
                placeholder='name'
                />
                <TextInput
                style={style.input}
                onChangeText={setLocation}
                value={location}
                placeholder='location'
                />
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    input: {
        borderWidth: 1,
        color: "grey",
        padding: 5,
        marginHorizontal: 60
    },
    inputs: {
        marginTop: 20,
        rowGap: 15
    }
})