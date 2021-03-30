import React from 'react';
import {View,Text, StyleSheet,Image, FlatList, Button} from 'react-native';
import database from '@react-native-firebase/database';
import Entypo from 'react-native-vector-icons/Entypo';


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

  sendAttestationbyemail(item){
    console.log(item.email)

    database()
    .ref(`/users/${item.id}`)
    .remove();
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
                            <Button title={"Envoyer l'attestation"} onPress={()=>this.sendAttestationbyemail(item)}/>
                            :null
                            }
                            
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

