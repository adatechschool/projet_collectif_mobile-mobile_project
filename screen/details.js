import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Image } from "expo-image";

export default function Details({ route }) {
    // We pick data form Home view
    const { point, image, location } = route.params;

    // We use blurhash to improve image uploading
    const blurhash ='|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.text}>{point}</Text>
                <Image 
                source={{uri: image}}
                placeholder={blurhash} 
                style={{width: 400, height:400}}
                transition={500}
                />
                <Text style={styles.text}>{location}</Text>
            </View>
        </ScrollView>
    )
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