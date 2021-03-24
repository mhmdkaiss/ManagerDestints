import React from 'react';
import {View,Text, StyleSheet,Image, FlatList} from 'react-native';
import database from '@react-native-firebase/database';


class LocationPage extends React.Component {  

    state={dataList:[],type:'',envoyerMail:null,envoyerPoste:null};

    // componentWillMount(){
    //     this.readfromDB();
    // }

    // readfromDB(){
    //     database()
    //     .ref('/users')
    //     .on('value', snapshot => {
           
    //             const notes = [];
    //             snapshot.forEach((child) => {
    //               notes.push({
    //                 type: child.val().type,
    //                 envoyerMail: child.val().envoyerMail,
    //                 envoyerPoste: child.val().envoyerPoste,
    //                 id: child.key,
    //                 email:child.val().email,
    //                 // name:Children.val().name,
    //               });
    //             });
    //             this.setState({dataList: notes});

    //             // console.log(notes);
    //           });
        
    // }
 
  render(){

    return (
        
        <View style={styles.containerForm}>

          <View style={styles.imageContainer}>
              <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View>
          
          <View style={styles.PublicitesStyleContainer}>
             
{/*         
            <FlatList
                data={this.state.dataList}
                renderItem={({item,index})=>{
                    return(
                        <View style={styles.attestationtypeContainer}>
                            <Text>{item.id}</Text>
                            <Text>{item.type}</Text>
                            {item.envoyerMail?<Text>attestation par Mail</Text>:null}
                            {item.envoyerPoste?<Text>attestation par Poste</Text>:null}
                            <Text>{item.email}</Text>
                        </View>
                    ) 
                }}
            /> */}

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
  ,
  attestationtypeContainer:{
      backgroundColor:'grey',
      margin:10,
      padding:10,
  }

})


export default LocationPage;

