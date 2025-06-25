import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const GAP = 12;
const CARD_WIDTH = Math.floor((width - GAP * 3) / 2);

const dummyPDFs = [
  { id: '1', title: 'Sample PDF', size: '2.5 MB', pages: 4, uri: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: '2', title: 'Dummy PDF', size: '1.5 MB', pages: 1, uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: '3', title: 'Invoice Sample', size: '22.5 MB', pages: 1, uri: 'https://www.princexml.com/samples/invoice-colorful/invoicesample.pdf' },
  { id: '4', title: 'Example PDF', size: '32.5 MB', pages: 3, uri: 'https://www.princexml.com/samples/usenix/example.pdf' },
  { id: '5', title: 'Essay', size: '55 MB', pages: 408, uri: 'https://www.princexml.com/samples/essay.pdf' },
  { id: '6', title: 'Magic Book', size: '2.56 MB', pages: 2, uri: 'https://www.princexml.com/samples/magic6/magic.pdf' },
];

export default function Home({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPDFs, setFilteredPDFs] = useState([]);

  useEffect(() => {
    const sorted = [...dummyPDFs].sort((a, b) => a.title.localeCompare(b.title));
    const filtered = sorted.filter(pdf =>
      pdf.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPDFs(filtered);
  }, [searchQuery]);

  const openPDF = item => {
    navigation.navigate('ViewScreen', {
      url: item.uri,
      pages: item.pages,
      title: item.title,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PDF Viewer</Text>

      <TextInput
        placeholder="Search PDF by name..."
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredPDFs}
        numColumns={2}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: GAP }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openPDF(item)}>
            <Image source={require('../assets/pdf.webp')} style={styles.image} />
            <View style={styles.cardText}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>Size: {item.size}</Text>
              <Text style={styles.subtitle}>Pages: {item.pages}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: GAP,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 35 : 0,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 18,
  },
  searchInput: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    width: CARD_WIDTH,
    alignItems: 'center',
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 70,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardText: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
  },
});
