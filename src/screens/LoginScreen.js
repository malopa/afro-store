import { FontAwesome } from '@expo/vector-icons';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar.js';
import { Box, Button, Center, HStack, Icon, Image, Input, StatusBar, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { AuthDialog } from '../components/AuthDialog.js';
import { login } from '../data/api.js';
import { data } from '../data/data';
import { _login } from '../features/userSlice.js';

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

export default function LoginScreen({navigation}) {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch()
  const user = useSelector(state=>state.user);

    const mutation = useMutation(login,{
      onSuccess:(data)=>{

      if(data.status){
        dispatch(_login(data))
        navigation.navigate("Dashboard")
      }
    }})
    const [mobile,setMobile] = useState(null);
    const [password,setPassword] = useState(null);

    const handleLogin = async ()=>{
        let data = {mobile,password}
        if(!mobile || !password){
          return;
        }
        setIsOpen(!isOpen);
        mutation.mutate(data);
    }

    // alert(JSON.stringify(user.isLoggedIn))
    if(user.isLoggedIn){
      return navigation.navigate("Dashboard")
    }

  return (
    <Box flex={1} bg="white" p={4}>
      <ExpoStatusBar bg='gold'/> 

        <Center flex={1} bg='red' p={4}>

        <Box p={4}><Text fontSize={18} fontWeight='bold'>Afro Sell</Text></Box>

          {JSON.stringify(user.isLogin)}

          <Button rounded='full' bg='black' w='full'> 
          <HStack >
            <Icon color='amber.400' size={6} rounded='full' as={<FontAwesome name='google' />}/> 
            <Text color='white' px={2}>Signin with google</Text>
          </HStack>
          </Button>

            <Text p={4}>--Or--</Text> 
            <Input outlined={true} activeUnderlineColor={"#000"}
              underlineColor={'#333'} 
              size='lg' my={2}
              placeholder="Username"
              value={mobile}
              fontSize={16}
              py={3}
              px={4}
              keyboardType='numeric'
              rounded='full'
              onChangeText={text=>setMobile(text)}
              _focus={{bg:'white',borderColor:'amber.800'}} 
            />

            <Input placeholder='password' 
              type='password' mt={2} 
              size='lg'
              py={3}
              _focus={{bg:'white',borderWidth:1,borderColor:'amber.800'}} 
              activeUnderlineColor={"#000"}
              underlineColor={'#333'} 
              value={password}
              fontSize={16}
              px={4}
              rounded='full'
              onChangeText={text=>setPassword(text)}
              label="Password" 
              />

            <VStack w='full' justifyContent='space-between'>
            <Button onPress={handleLogin} rounded={'full'} mt={6} width='full'
              py={3}  
              bg='amber.400' >
                <Text fontWeight='bold'>Log In</Text>
              </Button>

              <Button w='full' onPress={()=>navigation.navigate("SignUp")} 
              rounded={'full'} borderColor='gray.500' borderWidth={1} mt={6} py={3}  bg='white' >
                <Text color='black' fontWeight='bold'>Sign Up</Text></Button>
              
              <Button w='full' 
              _onFocus={{bg:'white'}}
              onPress={()=>navigation.navigate("Dashboard")} 
                rounded={'full'} borderColor='gray.500' borderWidth={1} mt={6} py={3}  bg='white' >
                <Text color='black' fontWeight='bold'>Signup Later > > </Text>
              </Button>
              

            </VStack>

        <AuthDialog isOpen={isOpen} setIsOpen={setIsOpen} />
            

        </Center>
    </Box>
  )
}
