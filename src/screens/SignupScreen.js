import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { Box, Button, Center, Heading, Input, ScrollView, Text } from 'native-base'
import React, { useState,useRef,StatusBar } from 'react'
import PhoneInput from 'react-native-phone-number-input';
import { useMutation } from 'react-query'
import { AuthDialog } from '../components/AuthDialog';
import { signUp } from '../data/api';

// import {
//     SafeAreaView,
//     StyleSheet,
//     View,
//     StatusBar,
//     TouchableOpacity,
//   } from "react-native";
//   import PhoneInput from "react-native-phone-number-input";



export default function SignupScreen({navigation}) {
    const [isOpen, setIsOpen] = useState(false);

    // sign up
    const mutation = useMutation(signUp,{
        onSuccess:(data)=>{
            setIsOpen(!isOpen)
            if(data.status){
                navigation.navigate("Dashboard")            
            }
    }})

    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);
    const bphoneInput = useRef(null);

    const [mobile,setMobile] = useState(null);
    const [businesName,setBusinessName] = useState(null);
    const [businesNumber,setBusinessNumber] = useState(null);
    const [email,setEmail] = useState(null);
    const [username,setUsername] = useState(null);
    const [location,setBusinessLocation] = useState(null);
    const [password,setPassword] = useState(null);
    const [cpassword,setCpassword] = useState(null);


    const handleSignup = ()=>{
        if(password !== cpassword) return;
        if(!location)return;

        const checkValid = phoneInput.current?.isValidNumber();
           setValid(checkValid ? checkValid : false);
        if(!valid){
            alert("Wrong phone number")
            return;
        }

        setIsOpen(!isOpen)
        let data = {username,mobile,businesName,businesNumber,
            email,location,password}
            mutation.mutate(data)
    }

    return (
    <ScrollView p={4} bg='#FFF' flex={1}>
      <ExpoStatusBar bg='gold' 
      />

            <Center mt={5}>
                <Heading p={2}  alignItems='center' justifyContent='center'>
                    REGISTER
                </Heading>
            
        {/* <Input 
            m={2}
            bg='white'
            _focus={{bg:'white'}}
            size={16}
            placeholder='Enter Mobile number'
            p={2}
            value={mobile}
            onChangeText={text=>setMobile(text)}
        /> */}

        <PhoneInput
            ref={phoneInput}
            defaultValue={mobile}
            defaultCode="TZ"
            onChangeFormattedText={(text) => {
              setMobile(text);
            }}
            placeholder='Enter Your phone number'
            withDarkTheme
            autoFocus
            containerStyle={{borderWidth:1,margin:2,borderRadius:4, borderColor:'#bebfc8',width:'100%'}}
          />

        <Input 
            m={2}
            fontSize={16}
            _focus={{bg:'white'}}
            value={username}
            onChangeText={text=>setUsername(text)}
            placeholder='Enter Your name'
            p={4}
            w='full'
        />

        <Input 
            m={2}
            p={4}
            w='full'
            fontSize={16}
            _focus={{bg:'white'}}
            value={businesName}
            onChangeText={text=>setBusinessName(text)}
            placeholder='Enter Buisness Name'
        />

        {/* <Input 
            m={2}
            p={4}
            w='full'
            fontSize={16}
            _focus={{bg:'white'}}
            value={businesNumber}
            onChangeText={text=>setBusinessNumber(text)}
            placeholder='Enter Buisness Number'
        /> */}

        <PhoneInput
            ref={bphoneInput}
            defaultValue={businesNumber}
            defaultCode="TZ"
            onChangeFormattedText={(text) => {
                setBusinessNumber(text);
            }}
            placeholder='Enter Your Business number'
            withDarkTheme
            autoFocus
            containerStyle={{borderWidth:1,margin:2,borderRadius:4, borderColor:'#bebfc8',width:'100%'}}
          />

        <Input 
            m={2}
            fontSize={16}
            _focus={{bg:'white'}}
            value={email}
            w='full'
            onChangeText={text=>setEmail(text)}
            placeholder='Enter email'
            keyboardType='email'
            p={4}
        />

        <Input 
            m={2}
            fontSize={16}
            _focus={{bg:'white'}}
            value={location}
            w='full'
            onChangeText={text=>setBusinessLocation(text)}
            placeholder='Enter Location'
            p={4}
        />


        <Input 
            m={2}
            placeholder='Password'
            p={4}
            w='full'
            size={16}
            _focus={{bg:'white'}}
            value={password}
            onChangeText={text=>setPassword(text)}

        />
        <Input
            m={2}
            placeholder='Confirm Password'
            p={4}
            w='full'
            _focus={{bg:'white'}}
            value={cpassword}
            onChangeText={text=>setCpassword(text)}
            size={16}
        />

        <Button m={2} width='100%' onPress={handleSignup} py={4} rounded='full' bg='amber.600'>REGISTER</Button>

        <AuthDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </Center> 

    </ScrollView>
  )
}
