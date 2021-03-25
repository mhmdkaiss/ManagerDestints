import React from 'react';
import {View,Text, StyleSheet,Image, FlatList} from 'react-native';
import database from '@react-native-firebase/database';


class AttestationPage extends React.Component {  

    state={dataList:[],type:'',envoyerMail:null,envoyerPoste:null};

    componentWillMount(){
        this.readfromDB();
    }

    readfromDB(){
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
                this.setState({dataList: notes});

                // console.log(notes);
              });
        
    }
 
  render(){

    const {containerForm,imageContainer,imageStyle,PublicitesStyleContainer,attestationtypeContainer,text} = styles;

    return (
        
        <View style={containerForm}>

          <View style={imageContainer}>
              <Image style={imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View>
          
          <View style={PublicitesStyleContainer}>
             
        
            <FlatList
                data={this.state.dataList}
                renderItem={({item,index})=>{
                    return(
                        <View style={attestationtypeContainer}>

                            <Text style={text}>Medecine avec l'email: {item.email}</Text>
                            {/* <Text style={text}>{item.id}</Text> */}
                            <Text style={text}>requested attestation type : {item.type}</Text>
                            {item.envoyerMail?<Text style={text}> => par Mail</Text>:null}
                            {item.envoyerPoste?<Text style={text}> => par Poste</Text>:null}
                            
                        </View>
                    ) 
                }}
            />

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

