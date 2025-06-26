import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useRef, useLayoutEffect } from 'react';
import Pdf from 'react-native-pdf';
import { useRoute, useNavigation } from '@react-navigation/native';

const ViewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { url, pages, title } = route.params;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(pages || 1);
  const [isHorizontal, setIsHorizontal] = useState(true);

  const pdfRef = useRef(null);

  // Set the screen title
  useLayoutEffect(() => {
    if (title) {
      navigation.setOptions({ title });
    }
  }, [navigation, title]);

  const toggleScrollDirection = () => {
    setIsHorizontal(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <Pdf
        ref={pdfRef}
        trustAllCerts={false}
        source={{ uri: url }}
        horizontal={isHorizontal}
        enablePaging={isHorizontal}
        onLoadComplete={(numberOfPages) => setTotalPages(numberOfPages)}
        onPageChanged={(page) => setCurrentPage(page)}
        onError={(error) => console.log('PDF load error:', error)}
        onPressLink={(uri) => console.log(`Link pressed: ${uri}`)}
        style={styles.pdf}
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleScrollDirection}>
          <Text style={styles.toggleButtonText}>
            {isHorizontal ? 'Switch to Vertical' : 'Switch to Horizontal'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.pageInfo}>
          Page {currentPage} / {totalPages}
        </Text>
      </View>
    </View>
  );
};

export default ViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
  bottomBar: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  toggleButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginBottom: 6,
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pageInfo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
});
