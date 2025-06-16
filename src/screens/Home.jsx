import React from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const dummyPDFs = [
  {
    id: '1',
    title: 'Sample PDF',
    size: '2.5 MB',
    pages: 10,
    uri: 'bundle-assets://sample.pdf',
  },
  {
    id: '2',
    title: 'Sample PDF',
    size: '2.5 MB',
    pages: 10,
    uri: 'bundle-assets://sample.pdf',
  },
];

export default function Home({navigation}) {
  const openPDF = item => {
    navigation.navigate('ViewScreen', {pdf: item});
  };

  console.log('Started2');
  console.log('StatusBar height:', StatusBar.currentHeight);
  console.log('Platform:', Platform.OS);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PDF Viewer</Text>
      Alert.alert('Welcome to PDF Viewer');

      <View style={{flex: 1, paddingHorizontal: 10}}>
        <FlatList
          data={[
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1,
          ]}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          // keyExtractor={(item) => item.id}
          renderItem={({item, index}) => (
            <TouchableOpacity style={styles.card} onPress={() => openPDF(item)}>
              {/* <Text style={styles.title}>{item.title}</Text>
            <Text>Size: {item.size}</Text>
            <Text>Pages: {item.pages}</Text> */}
              <Image
                source={require('../assets/pdf.webp')}
                style={{
                  width: 90,
                  alignSelf: 'center',
                  height: 200,
                  resizeMode: 'contain',
                }}
              />
              <Text style={styles.title}>Book {index + 1}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
    // <View style={styles.container}>
    //   <Text style={styles.title}>App</Text>
    //   </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: '#1a1a1a'},
  card: {
    paddingVertical: 15,
    margin: 6,
    backgroundColor: '#eee',
    width: '48%',
    height: '300',
    borderRadius: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 35 : 0,
  },
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 18,
    fontSize: 26,
  },
});
