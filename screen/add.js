import { View, StyleSheet, Button, TextInput, SafeAreaView, Image, Text} from 'react-native';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { REACT_APP_API_KEY, BASE_API } from '@env';

export default function Add() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [country, setCountry] = useState('');
    const [level, setLevel] = useState(null)
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
            "Destination": location,
            "Destination State/Country": country,
            "Difficulty Level": level,
            "Surf Break": [
              surfBreak
            ],
            "Photos": [
              {
                "url": imageUri
              }
            ],
            "Peak Surf Season Begins": peakSurfSeasonBegins,
            "Peak Surf Season Ends": peakSurfSeasonEnds,
            "Magic Seaweed Link": "https://magicseaweed.com/Pipeline-Backdoor-Surf-Report/616/",
            "Influencers": [
              influencers
            ],
            "Geocode": geocode
        }
    }

    const PostData = async () => {
        console.log(newData)
        await fetch(apiEndpoint, {
            method:"POST",
            headers: {
                "Authorization": apiKey,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        })
        .then(response => {
            if(!response.ok) {
                setConfirm("The spot is created")
            } else {
                console.log("Réussi");
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch((error) => console.log(error))

       /*setLocation("");
        setCountry("");
        setGeocode("");
        setName("");
        setLevel(null);
        setSurfBreak("");
        setImageUri(null);
        setInfluencers("");
        setPeakSurfSeasonBegins("");
        setPeakSurfSeasonEnds("");*/

    } 

    useEffect(() => {
        PostData();
    },[])

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
                <Button title='Select an image' onPress={pickImage}/>
                {imageUri && 
                <Image source={{ uri: imageUri }} 
                style={{ width: 100, height: 100, marginLeft: "auto", marginRight:"auto" }}
                />}
                <Button title='Submit' onPress={PostData}/>
                <Text style={style.text}>{confirm}</Text>
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
        rowGap: 30
    },
    text: {
        marginRight: "auto",
        marginLeft:"auto"
    }
})