import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { Header, SearchBar, Button, Icon } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MovieItem from '../../components/MovieItem';
import api from '../../services/api';

const Home = ()=>{




//   const MovieItem = ({poster, title, year, id, isFavorite, onPress})=>{

//     return(
//         <View style={styles.container}>
//             <Image
//                 style={styles.image}
//                 source={{uri:poster}}
//             />
//             {/* {
//             item.Poster == "N/A" ? 
//             <View style={styles.nullImage} >
//                 <Icon
//                     name='help'
//                     type='material-community'
//                     color='#BBB'
//                     size={80}
//                 />
//             </View> :
//             <Image
//                 style={styles.image}
//                 source={{uri:item.Poster}}
//             />
//             } */}
//             <View style={styles.itemContainer}>
//                 <View style={styles.textContainer}>
//                     <Text style={style.title}>{title}</Text>
//                     <Text style={style.description}>Ano: {year}</Text>
//                 </View>
//                 <TouchableOpacity
//                     onPress={()=> onPress(id)}
//                 >
//                     <Icon
//                         name={isFavorite == id ? 'star' : 'star-outline'}
//                         type='material-community'
//                         color='#AAA'
//                         style={styles.icon}
//                     />
//                 </TouchableOpacity>

//             </View>

//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container:{
//         flexDirection: 'column',
//         flexGrow: 1,
//         paddingVertical: 20,
//         paddingHorizontal: 50,
//         position: 'relative',
//     },
//     image: {
//         width: '100%',
//         height: 500,
//         borderRadius: 13,
//         backgroundColor: '#AAA'
//     },
//     nullImage: {
//         width: '100%',
//         height: 500,
//         borderRadius: 13,
//         backgroundColor: '#DDD',
//         justifyContent: 'center'
//     },
//     itemContainer: {
//         marginHorizontal: 50,
//         marginVertical: 20,
//         position: 'absolute',
//         zIndex: 99,
//         backgroundColor: '#FFF',
//         borderRadius: 13,
//         bottom: 0,
//         flexDirection: 'row',
//         width: '100%',
//         padding: 15,
//         alignItems: 'center',
//         justifyContent: 'space-around',
//     },
//     textContainer: {
        
//     },
//     icon:{
//     },
// });

// const style = StyleSheet.create({
//     starContainer: {
//         justifyContent: 'center',
//     },
//     title: {
//         color: '#14191f',
//         fontWeight: 'bold',
//         fontSize: 23,
//         textAlign: 'center',
//     },
//     description: {
//         color: '#777',
//         fontSize: 15,
//         textAlign: 'center',
//     },
//     price: {
//         fontSize: 30,
//         color: '#02b025',
//         textAlign: 'center',
//         fontWeight: 'bold',
//     },
//     itemContent: {
//         width: 200,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginLeft: 40,
//     },
//     content: {
//         flexDirection: 'row',
//         padding: 25,
//         borderBottomWidth: 0.3,
//         borderColor: '#000',
//         backgroundColor: '#FFF'
//     },
//     image: {
//         height: 100,
//         width: '50%',
//         borderRadius: 10,
//     },
//     // line: {
//     //     position: 'absolute',
//     //     width: '150%',
//     //     height: 1,
//     //     backgroundColor: '#FFF',
//     // }
// });





  const apikey = '925eba28';
  
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorite] = useState([]);

  const renderItem = ({ item, index, favorites, setFavorite }) => {
    return <MovieItem
      poster={item.Poster}
      title={item.Title}
      year={item.Year}
      id={item.imdbID}
      isFavorite={favorites.includes(item)}
      onPress={item => {
        setFavorite((favoriteItems) => {
          let isFavorite = favoriteItems.includes(item);
          if (isFavorite) {
            console.log(`\n-----\nRemoveu no Array: ${item}\nisFavorite: ${isFavorite}`);
            console.log(favoriteItems);
            return favoriteItems.filter((title) => title !== item)
            
          }
          console.log(`\n-----\nAdicionado no Array: ${item}\nArray: ${favoriteItems}\nisFavorite: ${isFavorite}`)
          return [item, ...favoriteItems];
        });
      }
    }
    />;
  };

  const getData = async ()=>{
    try {
      const response = await api.get(`?apikey=${apikey}&s=${search == '' ? 'batman' : search}`);
      setData(response['data']['Search']);
      console.log(response['data']);
      setLoading(false);
    //   console.log(data.Search[1].Title);
    } catch (error) {
      console.log(error);
    }
  }

  const searchData = async ()=>{
    await getData();
    setSearch('');
  }

  const getFavData = async ()=>{
    try{
      let fav = await AsyncStorage.getItem('fav');
      console.log(fav);
    } catch (error) {
      console.log(error)
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

  function keyExtractor(item, index) {
    return item + index;
  }

  useEffect(()=>{
    getData();
  }, []);

  const renderItemCall = useCallback(({ item, index }) => renderItem({ item, index, favorites, setFavorite }));
  
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
          placeholder="Busque aqui..."
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
          onPress={getFavData}
        />
      </View>
      <View style={styles.container}>
        {/* <Text>{data.Search[1].Title}</Text> */}
        <FlatList
          extraData={favorites}
          data={data}
          renderItem={renderItemCall}
          keyExtractor={keyExtractor}
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
  },
});
