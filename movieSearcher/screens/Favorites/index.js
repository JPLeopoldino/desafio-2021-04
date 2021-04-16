import React, { useState, useEffect, useCallback, useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

import styles from './styles';
import MovieFavoriteItem from '../../components/MovieFavoriteItem';
import { Context } from '../../store/storeGlobalState';

const Favorites = () => {

  const [data, setData] = useState([]);
  const [favorites, setFavorite] = useState([]);

  const getStoredFavoritesItens = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favItens_Key')
      setData(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (error) {
      console.log(error);
    }
  }

  const getStoredFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorites_Key')
      setFavorite(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (error) {
      console.log(error);
    }
  }

  const storeFavorites = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (error) {
      console.log(error);
    }
  }

  const storeFavoriteItems = async (id) => {
    const movies = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < id.length; j++) {
        if (id[j] === data[i]['Title']) {
          movies.push(data[j]);
        }
      }
    }
    storeFavorites('@favItens_Key', movies);
  }

  const renderItemCall = useCallback(({ item, index }) => renderItem({ item, index, favorites, setFavorite }));

  const renderItem = ({ item, index, favorites, setFavorite }) => {
    return <MovieFavoriteItem
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
            storeFavorites('@favorites_Key', fav);
            storeFavoriteItems(fav);
            return fav;
          }
          let fav = [item, ...favoriteItems];
          storeFavorites('@favorites_Key', fav);
          storeFavoriteItems(fav);
          return fav;
        })
      }}
    />;
  };

  function keyExtractor(item, index) {
    return item + index;
  }

  useEffect(() => {
    getStoredFavoritesItens();
    getStoredFavorites();
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

export default Favorites;