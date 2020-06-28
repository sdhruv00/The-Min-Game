import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import {storeData, retrieveData} from './storage/3x3highScoreStorage';
import ResetButton from './gameResetButton';

export default class minGame extends React.Component {

  constructor(props) {
    super(props); 

      var randomNum1 = Math.round(Math.random() * 99) + 1;
      var randomNum2 = Math.round(Math.random() * 99) + 1;
      var randomNum3 = Math.round(Math.random() * 99) + 1;
      var randomNum4 = Math.round(Math.random() * 99) + 1;
      var randomNum5 = Math.round(Math.random() * 99) + 1;
      var randomNum6 = Math.round(Math.random() * 99) + 1;
      var randomNum7 = Math.round(Math.random() * 99) + 1;
      var randomNum8 = Math.round(Math.random() * 99) + 1;
      var randomNum9 = Math.round(Math.random() * 99) + 1;
      
    this.state = {
     randNum1 : randomNum1,
     randNum2 : randomNum2,
     randNum3 : randomNum3,
     randNum4 : randomNum4,
     randNum5 : randomNum5,
     randNum6 : randomNum6,
     randNum7 : randomNum7,
     randNum8 : randomNum8,
     randNum9 : randomNum9,

     seconds : 10,

     score : 0,
     
     i : 0,


     highScore: 0, 

      gameState: [
        [randomNum1,randomNum2,randomNum3],
        [randomNum4,randomNum5,randomNum6],
        [randomNum7,randomNum8,randomNum9]
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
    var randomNum1 = Math.round(Math.random() * 99) + 1;
      var randomNum2 = Math.round(Math.random() * 99) + 1;
      var randomNum3 = Math.round(Math.random() * 99) + 1;
      var randomNum4 = Math.round(Math.random() * 99) + 1;
      var randomNum5 = Math.round(Math.random() * 99) + 1;
      var randomNum6 = Math.round(Math.random() * 99) + 1;
      var randomNum7 = Math.round(Math.random() * 99) + 1;
      var randomNum8 = Math.round(Math.random() * 99) + 1;
      var randomNum9 = Math.round(Math.random() * 99) + 1;

    this.setState({gameState:[
      [randomNum1,randomNum2,randomNum3],
      [randomNum4,randomNum5,randomNum6],
      [randomNum7,randomNum8,randomNum9]
    ],
    randNum1 : randomNum1,
    randNum2 : randomNum2,
    randNum3 : randomNum3,
    randNum4 : randomNum4,
    randNum5 : randomNum5,
    randNum6 : randomNum6,
    randNum7 : randomNum7,
    randNum8 : randomNum8,
    randNum9 : randomNum9,

    seconds : 10,

  });
  }
  
  onTilePress = async (row,col) => { 
    //make copy of the array

    var arr = this.state.gameState.slice();
    var checkValue = arr[row][col];

    //check Winner 
    var winner = this.getWinner(checkValue);
    
      if(winner == 1){
        this.state.score++; 
        this.state.seconds = 10;
        this.intializeGame();

        if(this.state.score > this.state.highScore){
          this.setState(state => ({ highScore: state.score }));
          storeData('highScore', this.state.score);
        }

        this.checkScore(this.state.score);
        var newSeconds = (10 - (10 * (0.1 * this.state.i)));
        this.setState({seconds: Math.round(newSeconds)});
      }
      else if (winner == -1){
        Alert.alert("No winner this time!");
        this.state.seconds = 0; 
        this.state.score = 0;
        this.intializeGame();
        this.state.i = 0;
        
      }
    }

    checkScore = (score) => {
      if((score % 3) === 0 ){
        this.state.i++;
      }
      else if((score % 18) === 0 ){
        this.state.seconds = 10;
        this.state.i = 0; 
      }
    }

  onNewGamePress = () =>{ 
    this.state.score = 0;
    this.intializeGame();
    this.state.i = 0;
  }


  getWinner = (userAns) => {
    if(userAns <= this.state.randNum1 && 
      userAns <= this.state.randNum2 && 
      userAns <= this.state.randNum3 && 
      userAns <= this.state.randNum4 &&
      userAns <= this.state.randNum5 &&
      userAns <= this.state.randNum6 &&
      userAns <= this.state.randNum7 &&
      userAns <= this.state.randNum8 &&
      userAns <= this.state.randNum9){
        return 1;
      }
      return -1;
  }

  timerTing = (seconds) =>{
    if(seconds < 0 || seconds === 0) { 
      Alert.alert("Times Up!"); 
      this.state.score = 0;
      this.intializeGame();
      this.state.i = 0;
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

          <TouchableOpacity onPress = {() => this.onTilePress(0,2)} style = {styles.tile1}>
           <Text style = {styles.textStyle}>{this.state.randNum3}</Text>
          </TouchableOpacity> 

         </View>

         <View style = {{flexDirection: 'row'}}>

          <TouchableOpacity onPress = {() => this.onTilePress(1,0)}style = {styles.tile}>
           <Text style = {styles.textStyle}>{this.state.randNum4}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.onTilePress(1,1)} style = {styles.tile1}>
           <Text style = {styles.textStyle}>{this.state.randNum5}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.onTilePress(1,2)} style = {styles.tile}>
           <Text style = {styles.textStyle}>{this.state.randNum6}</Text>
          </TouchableOpacity>

         </View>

         <View style = {{flexDirection: 'row'}}>

         <TouchableOpacity onPress = {() => this.onTilePress(2,0)} style = {styles.tile1}>
           <Text style = {styles.textStyle}>{this.state.randNum7}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.onTilePress(2,1)} style = {styles.tile}>
           <Text style = {styles.textStyle}>{this.state.randNum8}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.onTilePress(2,2)} style = {styles.tile1}>
           <Text style = {styles.textStyle}>{this.state.randNum9}</Text>
          </TouchableOpacity>

         </View>

    <View style={{paddingTop: 20}} />

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
    width: 85, 
    height: 85,
    backgroundColor: '#FFD653FF'
  },
  tile: {
    borderWidth: 1, 
    width: 85, 
    height: 85,
    backgroundColor: '#FEAE51FF'
  },
  textStyle: {
    fontSize: 45, 
    fontWeight: 'bold',
    alignItems: 'center', 
    textAlign: 'center',
    paddingTop: 20,
    color: 'white'
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
