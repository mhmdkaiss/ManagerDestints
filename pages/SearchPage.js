import React from 'react';
import {View,Text, StyleSheet,Image} from 'react-native';
import HButton from '../components/heartPage/HButton';

class searchPage extends React.Component {  
 
  render(){
      return (
        
        <View style={styles.containerForm}>

          <View style={styles.imageContainer}>
              <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View>
          
          <View style={styles.PublicitesStyleContainer}>
              <HButton label={'Paiement cotistation'}/>
              <HButton label={'Attestation'}/>
              <HButton label={'Notifications'}/>
          </View>
        
        
        </View>
           
    );
  };
}

const styles= StyleSheet.create({
  containerForm:{
    flex:1,
    backgroundColor:'white'
  }
  ,
  imageStyle:{
    alignSelf:'flex-end',
    height:150,
    width:100,
  }
  ,
  titleStyle:{
  }
  ,
  PublicitesStyleContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }

})


export default searchPage;

