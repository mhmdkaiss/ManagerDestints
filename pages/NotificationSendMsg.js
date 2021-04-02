import React from 'react';
import {View,Text, StyleSheet,Image, FlatList, TextInput} from 'react-native';
import database from '@react-native-firebase/database';
import Header from '../components/Header';
import Button from '../components/Button';


class NotificationSendMsgPage extends React.Component {  

  state = {titleMsg:'',message:''};

    sendData() {
      const {titleMsg,message} = this.state;

      if(titleMsg!='' && message!='')
      {
        database()
        .ref(`/Notifications/`)
        .push({
          // id: auth().currentUser.uid,
          titleMsg: titleMsg,
          message: message,
        });
      }
      
      alert('Notification envoyer');
      this.setState({titleMsg:'',message:''});
    }
 
  render(){

    return (
        
        <View style={styles.containerForm}>

          <Header Label={'Notification'}/>

          <View style={styles.imageContainer}>
              <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View>
          
          <View style={styles.PublicitesStyleContainer}>
             
            <Text>Titre de la message:</Text>
            <TextInput style={styles.textInput} value={this.state.titleMsg} onChangeText={(title)=>this.setState({titleMsg:title})}/>
            <Text>Sujet de la message:</Text>
            <TextInput style={styles.textInput} value={this.state.message} onChangeText={(title)=>this.setState({message:title})}/>
            <Button Label={"Envoyer notification"} onButtonPress={this.sendData.bind(this)}/>

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


export default NotificationSendMsgPage;

