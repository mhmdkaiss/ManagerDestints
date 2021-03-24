import React from 'react';
import {View,Text, StyleSheet,Image} from 'react-native';
import firebase from 'firebase';


class LocationPage extends React.Component {  

    state={type:''};

    // readfromDB(){
    //     // firebase.database()
    //     // .ref('/users/1234 ')
    //     // .set({
    //     //   type: 'test',
    //     //   envoyerMail: true,
    //     //   envoyerPoste:false,
    //     // });
    //     const {type} = this.state;
      
    //     firebase.database()
    //     .ref('/users')
    //     .on('value', snapshot => {
    //       console.log(snapshot.toJSON()['123'].type);
    //     });
      
    //     return type;
    //   }
 
  render(){
      return (
        
        <View style={styles.containerForm}>

          <View style={styles.imageContainer}>
              <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View>
          
          <View style={styles.PublicitesStyleContainer}>
             
             {/* <Text>{this.readfromDB()}</Text> */}

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
  titleStyle:{
  }
  ,
  PublicitesStyleContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }

})


export default LocationPage;

