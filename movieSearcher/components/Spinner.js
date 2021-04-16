import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ loading }) => {
  return (loading
    ? <View style={{ width: '100%', height: '100%', justifyContent: 'space-evenly', alignItems: 'center', position: 'absolute', zIndex: 99, backgroundColor: '#FFF' }}>
      <ActivityIndicator size="large" color="#663366" />
    </View>
    : null
  );
}

export default Spinner;