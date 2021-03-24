import React from 'react';
import {TouchableOpacity,Text,  StyleSheet} from 'react-native';

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
        margin:10,
        width:270,
        height:70,
    }
    ,
    textStyle:{
        color:'white',
        fontSize:20,
        padding:15,
        alignSelf:'center'
    }
})

export default HButton;