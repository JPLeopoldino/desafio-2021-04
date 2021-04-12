import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MovieItem = ({item})=>{
    return(
        <View
            style={style.content}
        >
            <Image
                style={style.image}            
                source={{uri:item.Poster}}
            />
            <View
                style={style.itemContent}
            >
            <Text
                style={style.title}
            >{item.Title}</Text>
            <Text
                style={style.description}
            >Ano: {item.Year}</Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
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
        padding: 30,
        borderBottomWidth: 0.3,
        borderColor: '#000',
        backgroundColor: '#FFF'
    },
    image: {
        height: 100,
        width: 70,
        borderRadius: 10,
    },
    // line: {
    //     position: 'absolute',
    //     width: '150%',
    //     height: 1,
    //     backgroundColor: '#FFF',
    // }
})

export default MovieItem;