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
        backgroundColor: '#CDB599FF'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 25, 
        textAlign: 'center'
    }
});