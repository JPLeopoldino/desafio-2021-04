import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MovieItem = ({poster, title, year, id, isFavorite, onPress})=>{

    // const setFavData = async (key, value)=>{
    //     try {
    //         await AsyncStorage.setItem(key, value);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return(
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{uri:poster}}
            />
            {/* {
            item.Poster == "N/A" ? 
            <View style={styles.nullImage} >
                <Icon
                    name='help'
                    type='material-community'
                    color='#BBB'
                    size={80}
                />
            </View> :
            <Image
                style={styles.image}
                source={{uri:item.Poster}}
            />
            } */}
            <View style={styles.itemContainer}>
                <View style={styles.textContainer}>
                    <Text style={style.title}>{title}</Text>
                    <Text style={style.description}>Ano: {year}</Text>
                </View>
                <TouchableOpacity
                    onPress={()=>console.log(isFavorite)}
                >
                    <Icon
                        name='circle'
                        type='material-community'
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> onPress(title)}
                >
                    <Icon
                        name={isFavorite ? 'star' : 'star-outline'}
                        type='material-community'
                        color='#AAA'
                        style={styles.icon}
                    />
                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 50,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 500,
        borderRadius: 13,
        backgroundColor: '#AAA'
    },
    nullImage: {
        width: '100%',
        height: 500,
        borderRadius: 13,
        backgroundColor: '#DDD',
        justifyContent: 'center'
    },
    itemContainer: {
        marginHorizontal: 50,
        marginVertical: 20,
        position: 'absolute',
        zIndex: 99,
        backgroundColor: '#FFF',
        borderRadius: 13,
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    textContainer: {
        
    },
    icon:{
    },
});

const style = StyleSheet.create({
    starContainer: {
        justifyContent: 'center',
    },
    title: {
        color: '#14191f',
        fontWeight: 'bold',
        fontSize: 23,
        textAlign: 'center',
    },
    description: {
        color: '#777',
        fontSize: 15,
        textAlign: 'center',
    },
    price: {
        fontSize: 30,
        color: '#02b025',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    itemContent: {
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 40,
    },
    content: {
        flexDirection: 'row',
        padding: 25,
        borderBottomWidth: 0.3,
        borderColor: '#000',
        backgroundColor: '#FFF'
    },
    image: {
        height: 100,
        width: '50%',
        borderRadius: 10,
    },
    // line: {
    //     position: 'absolute',
    //     width: '150%',
    //     height: 1,
    //     backgroundColor: '#FFF',
    // }
});

export default MovieItem;