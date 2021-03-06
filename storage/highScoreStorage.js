//highScoreStorage.js
//The Min Game
//Created by Dhruv Sharma on 2020-06-18
//Copyright © 2020 Dhruv Sharma. All rights reserved. 

import { AsyncStorage } from 'react-native';

export const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(`@MinimumGame:${key}`, String(value));
    } catch (error) {
      console.log(error);
    
   }
};
   
   export const retrieveData = async key => {
    try {
      const value = await AsyncStorage.getItem(`@MinimumGame:${key}`);
      if (value !== null) {
        return value;
    } 
    } catch (error) {
      console.log(error);
   }
};