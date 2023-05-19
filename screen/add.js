import { View, StyleSheet, Button, TextInput, Image, Text, ScrollView, SafeAreaView} from 'react-native';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { REACT_APP_API_KEY, BASE_API, CLOUDINARY_URL, UPLOAD_PRESET } from '@env';

export default function Add() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [country, setCountry] = useState('');
    const [level, setLevel] = useState()
    const [surfBreak, setSurfBreak] = useState('');
    const [peakSurfSeasonBegins, setPeakSurfSeasonBegins] = useState("");
    const [peakSurfSeasonEnds, setPeakSurfSeasonEnds] = useState("");
    const [influencers, setInfluencers] = useState("");
    const [geocode, setGeocode] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [confirm, setConfirm] = useState("");
    const apiKey = REACT_APP_API_KEY;
    const apiEndpoint = BASE_API;

    const newData = {
        fields: {
            "Destination": name,
            "Destination State/Country": country,
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
              influencers /* recAncxRLL7lLA9Vz */ 
            ],
            "Geocode": geocode
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
        setCountry("");
        setGeocode("");
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
                    <TextInput 
                    style={style.input} 
                    onChangeText={setCountry}
                    value={country}
                    placeholder='Country'
                    />
                    <TextInput 
                    style={style.input} 
                    onChangeText={setLevel}
                    value={level}
                    placeholder='Level'
                    />
                    <TextInput
                    style={style.input}
                    onChangeText={setSurfBreak}
                    value={surfBreak}
                    placeholder='Surf Break'
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
                    <TextInput
                    style={style.input}
                    onChangeText={setInfluencers}
                    value={influencers}
                    placeholder='Influencers'
                    />
                    <TextInput
                    style={style.input}
                    onChangeText={setGeocode}
                    value={geocode}
                    placeholder='Geocode'
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