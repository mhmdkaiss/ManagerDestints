import React , {useState,useEffect} from 'react';
import {View,Text, StyleSheet,Image, Alert, TextInput} from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import firestore from '@react-native-firebase/firestore';


  const NotificationSendMsgPage = ({route})  => {


  const [titleMsg, setTitleMsg] = useState('');
  const [messagesArray, setMessagesArray] = useState([]);

  useEffect(() => {
    
    firestore()
      .collection('Dentists')
      .doc(`${route.params.numero}`)
      .get()
      .then(documentSnapshot => {
          setMessagesArray(documentSnapshot.data().messages);
      }); 
  }, [])

    const sendData = async () => {
      //  console.log(route.params.numero);
      Alert.alert(
        "Etes-vous sûr d'envoyer cette notification ?",
        '',
        [
          {
            text:'Envoyer',
            onPress:()=>
            {
              messagesArray.push(titleMsg);

              firestore()
              .collection('Dentists')
              .doc(`${route.params.numero}`)
              .update({
                messages: messagesArray,
              })
        
              alert('Notification envoyer');
              // this.setState({titleMsg:'',message:''});
              setTitleMsg('')
            }
          },
          {
            text:'ANNULER',
          }
        ]
      )
      
  
      
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


export default NotificationSendMsgPage;

