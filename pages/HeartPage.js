import React from 'react';
import {View,Text, StyleSheet,Image} from 'react-native';
import HButton from '../components/heartPage/HButton';

var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

class HeartPage extends React.Component {  

  navigatetoActualite(){
    this.props.navigation.navigate('ActualitePage');
  }
 
  navigatetoDocumentation(){
    this.props.navigation.navigate('DocumentationPage');
  }

  navigatetoRepartition(){
    this.props.navigation.navigate('RepartitionPage');
  }

  navigatetoInfoGeneral(){
    this.props.navigation.navigate('InfoGeneralPage');
  }

  render(){
      return (
        
        <View style={styles.containerForm}>

          <View style={styles.imageContainer}>
              <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View>
          
          <View style={styles.PublicitesStyleContainer}>
              <HButton label={'Actualités'} onButtonPress={this.navigatetoActualite.bind(this)}/>
              <HButton label={'Documents'} onButtonPress={this.navigatetoDocumentation.bind(this)}/>
              <HButton label={'Répartition'} onButtonPress={this.navigatetoRepartition.bind(this)}/>
              <HButton label={'Infos Generales'} onButtonPress={this.navigatetoInfoGeneral.bind(this)}/>
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
    height:22*vh,
    width:25*vw,
  }
  ,
  imageContainer:{
    flex:1,
  }
  ,
  PublicitesStyleContainer:{
    flex:2,
    justifyContent:'center',
    alignItems:'center',
  }

})


export default HeartPage;

