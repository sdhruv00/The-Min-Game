import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity,TouchableWithoutFeedback, Keyboard, Modal, Button} from 'react-native';
import FlatButton from './homeButtons';
import FlatButton1 from './homeButton1';
import FlatButton2 from './homeButton2';

export default function Home({navigation}){
    return(


        <View style={styles.backGround}>

        <View style = {styles.title}>
          <Text style = {styles.titleText}>The Min Game</Text>
        </View>

        <View style={styles.buttonStyle}>
          <FlatButton text = '3x3 Board' onPress={() => navigation.navigate('MinGame')} />
        </View>

        <View style={styles.buttonStyle}>
          <FlatButton1 text = '4x4 Board' onPress={() => navigation.navigate('MinGame4x4')} />
        </View>

        <View style={styles.buttonStyle}>
          <FlatButton2 text = 'React Game' onPress={() => navigation.navigate('React')} />
        </View>

      </View>
    )
}

const styles = StyleSheet.create({
  backGround: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'skyblue'
  },
  title: {
    paddingBottom: 50, 
  }, 
  titleText: {
    fontSize: 40, 
    fontWeight: 'bold',
    color: 'white'
  },
  buttonStyle: {
    paddingBottom: 20
  }

});