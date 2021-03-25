import React from 'react';
import {View,Text, StyleSheet,Image, FlatList, TextInput} from 'react-native';
import database from '@react-native-firebase/database';
import Header from '../components/Header';
import Button from '../components/Button';


class ActualitePage extends React.Component {  

  state = {titleMsg:'',message:''};

    sendData() {
      const {titleMsg,message} = this.state;

      if(titleMsg!='' && message!='')
      {
        database()
        .ref(`/Actualite/`)
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

          <Header headerText={'Actualités'}/>

          <View style={styles.imageContainer}>
              <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View>
          
          <View style={styles.PublicitesStyleContainer}>
             
            <Text>Titre de l'actualité:</Text>
            <TextInput style={styles.textInput} value={this.state.titleMsg} onChangeText={(title)=>this.setState({titleMsg:title})}/>
            <Text>Sujet de l'actualité:</Text>
            <TextInput style={styles.textInput} value={this.state.message} onChangeText={(title)=>this.setState({message:title})}/>
            <Button Label={"Envoyer l'actualité"} onButtonPress={this.sendData.bind(this)}/>

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
    backgroundColor:'#EEF1F3',
    color:'black',
    width:280,
    height:40,
    marginBottom:20,
  }

})


export default ActualitePage;

