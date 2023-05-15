import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, StyleSheet, Button } from 'react-native';
import data from '../details.json';
import { useEffect, useState } from 'react';

// Home view
export default function Home({ navigation }) {
  const [data, setData] = useState([]);

  const getData = async () => {
    await fetch("https://api.airtable.com/v0/appufMtdsdGDfX5Yy/tblHpuFXkxSyrScX8", {
      headers: new Headers({
        "Authorization": "Bearer keyO0kbRlOjlZCrUU"
      })
    })
    .then(response => response.json() )
    .then(dataFromApi => {
      setData(dataFromApi.records)
    }).catch((error) => console.log(error))
  }

  // We get data from AirTable api
  useEffect(() => {
    getData();
  },[])

  // Navigation to Details view with data 
  const dataToDetails = (surf_break, image, location) => {
    navigation.navigate('Details', {
      point: surf_break,
      image: image,
      location: location
    })
  }

  // We use useEffect in order to get data from API in asynchron 
  

  return (
    <ScrollView>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {data.map(data => {
          const surf_break = data['fields']['Destination'];
          const image = data['fields']["Photos"][0].url;
          const location = data["fields"]["Destination State/Country"];
          return (
            <Button 
            title={surf_break} 
            onPress={() => dataToDetails(surf_break, image, location)}
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