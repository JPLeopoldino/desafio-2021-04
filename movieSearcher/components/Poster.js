import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const Poster = ({ img }) => {
    return (
        img == "N/A"
            ?
            <View style={styles.nullImage} >
                <Icon
                    name='help'
                    type='material-community'
                    color='#c9b3c9'
                    size={80}
                />
                <Text style={styles.nullText}>
                    Image not found
            </Text>
            </View>
            :
            <View
                style={styles.imageContainer}
            >
                <Image
                    style={styles.image}
                    source={{ uri: img }}
                />
            </View>
    )
}

export default Poster;

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 500,
        borderRadius: 22,
        backgroundColor: '#AAA',
        elevation: 8,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 22,
    },
    nullImage: {
        width: '100%',
        height: 500,
        borderRadius: 13,
        backgroundColor: '#663366',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nullText: {
        color: '#c9b3c9',
        fontSize: 18,
        fontWeight: 'bold',
    },
});