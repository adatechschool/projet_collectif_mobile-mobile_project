import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, StyleSheet, Button } from 'react-native';
import data from '../details.json';

export default function Home({ navigation }) {
  const records = data.records;

  const onPressButton = (surf_break, image, location) => {
    navigation.navigate('Details', {
      point: surf_break,
      image: image,
      location: location
    })
  }

  return (
    <ScrollView>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {records.map(data => {
          const surf_break = data['fields']['Destination'];
          const image = data['fields']["Photos"][0].url;
          const location = data["fields"]["Destination State/Country"];
          return (
            <Button 
            title={surf_break} 
            onPress={() => onPressButton(surf_break, image, location)}
            />
          )
        })}
      </View>
    </ScrollView>
  );
}

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