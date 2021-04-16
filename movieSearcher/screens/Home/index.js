import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Text, View, ActivityIndicator, FlatList, Image, TouchableHighlight, Pressable } from 'react-native';
import { Header, SearchBar, Button, Icon } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MovieItem from '../../components/MovieItem';
import api from '../../services/api';
import styles from './styles';
import Spinner from '../../components/Spinner';
import NotFound from '../../components/NotFound';

import { Context } from '../../store/storeGlobalState';

const Home = () => {

  //Global State (Favorites)
  // const [state, setState] = useContext(Context);
  // const [favorites, setFavorites] = useContext(Context);

  const [data, setData] = useState([]);
  const [favorites, setFavorite] = useState([]);
  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  const getData = async () => {
    try {
      const response = await api.get(`&s=${search == '' ? 'batman' : search}&type=movie`);
      setData(response['data']['Search']);
      setSearch('');
      await getStoredData('@favorites_Key');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErr(true);
      console.log(error);
    }
  }

  const storeFavoriteItems = async (id) => {
    const movies = [];
    console.log('====================')
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < id.length; j++) {
        if (id[j] === data[i]['Title']) {
          movies.push(data[j]);
        }
      }
    }
    storeData('@favItens_Key', movies);
  }

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (error) {
      console.log(error);
    }
  }

  const getStoredData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      setFavorite(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (error) {
      console.log(error);
    }
  }

  const renderItemCall = useCallback(({ item, index }) => renderItem({ item, index, favorites, setFavorite }));

  const renderItem = ({ item, index, favorites, setFavorite }) => {
    return <MovieItem
      poster={item.Poster}
      title={item.Title}
      year={item.Year}
      id={item.imdbID}
      isFavorite={favorites.includes(item.Title)}
      onPress={async (item) => {
        await setFavorite((favoriteItems) => {
          let isFavorite = favoriteItems.includes(item);
          if (isFavorite) {
            let fav = favoriteItems.filter((title) => title !== item);
            storeData('@favorites_Key', fav);
            storeFavoriteItems(fav);
            return fav;
          }
          let fav = [item, ...favoriteItems];
          storeData('@favorites_Key', fav);
          storeFavoriteItems(fav);
          return fav;
        })
      }
      }
    />;
  };

  function keyExtractor(item, index) {
    return item + index;
  }

  useEffect(() => {
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
      <View
        style={styles.searchContainer}
      >
        <SearchBar
          placeholder="Busque aqui..."
          value={search}
          onChangeText={(value) => setSearch(value)}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInput}
          inputStyle={styles.input}
          placeholderTextColor='#c9b3c9'
          searchIcon={{ color: '#FFF' }}
          clearIcon={{ color: '#FFF' }}
        />
        <Button
          buttonStyle={styles.button}
          title="Enviar"
          onPress={getData}
        />
      </View>
      <NotFound
        error={err}
        onPress={() => {
          setErr(false);
          setLoading(true);
          getData();
        }}
      />
      <Spinner loading={loading} />
      <View style={styles.container}>
        <FlatList
          extraData={favorites}
          data={data}
          renderItem={renderItemCall}
          keyExtractor={keyExtractor}
        />
        <StatusBar style="auto" hidden={true} />
      </View>
    </SafeAreaProvider>
  );
}

export default Home;