import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import {storeData, retrieveData} from './storage/4x4highScoreStorage';
import ResetButton from './gameResetButton';

export default class minGame4by4 extends React.Component {

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
    var randomNum10 = Math.round(Math.random() * 99) + 1;
      var randomNum11 = Math.round(Math.random() * 99) + 1;
      var randomNum12 = Math.round(Math.random() * 99) + 1;
      var randomNum13 = Math.round(Math.random() * 99) + 1;
      var randomNum14 = Math.round(Math.random() * 99) + 1;
      var randomNum15 = Math.round(Math.random() * 99) + 1;
      var randomNum16 = Math.round(Math.random() * 99) + 1;
      
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
     randNum10 : randomNum10,
     randNum11 : randomNum11,
     randNum12 : randomNum12,
     randNum13 : randomNum13,
     randNum14 : randomNum14,
     randNum15 : randomNum15,
     randNum16 : randomNum16,

     seconds : 10,

     score : 0, 

     i : 0,

     highScore: 0, 

      gameState: [
        [randomNum1,randomNum2,randomNum3, randomNum4],
        [randomNum5,randomNum6, randomNum7, randomNum8],
        [randomNum9, randomNum10, randomNum11, randomNum12],
        [randomNum13, randomNum14, randomNum15, randomNum16]
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
    var randomNum10 = Math.round(Math.random() * 99) + 1;
      var randomNum11 = Math.round(Math.random() * 99) + 1;
      var randomNum12 = Math.round(Math.random() * 99) + 1;
      var randomNum13 = Math.round(Math.random() * 99) + 1;
      var randomNum14 = Math.round(Math.random() * 99) + 1;
      var randomNum15 = Math.round(Math.random() * 99) + 1;
      var randomNum16 = Math.round(Math.random() * 99) + 1;

    this.setState({gameState:[
        [randomNum1,randomNum2,randomNum3, randomNum4],
        [randomNum5,randomNum6, randomNum7, randomNum8],
        [randomNum9, randomNum10, randomNum11, randomNum12],
        [randomNum13, randomNum14, randomNum15, randomNum16]
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
     randNum10 : randomNum10,
     randNum11 : randomNum11,
     randNum12 : randomNum12,
     randNum13 : randomNum13,
     randNum14 : randomNum14,
     randNum15 : randomNum15,
     randNum16 : randomNum16,

    seconds : 10
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

    async updateScore (score){
        await appScoreStorage4x4.updateHighScore(score);
    }

    checkScore = (score) => {
      if((score % 5) === 0 ){
        this.state.i++;
      } 
      else if((score % 25) === 0 ){
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
      userAns <= this.state.randNum9 &&
      userAns <= this.state.randNum10 &&
      userAns <= this.state.randNum11 &&
      userAns <= this.state.randNum12 &&
      userAns <= this.state.randNum13 &&
      userAns <= this.state.randNum14 &&
      userAns <= this.state.randNum15 &&
      userAns <= this.state.randNum16){
        return 1;
      }
      return -1;
      
  }

  timerTing = (seconds) =>{
    if(seconds === 0 ) { 
      Alert.alert("Times Up!"); 
      this.state.score = 0;
      this.intializeGame();
      this.state.i = 0;
    }

  }

  render() {
    var seconds = this.state.seconds;
    var score = this.state.score;
    var highScore = this.state.highScore;

    return (
      <View style={styles.container}>

        {this.timerTing(seconds)}

        
        <View style = {{flexDirection: 'row'}}>
          <Text style = {styles.userStats}> Timer: {this.state.seconds} </Text>
        </View>

        <Text style = {styles.Scores}>Score: {score}  HighScore: {highScore}</Text>

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
          
          <TouchableOpacity onPress = {() => this.onTilePress(0,3)} style = {styles.tile}>
           <Text style = {styles.textStyle}>{this.state.randNum4}</Text>
          </TouchableOpacity>

         </View>

         <View style = {{flexDirection: 'row'}}>

          <TouchableOpacity onPress = {() => this.onTilePress(1,0)}style = {styles.tile}>
           <Text style = {styles.textStyle}>{this.state.randNum5}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.onTilePress(1,1)} style = {styles.tile1}>
           <Text style = {styles.textStyle}>{this.state.randNum6}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.onTilePress(1,2)} style = {styles.tile}>
           <Text style = {styles.textStyle}>{this.state.randNum7}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.onTilePress(1,3)}style = {styles.tile1}>
           <Text style = {styles.textStyle}>{this.state.randNum8}</Text>
          </TouchableOpacity>

         </View>

         <View style = {{flexDirection: 'row'}}>

         <TouchableOpacity onPress = {() => this.onTilePress(2,0)} style = {styles.tile1}>
           <Text style = {styles.textStyle}>{this.state.randNum9}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.onTilePress(2,1)} style = {styles.tile}>
           <Text style = {styles.textStyle}>{this.state.randNum10}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.onTilePress(2,2)} style = {styles.tile1}>
           <Text style = {styles.textStyle}>{this.state.randNum11}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.onTilePress(2,3)} style = {styles.tile}>
           <Text style = {styles.textStyle}>{this.state.randNum12}</Text>
          </TouchableOpacity>

         </View>

         <View style = {{flexDirection: 'row'}}>

         <TouchableOpacity onPress = {() => this.onTilePress(3,0)} style = {styles.tile}>
           <Text style = {styles.textStyle}>{this.state.randNum13}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.onTilePress(3,1)} style = {styles.tile1}>
           <Text style = {styles.textStyle}>{this.state.randNum14}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.onTilePress(3,2)} style = {styles.tile}>
           <Text style = {styles.textStyle}>{this.state.randNum15}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.onTilePress(3,3)} style = {styles.tile1}>
           <Text style = {styles.textStyle}>{this.state.randNum16}</Text>
          </TouchableOpacity>

         </View>

    <View style={{paddingTop: 10}} />
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
    width: 76, 
    height: 76,
    backgroundColor: '#FEAE51FF'
  },
  tile: {
    borderWidth: 1, 
    width: 76, 
    height: 76,
    backgroundColor: '#FFD653FF'
  },
  textStyle: {
    fontSize: 38, 
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
    paddingBottom: 0,
    color: '#FFFDD0'
  },
  Scores: {
    fontSize: 20, 
    fontWeight: 'bold', 
    paddingBottom: 8,
    color: '#FFFDD0'

  }
});
