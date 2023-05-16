import { View, StyleSheet, Button, TextInput, SafeAreaView, Image } from 'react-native';
import {useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function Add() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [imageUri, setImageUri] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if(!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    }

    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center"}}>
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
                <Button title='Select an image' onPress={pickImage}/>
                {imageUri && 
                <Image source={{ uri: imageUri }} 
                style={{ width: 100, height: 100, marginLeft: "auto", marginRight:"auto" }}
                />}
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