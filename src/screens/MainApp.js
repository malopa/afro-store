import { Box, Heading, Icon, Input, VStack } from 'native-base'
import React, { useEffect } from 'react'
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import CartScreen from './CartScreen';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainApp({navigation}) {

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      
      e.preventDefault();
      
    });
  
    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      headerShown={false}
      barStyle={{ paddingBottom: 4 }}

      screenOptions={{
        tabBarStyle: { position: 'absolute' },
        tabBarActiveTintColor: '#ffed62',
        
      }}

      tabContainerStyle={{
        elevation:0,
        shadowColor:"none"
      }}

    >
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
        tabBarLabel: 'Home',
        headerShown:false,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
        
      }}


       />
      <Tab.Screen name="Cart" component={CartScreen} 
      options={{
        title:"",
        tabBarLabel: 'Explore',
        headerStyle: {
          borderBottomWidth: 0,
          elevation:0,
          shadowColor:'none'
        },
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon name="search" color={color} size={26} />
        ),
        headerRight:()=>(
          <VStack alignSelf="center" w='90%' rounded='md'>
        <Input placeholder="Search Prooduct here" width="100%" 
        borderRadius="4" py="2" px="1" 
        fontSize="14" 
        _focus={{bg:'white',borderColor:'amber.400'}}
        InputLeftElement={<Icon m="2" ml="2" size="6" 
        color="gray.400" as={<MaterialIcons name="search" />} />} 
        InputRightElement={<Icon m="2" mr="3" size="6" color="gray.400" 
        as={<MaterialIcons name="mic" />} />} />
      </VStack>
        )
      }}
      />

      <Tab.Screen name="Settings" component={SettingsScreen} 
       options={{
        headerShown:false,
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
      />
    </Tab.Navigator>
  )
  
}
