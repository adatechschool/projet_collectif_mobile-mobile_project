import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, StyleSheet, Button, RefreshControl } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { REACT_APP_API_KEY, BASE_API } from '@env';

// Home view
export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const apiKey = REACT_APP_API_KEY;
  const apiEndpoint = BASE_API;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
        setRefreshing(false);
    }, 2000);
  }, [])

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
      console.log(data)
    }).catch((error) => console.log(error))
  }

  // We get data in the useEffect
  useEffect(() => {
    getData();
  },[])

  // Navigation to Details view with data 
  const dataToDetails = (surf_break, image, location) => {
    navigation.navigate('Details', {
      point: surf_break,
      image: image,
      location: location,
    })
  }
  
  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
    }>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {data.map(data => {
          console.log(data)
          const surf_break = data['fields']['Destination'];
          const image = data['fields']["Photos"][0].url;
          const location = data["fields"]["Destination State/Country"];
          return (
            <Button 
            title={surf_break} 
            onPress={() => { 
              console.log(image)
              dataToDetails(surf_break, image, location)
            }}
            />
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
    fontSize: 25
  }
});