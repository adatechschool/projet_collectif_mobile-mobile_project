import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, StyleSheet, Button } from 'react-native';
import data from '../details.json';

export default function Home({ navigation }) {
  const records = data.records;

  const onPressButton = (data) => {
    console.log("OnPress"+ data['SurfBreak'])
    navigation.navigate('Details', {
      point: data['SurfBreak'],
      image: data['Photos'],
      location: data['Address']
    })
  }

  return (
    <ScrollView>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {records.map(data => {
          console.log(data['SurfBreak'])
          return (
            <Button 
            title={data['SurfBreak']} 
            onPress={() => onPressButton(data)}
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