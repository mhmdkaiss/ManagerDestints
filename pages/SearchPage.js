import React from 'react';
import {View,Text, StyleSheet,Image, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import HButton from '../components/heartPage/HButton';

class searchPage extends React.Component {  

  logout(){
    firebase.auth().signOut();
    // this.props.navigation.navigate('SignIn');
  }
 
  render(){
      return (
        
        <View style={styles.containerForm}>

          <TouchableOpacity style={styles.logOutButton} onPress={this.logout.bind(this)}>
            <Text style={{color:'white',fontSize:18}}>Déconnexion</Text>
          </TouchableOpacity>

          <View style={styles.imageContainer}>
              <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View>
          
          <View style={styles.PublicitesStyleContainer}>
              <HButton label={'Paiement cotisation'}/>
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
  ,
  logOutButton:{
    backgroundColor:'red',
    alignItems:'center',
    paddingRight:20,
  }

})


export default searchPage;

