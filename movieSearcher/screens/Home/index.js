import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { Header, SearchBar, Button } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MovieItem from '../../components/MovieItem';
import api from '../../services/api';

const App = ()=>{

  const apikey = '925eba28';
  
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async ()=>{
    try {
      const response = await api.get(`?apikey=${apikey}&s=${search == '' ? 'batman' : search}`);
      setData(response['data']);
      setLoading(false);
    //   console.log(data.Search[1].Title);
    } catch (error) {
      console.log(error);
    }
  }

  // const getTextData = async ()=>{
  //   await getData();
  //   const Textdata = await data.data.Search[0].Title;
  //   return data = Textdata;
  // }

  const Spinner = ()=>{
    return (loading ? <ActivityIndicator size="large" color="#00000ff" /> : null);
  }

  useEffect(()=>{
    getData();
  }, []);
  
  return (
    <SafeAreaProvider>
      <Header
        statusBarProps={{ barStyle: 'dark-content' }}
        containerStyle={{
          backgroundColor: '#663366',
          justifyContent: 'space-around',
        }}
        centerComponent={
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#F76E2A',
              padding: 8,
            }}
          >
            Movie Searcher
          </Text>
        }
      />
      <Spinner />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <SearchBar
          placeholder="Type Here..."
          value={search}
          onChangeText={(value) => setSearch(value)}
          containerStyle={{
            flex: 2
          }}
        />
        <Button
          style={{
            flexGrow: 1,
          }}
          title="Enviar"
          onPress={getData}
        />
      </View>
      <View style={styles.container}>
        {/* <Text>{data.Search[1].Title}</Text> */}
        <FlatList
          data={data.Search}
          renderItem={({ item }) => <MovieItem item={item} />}
          keyExtractor={(item, index) => item + index}
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
