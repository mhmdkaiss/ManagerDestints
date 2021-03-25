import React from 'react';
import {View, StyleSheet,Image, Button} from 'react-native';
import database from '@react-native-firebase/database';
import Header from '../components/Header';


class DocumentationPage extends React.Component {  

//   state = {titleMsg:'',message:''};

    chooseImage(){
        console.log('choose image');
    }
 
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
            <Button title={"choose pic"} onPress={this.chooseImage.bind(this)}/>
             
          
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

