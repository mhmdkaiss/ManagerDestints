import React , {useState,useEffect} from 'react';
import {View,Text, StyleSheet,Image, FlatList, TextInput} from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import firestore from '@react-native-firebase/firestore';


  const NotificationBroadcast = ({route})  => {


  const [titleMsg, setTitleMsg] = useState('');
  const [idsArray, setidsArray] = useState([]);
  const [messagesArray,setMessagesArray] = useState([])

  useEffect(() => {
      firestore()
      .collection('Dentists')
      .get()
      .then(querySnapshot => {
          var array=[];
          var dentistsObj={};
          var array2=[];
          querySnapshot.forEach(documentSnapshot => {
             array.push(documentSnapshot.id)
             dentistsObj={id: [documentSnapshot.id], messagesArr:[documentSnapshot.data().messages]}
          
             array2.push(dentistsObj);
          });
          setidsArray(array);
          setMessagesArray(array2);
      });
  }, [])

    const sendData = async () => {
     
      for(var i=0;i<messagesArray.length;i++){
        
          var addMessage = firestore.FieldValue.arrayUnion(titleMsg);

          firestore()
            .collection('Dentists')
            .doc(`${messagesArray[i].id}`)
            .update({
              messages: addMessage,
            })
      }
      alert('Msg envoyer');
      setTitleMsg('')
    }
 
  

    return (
        
        <View style={styles.containerForm}>

          <Header Label={'Notification'}/>

          <View style={styles.imageContainer}>
              <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View>
          
          <View style={styles.PublicitesStyleContainer}>
             
          <Text>Saisir un message</Text>
            <TextInput style={styles.textInput} value={titleMsg} onChangeText={(title)=>setTitleMsg(title)}/>
            <Button Label={"Envoyez"} onButtonPress={()=>sendData()}/>

          </View>
        
        
        </View>
           
    );
 
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


export default NotificationBroadcast;

