import React from 'react';
import {View,StyleSheet} from 'react-native';

const CardSection = (props) => {
    return(
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle:{
        marginBottom:10,
        backgroundColor:'white',
        justifyContent:'flex-start',
        flexDirection:'row',
        borderColor:'#ddd',
        position:'relative', 
        borderRadius:100,
    }
})

export default CardSection;