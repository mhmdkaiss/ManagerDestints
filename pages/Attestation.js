import React , {useState,useEffect} from 'react';
import {View,Text, StyleSheet,Image, FlatList, Button} from 'react-native';
import database from '@react-native-firebase/database';
import Entypo from 'react-native-vector-icons/Entypo';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
// To pick the file from local file system
import DocumentPicker from "react-native-document-picker";
import RNFetchBlob from 'rn-fetch-blob'


const AttestationPage = () => {  

    const [dataList, setdataList] = useState([]);
    const [type, settype] = useState('');
    const [envoyerMail, setenvoyerMail] = useState(null);
    const [envoyerPoste, setenvoyerPoste] = useState(null);

    const [filePath, setFilePath] = useState({});
    const [fileUrl, setfileUrl] = useState({});


    useEffect(() => {
      readfromDB(); 
    }, [fileUrl]);

   const readfromDB=()=>{
        database()
        .ref('/users')
        .on('value', snapshot => {
           
                const notes = [];
                snapshot.forEach((child) => {
                  notes.push({
                    type: child.val().type,
                    envoyerMail: child.val().envoyerMail,
                    envoyerPoste: child.val().envoyerPoste,
                    id: child.key,
                    email:child.val().email,
                    // name:Children.val().name,
                  });
                });
                setdataList(notes);

                // console.log(notes);
              });
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

    const sendAttestation= async(item)=>{

    //send email with pdf
    // console.log(item.email)
    //check if enovyer by post dont remove notification
    if(item.envoyerPoste==false){
      database()
      .ref(`/users/${item.id}`)
      .remove();
    } 
   

        try {
          if (Object.keys(filePath).length != 0 ) 
          {  alert("Attestation envoyé");}
         
          // Check if file selected
          if (Object.keys(filePath).length == 0 ) 
            { alert("Choisir fichier") };
          // Create Reference
          const path =filePath.uri;
          
          const result = await RNFetchBlob.fs.readFile(path,'base64');
          uploadFileToFirebaseStorage(item,result,filePath)
          
          
        //  firestore()
        // .collection('Attestations')
        // .add({
        //   email:item.email,
        //   fileUrl: fileUrl,
        // });
         
          // setFilePath({});
        } catch (error) {
          console.log("Error->", error);
          // alert(`Errorrr-> ${error}`);
          alert("Choisir fichier")
        } 
     
  
  }


  const uploadFileToFirebaseStorage = async (item,result,filePath) => {
     
    const uploadTask = storage().ref(`/Attestations/${item.email}/${filePath.name}`)
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
  
    const {containerForm,imageContainer,imageStyle,PublicitesStyleContainer,attestationtypeContainer,text} = styles;

    return (
        
        <View style={containerForm}>

          <View style={imageContainer}>
              <Image style={imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View>
          
          <View style={PublicitesStyleContainer}>
             
        
            <FlatList
                data={dataList}
                keyExtractor={(list)=>list.id}
                renderItem={({item,index})=>{
                  // const length=item.email.length;
                  // const numeroLength= length-11;
                  // const numero = item.email.slice(0, numeroLength);
                    return(
                        <View style={attestationtypeContainer}>

                            <Text style={text}>Email : {"\n"}
                            <Entypo name={'arrow-right'} size={16}/>{" "}
                             {item.email}</Text>
                            {/* <Text style={text}>{item.id}</Text> */}
                            <Text style={text}>Attestation demandé :{"\n"}
                            <Entypo name={'arrow-right'} size={16}/>{" "}
                             {item.type}</Text>
                            {item.envoyerMail?<Text style={text}>
                            <Entypo name={'check'}/>
                             {" "}par Mail</Text>:null}
                            {item.envoyerPoste?<Text style={text}>
                            <Entypo name={'check'}/>
                            {" "}par Poste</Text>:null}

                            {item.envoyerMail ?
                            <View>
                            <Button title={"Choisir fichier"} onPress={()=>choisir()}/>
                            <View style={{height:10}}></View>
                            <Button title={"Envoyer le fichier"} onPress={()=>sendAttestation(item)}/>
                            </View>
                            :null
                            }
                            
                        </View>
                    ) 
                }}
            />

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
      backgroundColor:'#3b5998',
      margin:10,
      padding:10,
      borderRadius:10,
  }
  ,
  text:{
    color:'white',
    fontSize:17
  }

})


export default AttestationPage;

