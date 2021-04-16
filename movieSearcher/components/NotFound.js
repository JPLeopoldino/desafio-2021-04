import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const NotFound = ({ error, onPress }) => {
  return (error ?
    <View
      style={{ width: '100%', height: '100%', justifyContent: 'space-evenly', alignItems: 'center', position: 'absolute', zIndex: 99, backgroundColor: '#FFF' }}
    >
      <View
        style={{ alignItems: 'center' }}
      >
        <Text
          style={{ color: 'red', fontSize: 80, fontWeight: 'bold' }}
        >Error :/</Text>
        <Text
          style={{ color: '#999', fontSize: 30 }}
        >Try reload your app</Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={{ backgroundColor: '#FFF' }}
      >
        <Icon
          name='refresh'
          type='ionicons'
          color='#999'
          size={40}
          containerStyle={{ backgroundColor: '#FFF', padding: 10, borderRadius: 30, elevation: 5 }}
        />
      </TouchableOpacity>
    </View>
    : null
  );
}

export default NotFound;