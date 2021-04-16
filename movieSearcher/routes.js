import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';


import Home from './screens/Home';
import Favorites from './screens/Favorites';

const Tab = createBottomTabNavigator();

const routes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Favoritos') {
              iconName = focused
                ? 'star'
                : 'star-outline';
            }
            return <Icon name={iconName} type='ionicons' size={24} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#F76E2A',
          inactiveTintColor: 'gray',
          activeBackgroundColor: '#663366',
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favoritos" component={Favorites} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default routes;