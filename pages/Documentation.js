// #3 Uploading Files and Images to Firebase Cloud Storage in React Native
// https://aboutreact.com/react-native-firebase-cloud-storage/

// Import React in our code
import React, { useState } from "react";

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
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
  const [process, setProcess] = useState("");

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
      // If user canceled the document selection
      alert(
        DocumentPicker.isCancel(error)
          ? "Canceled"
          : "Unknown Error: " + JSON.stringify(error)
      );
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
  };

  const uploadFileToFirebaseStorage = async (result,filePath) => {
   
    const uploadTask = storage().ref(`/pdfs/${filePath.name}`)
      .putString(result,'base64',{contentType:filePath.type});

      uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case  storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
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

  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.titleText}>
              Upload Input Text as File on FireStorage
            </Text>
            <View style={styles.container}>
              <Text>
                Choose File and Upload to FireStorage
              </Text>
              <Text>{process}</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={_chooseFile}
              >
                <Text style={styles.buttonTextStyle}>
                  Choose Image (Current Selected:{" "}
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
                  Upload File on FireStorage
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.footerHeading}>
              React Native Firebase Cloud Storage
            </Text>
            <Text style={styles.footerText}>
              www.aboutreact.com
            </Text>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default DocumentationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "orange",
    padding: 10,
    width: 300,
    marginTop: 16,
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
});