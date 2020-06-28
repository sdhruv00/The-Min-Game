import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import game from './minGame';
import game4x4 from './minGame4by4';
import react2x2 from './react2by2';
import HomeScreen from './home';

const Drawer = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <Drawer.Navigator initialRouteName="Menu">
        <Drawer.Screen name="Menu" options={{headerShown: false}} component={HomeScreen} />
        <Drawer.Screen name="MinGame"  component={game} options={{
          headerTintColor: '#eee',
          title: '3x3 board',
          headerTitleStyle: {
            fontSize: 25
          },
          headerStyle: {
            backgroundColor: '#7E57C2',
            height: 80
          }
        }} />
        <Drawer.Screen name="MinGame4x4" component={game4x4} options={{
          headerTintColor: '#eee',
          title: '4x4 board',
          headerTitleStyle: {
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: '#7E57C2',
            height: 80,
          }
        }}/>
        <Drawer.Screen name="React" component={react2x2} options={{
          headerTintColor: '#eee',
          title: 'React board',
          headerTitleStyle: {
            fontSize: 25

          },
          headerStyle: {
            backgroundColor: '#7E57C2',
            height: 80
          }
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
