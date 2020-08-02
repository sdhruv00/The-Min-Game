//react2by2.js
//The Min Game
//Created by Dhruv Sharma on 2020-06-18
//Copyright © 2020 Dhruv Sharma. All rights reserved. 

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button, AsyncStorage } from 'react-native';
import ResetButton from './gameResetButton';
import {storeData, retrieveData} from './storage/highScoreStorage'

export default class minGame2by2 extends React.Component {

  constructor(props) {
    super(props); 

      var randomNum1 = Math.round(Math.random() * 100) + 1;
      var randomNum2 = Math.round(Math.random() * 100) + 1;

      
    this.state = {
     randNum1 : randomNum1,
     randNum2 : randomNum2,

     seconds : 2,

     score : 0, 

     highScore: 0, 

      gameState: [
        [randomNum1,randomNum2]
        
      ],
    }
  }

  

  async componentDidMount(){
    this.myInterval = setInterval(() => {
      var seconds = this.state.seconds;
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }))
      }
      }, 1000);

    this.intializeGame();

    retrieveData('highScore').then(val => this.setState({ highScore: val || 0 }));
  }

  intializeGame = () =>{
    
    var randomNum1 = Math.round(Math.random() * 100) + 1;
    var randomNum2 = Math.round(Math.random() * 100) + 1;

    this.setState({gameState:[
        [randomNum1,randomNum2]
    ],
    randNum1 : randomNum1,
     randNum2 : randomNum2,

    seconds : 2,
    
  });


  }
  
  onTilePress =(row,col) => { 
    //make copy of the array
    

    var arr = this.state.gameState.slice();
    var checkValue = arr[row][col];

    //check Winner 
    var winner = this.getWinner(checkValue);
    
      if(winner == 1){
        this.state.score++; 
        this.state.seconds = 2;
        this.intializeGame();

        if(this.state.score > this.state.highScore){
          this.setState(state => ({ highScore: state.score }));
          storeData('highScore', this.state.score);
        } 
      }
      else if (winner == -1){
        Alert.alert("No winner this time!");
        this.state.seconds = 0; 
        this.state.score = -1;
        
      }
    }

  onNewGamePress = () =>{ 
    this.state.score = 0;
    this.intializeGame();
  }


  getWinner = (userAns) => {
    if(userAns <= this.state.randNum1 && 
      userAns <= this.state.randNum2){
        return 1;
      }
      return -1;
  }

  timerTing = (seconds) =>{
    if(seconds === 0 ) { 
      Alert.alert("Times Up!"); 
      this.state.score = -1;

    }

  }

  render() {
    var seconds = this.state.seconds;
    var score = this.state.score;

    return (
      <View style={styles.container}>

        {this.timerTing(seconds)}

        <View style = {{flexDirection: 'row'}}>
          <Text style = {styles.userStats}>  Timer: {this.state.seconds}   </Text>

        </View>

        <Text style = {styles.Scores}>Score: {score}  HighScore: {this.state.highScore}</Text>

         <View style = {{flexDirection: 'row'}}>

          <TouchableOpacity onPress = {() => this.onTilePress(0,0)} style = {styles.tile1}>
           <Text style = {styles.textStyle}>{this.state.randNum1}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.onTilePress(0,1)} style = {styles.tile}>
           <Text style = {styles.textStyle}>{this.state.randNum2}</Text>
          </TouchableOpacity>

         </View>

         <View style = {{flexDirection: 'row'}}>
             
         </View>
    
         

    <View style={{paddingTop: 50}} />
    <ResetButton text = 'Reset' onPress={this.onNewGamePress} />
    </View>


    
    );
  }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7E57C2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile1: {
    borderWidth: 1, 
    width: 100, 
    height: 100,
    backgroundColor: '#FEAE51FF'
  },
  tile: {
    borderWidth: 1, 
    width: 100, 
    height: 100,
    backgroundColor: '#FFD653FF'
  },
  textStyle: {
    fontSize: 50, 
    fontWeight: 'bold',
    alignItems: 'center', 
    textAlign: 'center',
    paddingTop: 20,
    color: 'white', 
  },
  hide: {
    color: 'white'
  },
  userStats: {
    fontSize: 25, 
    fontWeight: 'bold', 
    paddingBottom: 8,
    color: '#FFFDD0'
  },
  Scores: {
    fontSize: 20, 
    fontWeight: 'bold', 
    paddingBottom: 8,
    color: '#FFFDD0'
  }
});
