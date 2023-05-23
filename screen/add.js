import { View, StyleSheet, Button, TextInput, Image, Text, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { REACT_APP_API_KEY, BASE_API, CLOUDINARY_URL, UPLOAD_PRESET } from '@env';
import RNPickerSelect from 'react-native-picker-select';

export default function Add() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [level, setLevel] = useState()
    const [surfBreak, setSurfBreak] = useState('');
    const [peakSurfSeasonBegins, setPeakSurfSeasonBegins] = useState("");
    const [peakSurfSeasonEnds, setPeakSurfSeasonEnds] = useState("");
    const [influencers, setInfluencers] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [confirm, setConfirm] = useState("");
    const apiKey = REACT_APP_API_KEY;
    const apiEndpoint = BASE_API;

    const newData = {
        fields: {
            "Destination": name,
            "Destination State/Country": location,
            "Difficulty Level": Number(level),
            "Surf Break": [
              surfBreak
            ],
            "Photos": [
              {
                "url": imageUri,
              }
            ],
            "Peak Surf Season Begins": peakSurfSeasonBegins,
            "Peak Surf Season Ends": peakSurfSeasonEnds,
            "Magic Seaweed Link": "https://magicseaweed.com/Pipeline-Backdoor-Surf-Report/616/",
            "Influencers": [
              influencers 
            ],
            "Geocode": "eyJpIjoiU2tlbGV0b24gQmF5LCBOYW1pYmlhIiwibyI6eyJzdGF0dXMiOiJPSyIsImZvcm1hdHRlZEFkZHJlc3MiOiJOYW1pYmlhIiwibGF0IjotMjUuOTE0NDkxOSwibG5nIjoxNC45MDY4NTk"
        }
    }

    const PostData = async () => {
        await fetch(apiEndpoint, {
            method:"POST",
            headers: {
                "Authorization": apiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        })
        .then(response =>  response.json())
        .then(data => console.log(data))
        .catch((error) => console.log(error))

        setLocation("");
        setName("");
        setLevel(null);
        setSurfBreak("");
        setImageUri(null);
        setInfluencers("");
        setPeakSurfSeasonBegins("");
        setPeakSurfSeasonEnds("");
    } 

    useEffect(() => {
        PostData();
    },[])

    // We retrieve the uri of the image in order to 
    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if(permissionResult.granted == false) {
            alert("Permission to access camera roll is required");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,3],
            base64: true
        });

        if(pickerResult.canceled) {
            return;
        }

        let base64Img = `data:image/jpg;base64,${pickerResult.assets[0].base64}`;
        let data = {
            "file": base64Img,
            "upload_preset": UPLOAD_PRESET
        }

        await fetch(CLOUDINARY_URL, {
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            },
            method: "POST"
        }).then(async r => {
            let data = await r.json();
            setImageUri(data.url)
        }).catch(err => console.log(err))
    }

    return (
        <ScrollView>
            <SafeAreaView style={{flex: 1, justifyContent: "center", marginTop: 40}}>
                <View style={style.inputs}>
                    <TextInput 
                    style={style.input} 
                    onChangeText={setName}
                    value={name}
                    placeholder='Name'
                    />
                    <TextInput
                    style={style.input}
                    onChangeText={setLocation}
                    value={location}
                    placeholder='Location'
                    />
                    <RNPickerSelect
                    onValueChange={(value) => setLevel(value)}
                    placeholder={{label: "Level", color: "grey"}}
                    items={[
                    { label: '1', value: 1 },
                    { label: '2', value: 2 },
                    { label: '3', value: 3 },
                    { label: '4', value: 4 },
                    { label: '5', value: 5 },
                    ]}
                    value={level}
                    style={{
                        inputIOSContainer: style.input
                    }}
                    />
                    <RNPickerSelect
                    onValueChange={(value) => setSurfBreak(value)}
                    placeholder={{label: "Surf Break", color: "grey"}}
                    items={[
                    { label: 'Point Break', value: 'Point Break' },
                    { label: 'Outer Banks', value: 'Outer Banks' },
                    { label: 'Reef Break', value: 'Reef Break' },
                    { label: 'Beach Break', value: 'Beach Break' }
                    ]}
                    value={surfBreak}
                    style={{
                        inputIOSContainer: style.input
                    }}
                    />
                    <TextInput 
                    style={style.input} 
                    onChangeText={setPeakSurfSeasonBegins}
                    value={peakSurfSeasonBegins}
                    placeholder='Peak Surf Season Begins'
                    />
                    <TextInput
                    style={style.input}
                    onChangeText={setPeakSurfSeasonEnds}
                    value={peakSurfSeasonEnds}
                    placeholder='Peak Surf Season Ends'
                    />
                    <RNPickerSelect
                    onValueChange={(value) => setInfluencers(value)}
                    placeholder={{label: "Influencers", color: "grey"}}
                    items={[
                    { label: 'Boa Smith', value: 'recAncxRLL7lLA9Vz' }
                    ]}
                    value={influencers}
                    style={{
                        inputIOSContainer: style.input
                    }}
                    />
                    <Button title='Select an image' onPress={openImagePickerAsync}/>
                    {imageUri && 
                    <Image source={{ uri: imageUri }} 
                    style={{ width: 100, height: 100, marginLeft: "auto", marginRight:"auto" }}
                    />}
                    <Button title='Submit' onPress={PostData}/>
                    <Text style={style.text}>{confirm}</Text>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

// Layout of the view
const style = StyleSheet.create({
    input: {
        borderWidth: 1,
        color: "black",
        padding: 5,
        marginHorizontal: 60,
    },
    inputs: {
        rowGap: 25
    },
    text: {
        marginRight: "auto",
        marginLeft:"auto"
    }
})