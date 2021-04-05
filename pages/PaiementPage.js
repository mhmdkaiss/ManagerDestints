import React , {useState,useEffect} from 'react';
import {View,Text, StyleSheet,Image,TouchableOpacity,FlatList, ActivityIndicator,} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';

const PaiementPage = () => {  
  
  const [dentistDataArray, setdentistDataArray] = useState([]);
  const [paid, setPaid] = useState(0);
  const [yearSelected, setyearSelected] = useState('2021');
 
  const [loading, setLoading] = useState(true);
 
  useEffect(() => { 

     // Get Dentists Data and put them in (Dentistdata array) and makes an array containing firestore ids
    firestore().collection('Dentists').get().then( snapshot =>{
      const dentistarray= [];
      snapshot.forEach(doc=>{
        const data = doc.data();
        dentistarray.push(data);
      })
    setdentistDataArray(dentistarray);
    console.log(dentistarray)
    
    }).catch(error => console.log(error));
    
  },[paid])

  const dentistPaid=(item,selectedyear)=>{
    console.log('dentistpaid')
    setPaid(paid+1);
    switch(selectedyear){
      case '2018':
            firestore()
            .collection('Dentists')
            .doc(`${item.numero_inscription}`)
            .update({
              year2018:true,
            });
            break;
      case '2019':
            firestore()
            .collection('Dentists')
            .doc(`${item.numero_inscription}`)
            .update({
              year2019:true,
            });
            break;
      case '2020':
              firestore()
              .collection('Dentists')
              .doc(`${item.numero_inscription}`)
              .update({
                year2020:true,
              });
              break;
      case '2021':
              firestore()
              .collection('Dentists')
              .doc(`${item.numero_inscription}`)
              .update({
                year2021:true,
              });
              break;
      default:
        break;
    }
 
  }


  const renderWithRespectToYears=(selectedyear,item)=>{
    switch(selectedyear) {
      case '2018':
            return (item.year2018 ? 
                                  
              <Text style={text}>Payee</Text>
            :
            <View>
            <Text style={text}>Doit payer</Text>  
            <TouchableOpacity style={buttonStyle} 
            onPress={()=>dentistPaid(item,selectedyear)}>
                <Text style={{fontSize:14,paddingTop:8,paddingLeft:4}}>Payé</Text>
            </TouchableOpacity>
            </View>
            );
      case '2019':
            return (item.year2019 ? 
                                
              <Text style={text}>Payee</Text>
            :
            <View>
            <Text style={text}>Doit payer</Text>  
            <TouchableOpacity style={buttonStyle} 
            onPress={()=>dentistPaid(item,selectedyear)}>
                <Text style={{fontSize:14,paddingTop:8,paddingLeft:4}}>Payé</Text>
            </TouchableOpacity>
            </View>
            );
      case '2020':
            return (item.year2020 ? 
                                
              <Text style={text}>Payee</Text>
            :
            <View>
            <Text style={text}>Doit payer</Text>  
            <TouchableOpacity style={buttonStyle} 
            onPress={()=>dentistPaid(item,selectedyear)}>
                <Text style={{fontSize:14,paddingTop:8,paddingLeft:4}}>Payé</Text>
            </TouchableOpacity>
            </View>
            );
      case '2021':
            return (item.year2021 ? 
                                
              <Text style={text}>Payee</Text>
            :
            <View>
            <Text style={text}>Doit payer</Text>  
            <TouchableOpacity style={buttonStyle} 
            onPress={()=>dentistPaid(item,selectedyear)}>
                <Text style={{fontSize:14,paddingTop:8,paddingLeft:4}}>Payé</Text>
            </TouchableOpacity>
            </View>
            );
      default:
        return null;
    }
  }

  
    const {PublicitesStyleContainer,attestationtypeContainer,text,buttonStyle}= styles;

     return (
        
        <View style={styles.containerForm}>

            <View style={styles.imageContainer}>
                <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
            </View>

            <View style={styles.pickerContainer}>
                  <Picker
                      onValueChange={(itemValue, itemIndex) => {
                        setyearSelected(itemValue)
                        }}
                        selectedValue={yearSelected} 
                    >
                      <Picker.Item label="2018" value="2018" />
                      <Picker.Item label="2019" value="2019" />
                      <Picker.Item label="2020" value="2020" />
                      <Picker.Item label="2021" value="2021" />
                  </Picker>
                </View>

            <View style={PublicitesStyleContainer}>
                    
             <FlatList
                 data={dentistDataArray}
                 keyExtractor={(list)=>list.numero_inscription}
                 renderItem={({item,index})=>{
                   
                     return(
                      
                        <View style={attestationtypeContainer}>
                            <Text style={text}>Numero d'inscription : {item.numero_inscription}</Text>
                            <Text style={text}>Email : {item.email}</Text>
                            
                           { renderWithRespectToYears(yearSelected,item)}

                            
                           
                          


                         </View>
                      
                     ) 
                 }}
             />
 
           </View>
       


        </View>
        

        
    );
}

const styles= StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    paddingBottom:30,
    height:'100%'
  },
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
  ,
  buttonStyle:{
      backgroundColor:'white',
      width:40,
      borderRadius:100,
      height:40,
      alignSelf:'flex-end'
  }
  ,
  pickerContainer:{
    backgroundColor : "rgb(237,237,237)",
    justifyContent  : "center",
    width:160,
    borderRadius:10,
    height:30,
    marginTop:10
  }

})


export default PaiementPage;

