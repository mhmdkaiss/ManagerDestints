import React from 'react';
import {TouchableOpacity,Text,  StyleSheet} from 'react-native';
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

const HButton = ({label,onButtonPress}) => {
    return(
        <TouchableOpacity style={styles.ButtonStyle} onPress={onButtonPress}>
            <Text style={styles.textStyle}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    ButtonStyle:{
        backgroundColor:'#4548E9',
        borderRadius:25,
        margin:1*vh,
        width:80*vw,
        height:8*vh,
    }
    ,
    textStyle:{
        color:'white',
        fontSize:2.8*vh,
        padding:2*vh,
        alignSelf:'center'
    }
})

export default HButton;