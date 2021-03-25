import React from 'react';
import {View,Text, StyleSheet,Image, FlatList, TextInput} from 'react-native';
import database from '@react-native-firebase/database';
import Header from '../components/Header';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';


class LocationPage extends React.Component {  

  state = {titleMsg:'',message:''};

    sendData() {
      const {titleMsg,message} = this.state;

      if(titleMsg!='' && message!='')
      {
        database()
        .ref(`/Publicities/`)
        .push({
          // id: auth().currentUser.uid,
          titleMsg: titleMsg,
          message: message,
        });
      }
      
      this.setState({titleMsg:'',message:''});
    }
 
  render(){

    return (
        
        <View style={styles.containerForm}>

          <Header headerText={'Publicity'}/>

          <View style={styles.imageContainer}>
              <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View>
          
          <View style={styles.PublicitesStyleContainer}>
             
            <Text>Send Title Message:</Text>
            <TextInput style={styles.textInput} value={this.state.titleMsg} onChangeText={(title)=>this.setState({titleMsg:title})}/>
            <Text>Send Message:</Text>
            <TextInput style={styles.textInput} value={this.state.message} onChangeText={(title)=>this.setState({message:title})}/>
            <Button Label={'Envoyer Pub'} onButtonPress={this.sendData.bind(this)}/>

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
  attestationtypeContainer:{
      backgroundColor:'grey',
      margin:10,
      padding:10,
  }
  ,
  textInput:{
    backgroundColor:'grey',
    color:'white',
    width:280,
    height:40,
    marginBottom:20,
  }

})


export default LocationPage;

