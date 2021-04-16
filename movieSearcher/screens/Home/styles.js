import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        justifyContent: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fafafa',
    },
    searchBarContainer: {

        flex: 2,
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },
    searchBarInput: {
        color: '#FFF',
        backgroundColor: '#663366',
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    input: {
        color: '#FFF',
    },
    button: {
        flex: 1,
        marginRight: 10,
        marginVertical: 8,
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#F76E2A',
    }
});

export default styles;