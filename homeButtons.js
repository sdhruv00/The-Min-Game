//homeButtons.js
//The Min Game
//Created by Dhruv Sharma on 2020-06-18
//Copyright © 2020 Dhruv Sharma. All rights reserved. 

import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

export default function FlatButton({ text, onPress }) {
    return(
        <TouchableOpacity onPress={ onPress }>
            <View style = {styles.button}>
                <Text style = {styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10, 
        paddingVertical: 25, 
        paddingHorizontal: 30, 
        backgroundColor: '#A8D5BAFF'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 25, 
        textAlign: 'center'
    }
});