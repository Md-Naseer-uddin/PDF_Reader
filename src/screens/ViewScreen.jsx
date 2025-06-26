// import {
//   ActivityIndicator,
//   Dimensions,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useRef, useState} from 'react';
// import Pdf from 'react-native-pdf';
// import {useRoute} from '@react-navigation/native';

// const ViewScreen = () => {
//   const route = useRoute();
//   const {url, pages, title} = route.params;

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(pages || 1);

//   const pdfRef = useRef(null);
//   const goToNextPage = () => {
//     if (pdfRef.current && currentPage < totalPages) {
//       const nextPage = currentPage + 1;
//       setCurrentPage(nextPage);
//       pdfRef.current.setPage(currentPage + 1); // this triggers visual change
//     }
//   };

//   const goToPreviousPage = () => {
//     if (pdfRef.current && currentPage > 1) {
//       const prevPage = currentPage - 1;
//       setCurrentPage(prevPage);
//       pdfRef.current.setPage(currentPage - 1); // this triggers visual change
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Pdf
//         trustAllCerts={false}
//         // horizontal
//         // enablePaging={true}
//         ref={pdfRef}
//         source={{uri: url}}
        
//         onLoadComplete={(numberOfPages) => setTotalPages(numberOfPages)}
        
    
//         onPageChanged={(page, numberOfPages) => {
//           console.log(`Current page: ${page}`);
//           setCurrentPage(page); // keep UI in sync
//         }}
//         onError={error => {
//           console.log(error);
//         }}
//         onPressLink={uri => {
//           console.log(`Link pressed: ${uri}`);
//         }}
//         style={styles.pdf}
//       />
//       <View style={styles.navigationContainer}>
//         <TouchableOpacity style={styles.navButton} onPress={goToPreviousPage}>
//           <Text style={styles.navButtonText}>Previous</Text>
//         </TouchableOpacity>
//         <Text style={styles.pageInfo}>
//           {currentPage} / {totalPages}
//         </Text>
//         <TouchableOpacity style={styles.navButton} onPress={goToNextPage}>
//           <Text style={styles.navButtonText}>Next</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ViewScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   pdf: {
//     flex: 1,
//     width: '100%',
//   },
//   navigationContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#f2f2f2',
//   },
//   navButton: {
//     padding: 10,
//     backgroundColor: '#007bff',
//     borderRadius: 5,
//   },
//   navButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   pageInfo: {
//     fontWeight: 'bold',
//   },
// });
