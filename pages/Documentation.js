// #3 Uploading Files and Images to Firebase Cloud Storage in React Native
// https://aboutreact.com/react-native-firebase-cloud-storage/

// Import React in our code
import React, { useState ,useEffect } from "react";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Linking,
  RefreshControl,
  Alert
} from "react-native";

// Firebase Storage to upload file
import storage from "@react-native-firebase/storage";
// To pick the file from local file system
import DocumentPicker from "react-native-document-picker";
import RNFetchBlob from 'rn-fetch-blob'


const DocumentationPage = () => {
  // State Defination
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState({});

  const [refresh,setrefresh] = useState(false);
  // const [deleteitem,setdeleteitem] = useState('');


  const _chooseFile = async () => {
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
  };

  const _uploadFile = async () => {
    try {
      // Check if file selected
      if (Object.keys(filePath).length == 0)
        return alert("Please Select any File");
      setLoading(true);

      // Create Reference
      const path = filePath.uri;
      
      const result = await RNFetchBlob.fs.readFile(path,'base64');
      uploadFileToFirebaseStorage(result,filePath);
      
     
      setFilePath({});
    } catch (error) {
      console.log("Error->", error);
      alert(`Errorrr-> ${error}`);
    }
    setLoading(false);

    // //refresh
    //  if(deleteitem==''){
    //   setdeleteitem('refreshed');
    // }
    // if(deleteitem=="refreshed"){
    //   setdeleteitem('');
    // }

    Alert.alert("Attention", "Tirer vers le bas pour mettre à jour");
    
  };

  const uploadFileToFirebaseStorage = async (result,filePath) => {
   
        const uploadTask = storage().ref(`/pdfs/${filePath.name}`)
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
        });
      }
    );

  }


  // Viewing files
  const [listData, setListData] = useState([]);
  const [loadingV, setLoadingV] = useState(true);

  useEffect(() => {
    listFilesAndDirectories("");
  }, []);

  const listFilesAndDirectories = (pageToken) => {
    // setdeleteitem(true);
    const reference = storage().ref("pdfs");
    reference.list({ pageToken }).then((result) => {
      result.items.forEach((ref) => {
        // console.log("ref  ->>  ", JSON.stringify(ref));
      });

      if (result.nextPageToken) {
        return listFilesAndDirectories(
          reference,
          result.nextPageToken
        );
      }
      setListData(result.items);
      setLoadingV(false);
    });

    // setdeleteitem(false);
  };

  
  const deleteitemfun = async (item) => {
   
    Alert.alert(
      'Supprimer cet élément',
      '',
      [
        {
          text:'SUPPRIMER',
          onPress:()=>
          {
            // Create a reference to the file to delete
            const desertRef = storage().ref().child(`pdfs/${item}`);

            // Delete the file
            desertRef.delete().then(() => {
              // File deleted successfully
            }).catch((error) => {
              // Uh-oh, an error occurred!
            });
          }
        },
        {
          text:'ANNULER',
        }
      ]
    )
        
    //  //refresh
    //  if(deleteitem==''){
    //   setdeleteitem('refreshed');
    // }
    // if(deleteitem=="refreshed"){
    //   setdeleteitem('');
    // }
      
  }

  const ItemView = ({ item }) => {  

    return (
      // FlatList Item
      <View style={{ padding: 10 }}>
        
        <View style={styles.telechargeBtn} >
            <Text
                style={styles.itemname}
            >
                 File Name: {item.name}
            </Text>
            <TouchableOpacity onPress={() => deleteitemfun(item.name)}>
              <MaterialIcons name={'delete'} style={styles.iconStyle} size={22}/>
            </TouchableOpacity>
                       
        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = async (fullPath) => {
    const url = await storage()
      .ref(fullPath)
      .getDownloadURL()
      .catch((e) => {
        console.error(e);
      });
    Linking.openURL(url);
    console.log(url);
  };

  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1,backgroundColor:'white'}}>
          <View style={styles.container}>
              
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={_chooseFile}
              >
                <Text style={styles.buttonTextStyle}>
                Choisir le fichier {"\n"}
                (actuelle sélectionnée:{" "}
                  {Object.keys(filePath).length == 0
                    ? 0
                    : 1}
                  )
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={_uploadFile}
              >
                <Text style={styles.buttonTextStyle}>
                  Envoyer le fichier
                </Text>
              </TouchableOpacity>
            </View>

            
                {loadingV ? (
                  <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                ) : (
                  <FlatList
                  style={{backgroundColor:'#EEF1F3'}}
                    data={listData}
                    //data defined in constructor
                    ItemSeparatorComponent={ItemSeparatorView}
                    //Item Separator View
                    renderItem={ItemView}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={<RefreshControl refreshing={refresh} onRefresh={listFilesAndDirectories}/>}
                  />
                )}
    
            
        </SafeAreaView>
      )}
    </>
  );
};

export default DocumentationPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    paddingBottom:30,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#4548E9",
    padding: 10,
    width: 200,
    marginTop: 16,
    borderRadius:10
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
  },
  footerHeading: {
    fontSize: 18,
    textAlign: "center",
    color: "grey",
  },
  footerText: {
    fontSize: 16,
    textAlign: "center",
    color: "grey",
  },

  ListContainer:{
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 7,
    backgroundColor:'red'
  }
  ,
  telechargeBtn:{
    flexDirection:'row',
    paddingLeft:5,
    paddingRight:5,
  },
  iconStyle:{
      padding:4,
  },
  itemname:{
      fontSize:15,
      flex:1,
}
});