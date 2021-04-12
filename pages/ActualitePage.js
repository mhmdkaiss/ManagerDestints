import React ,{useState} from 'react';
import {View,Text, StyleSheet,Image, TextInput} from 'react-native';
import database from '@react-native-firebase/database';
import Header from '../components/Header';
import Button from '../components/Button';
import storage from '@react-native-firebase/storage';

import RNFetchBlob from 'rn-fetch-blob'

import DocumentPicker from "react-native-document-picker";


const ActualitePage = () => {  

  const [titleMsg, setTitleMsg] = useState('');
  const [message, setMessage] = useState();

  const [filePath, setFilePath] = useState({});
  const [fileUrl, setfileUrl] = useState({});

  const [Reference, setReference] = useState({});

  
  

  const sendData = async()=> {


      const newReference = database()
      .ref('/Actualite')
      .push();

      const Reference = newReference.key;

          // Check if file selected
          if (Object.keys(filePath).length == 0 ) 
          {
            newReference.set({
              downloadExist : false,
            });  
            
          }
          else{
                  // Create Reference
              const path =filePath.uri;
              
              const result = await RNFetchBlob.fs.readFile(path,'base64');
              uploadFileToFirebaseStorage(Reference,result,filePath)
              }
            

  
          

      if(titleMsg!='' && message!='')
      {
        database()
        .ref(`/Actualite/${Reference}`)
        .update({
          titleMsg: titleMsg,
          message: message,
          fakeid: Reference,
        });
      

        alert('Actualité envoyer');
        setTitleMsg('');
        setMessage('');
      }
      else{
        alert('Données manquantes')
      }
    
  }


     const choisir=async()=>{
      // Opening Document Picker to select one file
      try {
       const fileDetails = await DocumentPicker.pick({
         // Provide which type of file you want user to pick
         type: [DocumentPicker.types.allFiles],
       });
       // Setting the state for selected File
       setFilePath(fileDetails);
     } catch (error) {
       setFilePath({});
     }
 }

  const uploadFileToFirebaseStorage = async (Reference,result,filePath) => {

    const uploadTask = storage().ref(`/Actualites/${Reference}/${filePath.name}`)
      .putString(result,'base64',{contentType:filePath.type});

        uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case storage.TaskState.PAUSED: // or 'paused'
          // console.log('Upload is paused');
          break;
        case  storage.TaskState.RUNNING: // or 'running'
          // console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
        console.log(error);
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        setfileUrl(downloadURL)   
        console.log('File available at', downloadURL);
      })
    }
  );

} 
 
 

    return (
        
        <View style={styles.containerForm}>

          <Header Label={'Actualités'}/>

          <View style={styles.imageContainer}>
              <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View>
          
          <View style={styles.PublicitesStyleContainer}>
             
            <Button Label={"Choisir fichier"} onButtonPress={()=>choisir()}/>
            <Text>Titre de l'actualité:</Text>
            <TextInput style={styles.textInput} value={titleMsg} onChangeText={(title)=>setTitleMsg(title)}/>
            <Text>Sujet de l'actualité:</Text>
            <TextInput style={styles.textInput} value={message} onChangeText={(title)=>setMessage(title)}/>
            <Button Label={"Envoyer l'actualité"} onButtonPress={()=>sendData()}/>

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


export default ActualitePage;

