import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen_01 from './app/screen/Screen_01';
import Screen_02 from './app/screen/Screen_02';
import Screen_03 from './app/screen/Screen_03';
import store from './lib/store';

const Stack = createStackNavigator();

function Main() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={
          { headerShown: false }
        }>
          <Stack.Screen name="screen01" component={Screen_01} />
          <Stack.Screen name="screen02" component={Screen_02} />
          <Stack.Screen name="screen03" component={Screen_03} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});
