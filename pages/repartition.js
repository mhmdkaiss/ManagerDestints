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


  // const renderData=(DelegationSelected)=>{
    
  // if(DelegationSelected){
  //   return(
  //     <View>
  //       <Text>Libre Pratique :{Delegationdata[DelegationSelected][0]}</Text>     
  //       <Text>Sante Publique :{Delegationdata[DelegationSelected][1]}</Text> 
  //       <Text>Chomeurs :{Delegationdata[DelegationSelected][2]}</Text>
  //     </View>
  //   )
  //   }
  //   else {
  //     return(
  //       <View>
  //         <Text>Libre Pratique :</Text>     
  //         <Text>Sante Publique :</Text> 
  //         <Text>Chomeurs :</Text>
  //       </View>
  //     )
  //   }
    
  // }

  const changeData=(libre,sante,chomeurs)=>{
   
    if(libre && sante && chomeurs){
      firestore()
      .collection('Gouvernorat')
      .doc(`${GouvernoratSelected}`)
      .update({
        [DelegationSelected] : [libre,sante,chomeurs]
      })
      .then(() => {
        console.log('User updated!');
      });
    }
    else {
      alert('enter data')
    }
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
          </Picker>
        </View>


       
        <View style={{alignItems:'center'}}>
        <Text>Libre Pratique : </Text> 
        <TextInput style={styles.input} keyboardType={'numeric'} value={libre} onChangeText={(text)=> setlibre(text)}/>
        <Text>Sante Publique :</Text> 
        <TextInput style={styles.input} keyboardType={'numeric'} value={sante} onChangeText={(text)=> setsante(text)}/>
        <Text>Chomeurs :</Text>
        <TextInput style={styles.input} keyboardType={'numeric'} value={chomeurs} onChangeText={(text)=> setchomeurs(text)}/>
      </View>
      <Button title={'change'} onPress={()=>changeData(libre,sante,chomeurs)}/>
      

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
    }
})

export default repartition;