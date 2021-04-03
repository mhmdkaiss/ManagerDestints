import React , {useState,useEffect} from 'react';
import {View,Text, StyleSheet,Image,TouchableOpacity,FlatList, ActivityIndicator,} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const PaiementPage = () => {  
  
  const [dentistDataArray, setdentistDataArray] = useState([]);
  const [paid, setPaid] = useState(0);

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

    }).catch(error => console.log(error));
    
  },[paid])

  const dentistPaid=(item)=>{
    setPaid(paid+1);
    setLoading(true);
    firestore()
    .collection('Dentists')
    .doc(`${item.numero_inscription}`)
    .update({
      paid:true,
    })
    setLoading(false);
  }

  
    const {PublicitesStyleContainer,attestationtypeContainer,text,buttonStyle}= styles;

     return (
        
        <View style={styles.containerForm}>

            <View style={styles.imageContainer}>
                <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
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
                            {item.paid ? 
                            
                              <Text style={text}>Payee</Text>
                            :
                            <View>
                            <Text style={text}>Doit payer</Text>  
                            <TouchableOpacity style={buttonStyle} 
                            onPress={()=>dentistPaid(item)}>
                                <Text style={{fontSize:14,paddingTop:8,paddingLeft:4}}>Payé</Text>
                            </TouchableOpacity>
                            </View>
                            }
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

})


export default PaiementPage;

