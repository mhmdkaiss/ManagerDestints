import React from 'react';
import {View, StyleSheet,Image, Button, Platform} from 'react-native';
import database from '@react-native-firebase/database';
import Header from '../components/Header';
import { utils } from '@react-native-firebase/app';


class DocumentationPage extends React.Component {  

//   state = {titleMsg:'',message:''};

  async chooseFile() {
      // try {
      //   const file = await DocumentPicker.pick({
      //     type: [DocumentPicker.types.allFiles],
      //   });
      //   // const path = await normalizePath(file.uri);
      //   // console.log(path);
      //   // console.log(
      //   //   file.uri,
      //   //   file.type, // mime type
      //   //   file.name,
      //   //   file.size
      //   // );
      // } catch (err) {
      //   if (DocumentPicker.isCancel(err)) {
      //     // User cancelled the picker, exit any dialogs or menus and move on
      //   } else {
      //     throw err;
      //   }
      // }
  }

  // async normalizePath(path) {
  //   if(Platform.OS==='os' || Platform.OS==='android'){
  //     const filePrefix='file://';
  //     if(path.startsWith(filePrefix)){
  //       path= path.substring(filePrefix.length);
  //       try{
  //         path = decodeURI(path);
  //       }catch(e){

  //       }
  //     }
  //   }
  //   return path;
  // }
  
 
  render(){

    // const choosePhotoFromLibrary = () => {
    //     ImagePicker
    // }


    return (
        
        <View style={styles.containerForm}>

          <Header headerText={'Documentation'}/>

          <View style={styles.imageContainer}>
              <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View>
          
          <View style={styles.PublicitesStyleContainer}>
            <Button title={"choose pic"} onPress={this.chooseFile.bind(this)}/>
             
          
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
  PublicitesStyleContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
  ,
})


export default DocumentationPage;

