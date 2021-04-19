import React , { useState ,useEffect }from 'react';
import {View,Text, StyleSheet,Image, Alert, TouchableOpacity } from 'react-native';
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

    Alert.alert(
      "Etes-vous sûr d'ajouter une publicité ?",
      '',
      [
        {
          text:'Ajouter',
          onPress:async()=>
          {
            try {
              // Check if file selected
              if (Object.keys(filePath).length == 0 ) 
                return alert("Veuillez remplir toutes les données");
              // Create Reference
              const path = filePath.uri;
              
              
              const result = await RNFetchBlob.fs.readFile(path,'base64');
              uploadFileToFirebaseStorage(result,filePath);
              
             
              setFilePath({});
              alert('Publicité envoyée')
            } catch (error) {
              console.log("Error->", error);
              alert(`Errorrr-> ${error}`);
            }
          }
        },
        {
          text:'ANNULER',
        }
      ]
    )
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

          //send if JPG or not
          var Video=null;
          const downloadURLUpperCase =downloadURL.toUpperCase()
          
          const checktypeifVidorImg = downloadURLUpperCase.search("JPG");
          
          if(checktypeifVidorImg==-1){
             Video=true
          }
          else{
            Video=false
          }

          
          console.log('File available at', downloadURL);

          firestore()
          .collection('Publicities')
          .add({
            download: downloadURL,
            Video : Video,
          });
          setfileUrl('')
        });

        alert('publicity sent')
      }
    );

  }
  

  

    return (
        
        <View style={styles.containerForm}>

          <Header Label={'Publicité'}/>    

          <View style={styles.ImageContainer}>
            <Image style={{width:300,height:'100%'}} source={{uri:`${fileUrl}`}}/> 
          </View>

          <View style={{flex:3}}>
            <View style={{flex:1,justifyContent:'center'}}>
              <TouchableOpacity style={styles.button} onPress={_chooseFile}>
                  <Text style={{color:'white',paddingLeft:8,paddingTop:5}}>Choisir fichier</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.PublicitesStyleContainer}>
              {/* <Text>Titre de la publicité:</Text>
              <TextInput style={styles.textInput} value={titleMsg} onChangeText={(title)=>settitleMsg(title)}/>
              <Text>Sujet de la publicité:</Text>
              <TextInput style={styles.textInput} value={message} onChangeText={(title)=>setmessage(title)}/> */}
              <Button Label={'Envoyer la publicité'} onButtonPress={_uploadFile}/>
            </View>
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
    flex:3,
    justifyContent:'center',
    alignItems:'center',
  }
  ,
  textInput:{
    backgroundColor:'#EEF1F3',
    color:'black',
    width:280,
  }
  ,
  ImageContainer:{
    alignSelf:'center',
    borderColor:'black',
    borderWidth:0.7,
    flex:2,
  }
  ,
  button: {
      backgroundColor:'blue',
      width:100,
      alignSelf:'center',
      paddingBottom:5,
      
  }

})


export default PublicitePage;

