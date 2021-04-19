// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList,ActivityIndicator , Button} from 'react-native';
import { SearchBar } from 'react-native-elements';

import firestore from '@react-native-firebase/firestore';

const NotificationPage = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const [Dentistsdata, setDentistsdata] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    if(loading){
      firestore().collection('Dentists').get().then( snapshot =>{
        const dentistarray= [];
        snapshot.forEach(doc=>{
          const data = doc.data();
          dentistarray.push(data);
        })
        setDentistsdata(dentistarray);
        
        setFilteredDataSource(Dentistsdata);
        setMasterDataSource(Dentistsdata);
      }).catch(error => console.log(error));     
      }
     return() =>{
       setLoading(false);
     }  
  },[Dentistsdata]);

  

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.numero_inscription.toString()

        const textData = text;
        
        return itemData.indexOf(textData) > -1; 
      });

      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };


  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View style={{flexDirection:'row',justifyContent:'center'}}>
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.prenom} {item.nom} {"\n"} Numero inscription : {item.numero_inscription}
      </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    navigation.navigate('NotificationSendMsgPage',{numero:item.numero_inscription});

  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="écrivez ici..."
          value={search}
        />
        
        { loading ?
          <View style={styles.container}>
           <ActivityIndicator size="large" color="#0000ff" />
          </View>
        
          :

          <View>

            <Button title={"Envoyer a tous les dentistes"} onPress={()=>navigation.navigate('NotificationBroadcast')}/>

            <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            />
            
          </View>
        }



      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
    fontSize:17
  },
  
});

export default NotificationPage;
