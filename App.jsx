   import { StyleSheet, Text, View, ViewComponent } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import ViewScreen from './src/screens/ViewScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return(
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        title: 'PDF Viewer',
        headerStyle: {
          backgroundColor: '#aaaaaa',
        },
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ViewScreen"
      component={ViewScreen}
    />
  </Stack.Navigator>
  )
}

  console.log("Started")
const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
      // <View>
      //   <Text>App started</Text>
      // </View>
  )
}

export default App

// const styles = StyleSheet.create({})