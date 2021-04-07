import React , {useState,useEffect} from 'react';
import {View,Text, StyleSheet,TextInput,Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';

const repartition = () => {

    const [GouvernoratSelected, setGouvernoratSelected] = useState('Beja');
    const [Gouvernoratdata, setGouvernoratdata] = useState([]);
    const [DelegationSelected, setDelegationSelected] = useState('nefza');
    const [DelegationNames, setDelegationNames] = useState([]);

    const [Delegationdata, setDelegationdata] = useState([]);

    const [libre,setlibre] = useState('');
    const [sante,setsante] = useState('');
    const [chomeurs,setchomeurs] = useState('');

    useEffect(() => { 
      
      firestore()
      .collection('Gouvernorat')
      .get()
      .then(querySnapshot => {
        var array=[];
        querySnapshot.forEach(documentSnapshot => {
          array.push(documentSnapshot.id)
        });
        setGouvernoratdata(array);
      }).then(  firestore()
      .collection('Gouvernorat')
      .doc(`${GouvernoratSelected}`)
      .get()
      .then(documentSnapshot => {
      
    
    if (documentSnapshot.exists) {
      var array=[]
      var arraydata=[]
      array=Object.keys(documentSnapshot.data());
      arraydata=documentSnapshot.data();
    } 
    
    setDelegationdata(arraydata)
    setDelegationNames(array)
  }));
    
  },[GouvernoratSelected,DelegationSelected]);


  const changeData=(libre,sante,chomeurs)=>{
   
      firestore()
      .collection('Gouvernorat')
      .doc(`${GouvernoratSelected}`)
      .update({
        [DelegationSelected] : [libre,sante,chomeurs]
      })
      .then(() => {
        console.log('User updated!');
      });
   
    alert('Data Envoyer');
    setlibre('');
    setsante('');
    setchomeurs('');
  }
  
    return (
        <View style={{}}>
        <View style={styles.pickerContainer}>
          <Picker
              onValueChange={(itemValue, itemIndex) => {
                setGouvernoratSelected(itemValue)
                setDelegationSelected('')
                }}
                selectedValue={GouvernoratSelected} 
            >
                 <Picker.Item label={`${Gouvernoratdata[0]}`} value={`${Gouvernoratdata[0]}`} />
              <Picker.Item label={`${Gouvernoratdata[1]}`} value={`${Gouvernoratdata[1]}`} />
              <Picker.Item label={`${Gouvernoratdata[2]}`} value={`${Gouvernoratdata[2]}`} />
              <Picker.Item label={`${Gouvernoratdata[3]}`} value={`${Gouvernoratdata[3]}`} />
          
          </Picker>
        </View>
        

        <View style={styles.pickerContainer}> 
          <Picker
              onValueChange={(itemValue, itemIndex) => {
                setDelegationSelected(itemValue)
                }}
                selectedValue={DelegationSelected} 
            >
               <Picker.Item label={`${DelegationNames[0]}`} value={`${DelegationNames[0]}`} />
              <Picker.Item label={`${DelegationNames[1]}`} value={`${DelegationNames[1]}`} />
              <Picker.Item label={`${DelegationNames[2]}`} value={`${DelegationNames[2]}`} />
              <Picker.Item label={`${DelegationNames[3]}`} value={`${DelegationNames[3]}`} />
              <Picker.Item label={`${DelegationNames[4]}`} value={`${DelegationNames[4]}`} />
              {DelegationNames[5]?<Picker.Item label={`${DelegationNames[5]}`} value={`${DelegationNames[5]}`}/>:null}
              {DelegationNames[6]?<Picker.Item label={`${DelegationNames[6]}`} value={`${DelegationNames[6]}`}/>:null}
              {DelegationNames[7]?<Picker.Item label={`${DelegationNames[7]}`} value={`${DelegationNames[7]}`}/>:null}
              {DelegationNames[8]?<Picker.Item label={`${DelegationNames[8]}`} value={`${DelegationNames[8]}`}/>:null}
              {DelegationNames[9]?<Picker.Item label={`${DelegationNames[9]}`} value={`${DelegationNames[9]}`}/>:null}
              {DelegationNames[10]?<Picker.Item label={`${DelegationNames[10]}`} value={`${DelegationNames[10]}`}/>:null}
              
          </Picker>
        </View>


       
        <View style={{alignItems:'center'}}>
        <Text style={styles.textStyle}>Libre Pratique : </Text> 
        <TextInput style={styles.input} keyboardType={'numeric'} value={libre} onChangeText={(text)=> setlibre(text)}/>
        <Text style={styles.textStyle}>Sante Publique :</Text> 
        <TextInput style={styles.input} keyboardType={'numeric'} value={sante} onChangeText={(text)=> setsante(text)}/>
        <Text style={styles.textStyle}>Chomeurs :</Text>
        <TextInput style={styles.input} keyboardType={'numeric'} value={chomeurs} onChangeText={(text)=> setchomeurs(text)}/>
      </View>
      <Button style={{marginTop:20}} title={'change'} onPress={()=>changeData(libre,sante,chomeurs)}/>
      

      </View>
 )



}

const styles = StyleSheet.create({
    
    pickerContainer:{
      backgroundColor : "rgb(237,237,237)",
      justifyContent  : "center",
      width:'90%',
      borderRadius:10,
      height:40,
      marginTop:10,
      alignSelf:'center'
    }
    ,
    input:{
      backgroundColor:'rgb(237,237,200)',
      borderRadius:10,
      width:'40%'
    },
    textStyle:{
      margin:20
    }
})

export default repartition;