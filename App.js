import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity} from 'react-native';

const IP = require('./ipcim.js');

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(IP.ipcim+'/film');
      const json = await response.json();
      alert(JSON.stringify(json))
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  szavazas=(id)=>{
    alert(id)
    var adatok={
      "bevitel1":id
    }
    fetch(IP.ipcim+'/felvitel', {
      method: "POST",
      body: JSON.stringify(adatok),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(x => x.text())
        .then(y => alert(y));
  }


  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({film_id}) => film_id}
          renderItem={({item}) => (
            <View>
            <Text style={{color:"brown",fontSize:20, textAlign:"center",marginTop:20, marginBottom:5}}>
              {item.film_cim}
            </Text>
            <Image source={{uri: IP.ipcim+"/" +item.film_kep}} style={{width:300,height:300}}   />

            <TouchableOpacity  onPress={()=>this.szavazas(item.film_id)}>
            <Text style={{backgroundColor:"blue",color:"white", padding:10}}>Erre szavazok</Text>
            </TouchableOpacity>

            </View>


          )}
        />
      )}
    </View>
  );
};

export default App;