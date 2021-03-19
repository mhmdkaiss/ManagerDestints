import React,{Component} from 'react';
import {TextInput, View, Text,StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Input = ({iconName,iconColor,value,onChangeText,placeholder,secureTextEntry}) =>  {
  state = {text:''};
  const {containerstyle,inputstyle,iconStyle}=styles;
  
        return (
        <View style={containerstyle}>
            <MaterialCommunityIcons style={iconStyle} name={iconName} color={iconColor} size={20}/>
            
            <TextInput 
            style={inputstyle}
            value={value}
            onChangeText={onChangeText}
            autoCorrect={false}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

const styles= StyleSheet.create({
    containerstyle:{
        flexDirection:'row',
        flex:1,
        height:40,
        alignItems:'center',
        borderRadius:100
    },
    iconStyle:{
        flex:1,
        paddingLeft:10,
    },
    inputstyle:{
        flex:8,
        fontSize:14,
    }
})

export default Input;

