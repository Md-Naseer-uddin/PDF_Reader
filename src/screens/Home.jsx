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
    pages: 4,
    uri: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf"
  },
  {
    id: '2',
    title: 'Dummy PDF',
    size: '1.5 MB',
    pages: 1,
    uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: '3',
    title: 'Invoice Sample',
    size: '22.5 MB',
    pages: 1,
    uri: "https://www.princexml.com/samples/invoice-colorful/invoicesample.pdf"
  },
  {
    id: '4',
    title: 'Example PDF',
    size: '32.5 MB',
    pages: 3,
    uri: "https://www.princexml.com/samples/usenix/example.pdf"
  },{
    id: '5',
    title: 'Essay',
    size: '55 MB',
    pages: 408,
    uri: "https://www.princexml.com/samples/essay.pdf"
  },
  {
    id: '6',
    title: 'Magic Book',
    size: '2.56 MB',
    pages: 2,
    uri: "https://www.princexml.com/samples/magic6/magic.pdf"
  },
];

export default function Home({navigation}) {
  const openPDF = item => {
    navigation.navigate('ViewScreen', {url: item.uri,pages: item.pages, title: item.title});
  };

  console.log('Started2');
  console.log('StatusBar height:', StatusBar.currentHeight);
  console.log('Platform:', Platform.OS);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PDF Viewer</Text>
      {/* Alert.alert('Welcome to PDF Viewer'); */}

      <View style={{flex: 1, paddingHorizontal: 10}}>
        <FlatList
          data={dummyPDFs}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          // keyExtractor={(item, index) => index.toString()}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => (
            <TouchableOpacity style={styles.card} onPress={() => openPDF(item)}>
              <Image
                source={require('../assets/pdf.webp')}
                style={{
                  width: 90,
                  alignSelf: 'center',
                  height: 200,
                  resizeMode: 'contain',
                }}
              />
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.title}>Size: {item.size}</Text>
              <Text style={styles.title}>Pages: {item.pages}</Text>
              </View>
              {/* <Text style={styles.title}>Book {index + 1}</Text> */}
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
    margin: 1,
    fontSize: 20,
  },
});
