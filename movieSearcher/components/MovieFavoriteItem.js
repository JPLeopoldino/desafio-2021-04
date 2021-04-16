import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Poster from './Poster';

const MovieFavoriteItem = ({ poster, title, year, id, isFavorite, onPress }) => {

    return (
        isFavorite ?
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => onPress(title)}
                    style={styles.favoriteContainer}
                >
                    <Icon
                        name={isFavorite ? 'star' : 'star-outline'}
                        color={isFavorite ? '#F76E2A' : '#AAA'}
                        containerStyle={styles.iconContainer}
                    />
                </TouchableOpacity>
                <Poster img={poster} />
                <View style={styles.itemContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>Ano: {year}</Text>
                    </View>
                </View>
            </View>
            : null
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 50,
        position: 'relative',
    },
    favoriteContainer: {
        position: 'absolute',
        zIndex: 99,
        top: 0,
        right: 0,
        marginHorizontal: 50,
        marginVertical: 20,
        elevation: 230,
    },
    iconContainer: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 30,
        elevation: 5,
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
        elevation: 8,
    },
    title: {
        color: '#663366',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    },
    description: {
        marginTop: 4,
        color: '#947394',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default MovieFavoriteItem;