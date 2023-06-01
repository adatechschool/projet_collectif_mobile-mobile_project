import { View, ScrollView, StyleSheet, Text, Pressable } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { useFonts } from "expo-font";
import { REACT_APP_API_KEY, BASE_API } from '@env';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

// Home view
export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const apiKey = REACT_APP_API_KEY;
  const apiEndpoint = BASE_API;

  // Function that get data from AirTable API
  const getData = async () => {
    await fetch(apiEndpoint, {
      headers: new Headers({
        "Authorization": apiKey
      })
    })
    .then(response => response.json())
    .then(dataFromApi => {
      setData(dataFromApi.records)
    }).catch((error) => console.log(error))
  }

  // We get data in the useEffect
  useEffect(() => {
    getData();
  },[data])

  const [fontsLoaded] = useFonts({
    "Sopberry": require("../assets/fonts/Sopberry.otf")
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
        await SplashScreen.hideAsync();
    }
  },[fontsLoaded]);

  if(!fontsLoaded) {
    return null;
  }

  // Navigation to Details view with data 
  const dataToDetails = (surf_break, image, location) => {
    navigation.navigate('Details', {
      point: surf_break,
      image: image,
      location: location,
    })
  }
  
  return (
    <ScrollView style={styles.homeView} onLayout={onLayoutRootView}>
      <View style={styles.container}>
        {data.map(data => {
          const surf_break = data['fields']['Destination'];
          const image = data['fields']["Photos"][0].url;
          const location = data["fields"]["Destination State/Country"];
          return (
            <Pressable style={{ marginTop: 11 }} onPress={() => {
              dataToDetails(surf_break, image, location)}}
            >
              <Text style={styles.text}>{surf_break}</Text>
            </Pressable>
          )
        })}
      </View>
    </ScrollView>
  );
}

// Layout of the view
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: "Sopberry",
    color: "white"
  },
  homeView: {
    backgroundColor: "#00acee",
  }
});