import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import MainApp from '../screens/MainApp';
import ProductDetails from '../screens/ProductDetails';
import ShoperScreen from '../screens/ShoperScreen';
import AddProductScreen from '../screens/Products/AddProductScreen';
import SignupScreen from '../screens/SignupScreen';
import MyProductScreen from '../screens/Products/MyProductScreen';



const Stack = createNativeStackNavigator();

export default function AppScreens({navigation}) {

  return (
    <Stack.Navigator
    screenOptions={{
        headerShown:false,
        headerStyle:{elevation:0,shadowColor:'none'}
    }}
    >
        <Stack.Screen name='Login' component={LoginScreen} 
        options={{title:"Login",headerShown:false}} />

        <Stack.Screen name='Dashboard' component={MainApp} />
        <Stack.Screen name='ProductDetails' 
        component={ProductDetails} 
        options={({route})=>({title:route.params.title})} />

      <Stack.Screen name='ShoperScreen' 
        component={ShoperScreen} 
        options={({route})=>({title:route.params.title,
          headerShown:true,headerStyle:{
            elevation:0,
        shadowColor:'none',
        shadowOpacity:0,
        borderBottomWidth:0}
        })
        } />

      <Stack.Screen name='AddProduct' 
        component={AddProductScreen} 
        options={({route})=>({title:"Add product",
          headerShown:true,
          headerStyle:{
            elevation:0,
            borderBottomWidth:0,
            shadowColor:'none'
          }
        })
        } />


        <Stack.Screen name='SignUp' 
        component={SignupScreen} 
        options={({route})=>({title:"Sign up",
          headerShown:false,
          headerStyle:{
            elevation:0,
            borderBottomWidth:0,
            shadowColor:'none'
          }
        })
        } />


<Stack.Screen name='MyProduct' 
        component={MyProductScreen} 
        options={({route})=>({title:"Sign up",
          headerShown:false,
          headerStyle:{
            elevation:0,
            borderBottomWidth:0,
            shadowColor:'none'
          }
        })
        } />
    </Stack.Navigator>
   
  )

}
