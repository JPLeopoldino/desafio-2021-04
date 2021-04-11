import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, SearchBar, Button } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import api from './services/api';

export default function App() {
  
  const [search, setSearch] = useState('');
  
  
  // const state = {
  //   search: '',
  // };

  // const { search } = state;

  // const updateSearch = (search) => {
  //   setState({ search });
  // };
  
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
          onPress={()=>console.log(search)}
        />
      </View>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
