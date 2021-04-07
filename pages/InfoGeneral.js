import React , {useState,useEffect} from 'react';
import {View,Text, StyleSheet,TextInput,Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';

const InfoGeneral = () => {

   
    const [nom,setNom] = useState('');
    const [prenom,setPrenom] = useState('');
    const [numero,setNumero] = useState('');

    useEffect(() => { 
      
     
  
    
  },[]);


  const changeData=(nom,prenom,numero)=>{
   
    if(nom && prenom && numero)
    {
        firestore()
        .collection('Validnumeros')
        .add({
          numero_inscription: parseInt(numero),
          nom: nom,
          prenom:prenom,
        })
        setNom('');
        setPrenom('')
        setNumero('')
    }
    else {
        alert('Ajouter toutes les données')
    }
  

  }
  
    return (
        <View>
       
            <View style={{alignItems:'center',marginBottom:30}}>
                <Text style={styles.textStyle}>Nom : </Text> 
                <TextInput style={styles.input} value={nom} onChangeText={(text)=> setNom(text)}/>
                <Text style={styles.textStyle}>Prenom :</Text> 
                <TextInput style={styles.input} value={prenom} onChangeText={(text)=> setPrenom(text)}/>
                <Text style={styles.textStyle}>Numero dinscription :</Text>
                <TextInput style={styles.input} keyboardType={'numeric'} value={numero} onChangeText={(text)=> setNumero(text)}/>
            </View>
            <Button  title={'Ajouter Dentiste'} onPress={()=>changeData(nom,prenom,numero)}/>
        
      </View>
 )



}

const styles = StyleSheet.create({
    
    
    input:{
      backgroundColor:'rgb(237,237,200)',
      borderRadius:10,
      width:'40%'
    },
    textStyle:{
      margin:20,
      fontSize:18
    }
})

export default InfoGeneral;