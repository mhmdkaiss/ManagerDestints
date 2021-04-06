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
          array=[]
          querySnapshot.forEach(documentSnapshot => {
             array.push(documentSnapshot.id)
          });
          setidsArray(array);
      });
  }, [])

    const sendData = async () => {

      for(i=0;i<idsArray.length;i++){
        // const array=[]
        // firestore()
        // .collection('Dentists')
        // .doc(`${idsArray[i]}`).get()
        // .then(documentSnapshot => {
          
        //   array=documentSnapshot.data().messages;
          
        //   array.push(titleMsg).then(
        //     firestore()
        //     .collection('Dentists')
        //     .doc(`${idsArray[i]}`)
        //     .update({
        //       messages: array,
        //     })
        //   )          
          
        // })
        
      }
      

      alert('Error');
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

