import React , { useState ,useEffect }from 'react';
import {View,Text, StyleSheet,Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Header from '../components/Header';
import Button from '../components/Button';
// To pick the file from local file system
import DocumentPicker from "react-native-document-picker";
import RNFetchBlob from 'rn-fetch-blob'


const PublicitePage = () => {  

  const [titleMsg, settitleMsg] = useState('');
  const [message, setmessage] = useState('');
  
  const [filePath, setFilePath] = useState({});
  const [fileUrl, setfileUrl] = useState({});

  
  const _chooseFile = async () => {
    // console.log(fileUrl);
    // Opening Document Picker to select one file
    try {
      const fileDetails = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
      });
      // Setting the state for selected File
      await setFilePath(fileDetails);
      setfileUrl(fileDetails.uri);
    } catch (error) {
      setFilePath({});
    }
  };

  const _uploadFile = async () => {
   
    try {
      // Check if file selected
      if (Object.keys(filePath).length == 0 || titleMsg =='' || message=='') 
        return alert("Veuillez remplir toutes les données");
      // Create Reference
      const path = filePath.uri;
      
      
      const result = await RNFetchBlob.fs.readFile(path,'base64');
      uploadFileToFirebaseStorage(result,filePath);
      
     
      setFilePath({});
    } catch (error) {
      console.log("Error->", error);
      alert(`Errorrr-> ${error}`);
    }

  };

  const uploadFileToFirebaseStorage = async (result,filePath) => {
   
        const uploadTask = storage().ref(`/PubImages/${filePath.name}`)
          .putString(result,'base64',{contentType:filePath.type});

          uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          
          console.log('File available at', downloadURL);

          firestore()
          .collection('Publicities')
          .add({
            titlemessage: titleMsg,
            message: message,
            download: downloadURL,
          });
          settitleMsg('');
          setmessage('');
          setfileUrl('')
        });

        alert('publicity sent')
      }
    );

  }
  

  

    return (
        
        <View style={styles.containerForm}>

          <Header Label={'Publicité'}/>    


          <Image style={{width:100,height:100}} source={{uri:`${fileUrl}`}}/> 
          
          <TouchableOpacity style={styles.button} onPress={_chooseFile}>
              <Text style={{color:'white',paddingLeft:8,paddingTop:5}}>Choisir fichier</Text>
          </TouchableOpacity>
            
          
          <View style={styles.PublicitesStyleContainer}>
            <Text>Titre de la publicité:</Text>
            <TextInput style={styles.textInput} value={titleMsg} onChangeText={(title)=>settitleMsg(title)}/>
            <Text>Sujet de la publicité:</Text>
            <TextInput style={styles.textInput} value={message} onChangeText={(title)=>setmessage(title)}/>
            <Button Label={'Envoyer la publicité'} onButtonPress={_uploadFile}/>
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
  ,
  ImageContainer:{
    alignSelf:'center',
  }
  ,
  button: {
    marginTop:100,
      margin:8,
      backgroundColor:'blue',
      width:100,
      alignSelf:'center',
      height:30
  }

})


export default PublicitePage;

