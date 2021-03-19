import React from 'react';
import {StyleSheet,Text,TouchableOpacity} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const CardSection = ({Label,onButtonPress}) => {
    return(
       <TouchableOpacity style={{flex:1}} onPress={onButtonPress}>
        <LinearGradient colors={['#3b5998', '#8C28C8', '#3b5998']} style={styles.linearGradient} >
            <Text style={styles.buttonText}>
              {Label}
            </Text>
        </LinearGradient>
       </TouchableOpacity>
   
    );
};

const styles = StyleSheet.create({
   
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius:100,
      },
      buttonText: {
        fontSize: 16,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
})

export default CardSection;