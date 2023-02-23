import { Box, Button, Center, Heading, Input, Text } from 'native-base'
import React, { useState } from 'react'

import { useMutation } from 'react-query'
import { AuthDialog } from '../components/AuthDialog';
import { signUp } from '../data/api'


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
        if(!mobile && !location)return;

        setIsOpen(!isOpen)
        let data = {username,mobile,businesName,businesNumber,
            email,location,password}
            mutation.mutate(data)
    }

    return (
    <Box p={4} bg='#FFF' flex={1}>
            <Center mt={5}>
                <Heading p={2} alignItems='center' justifyContent='center'>
                    Register
                </Heading>
        </Center> 
            
        <Input 
            m={2}
            bg='white'
            _focus={{bg:'white'}}
            size={16}
            placeholder='Enter Mobile number'
            p={2}
            value={mobile}
            onChangeText={text=>setMobile(text)}
        />

        <Input 
            m={2}
            size={16}
            _focus={{bg:'white'}}
            value={username}
            onChangeText={text=>setUsername(text)}
            placeholder='Enter Your name'
            p={2}
        />

        <Input 
            m={2}
            p={2}
            size={16}
            _focus={{bg:'white'}}
            value={businesName}
            onChangeText={text=>setBusinessName(text)}
            placeholder='Enter Buisness Name'
        />

        <Input 
            m={2}
            p={2}
            size={16}
            _focus={{bg:'white'}}
            value={businesNumber}
            onChangeText={text=>setBusinessNumber(text)}
            placeholder='Enter Buisness Number'
        />

        <Input 
            m={2}
            size={16}
            _focus={{bg:'white'}}
            value={email}
            onChangeText={text=>setEmail(text)}
            placeholder='Enter email'
            p={2}
        />

        <Input 
            m={2}
            size={16}
            _focus={{bg:'white'}}
            value={location}
            onChangeText={text=>setBusinessLocation(text)}
            placeholder='Enter Location'
            p={2}
        />


        <Input 
            m={2}
            placeholder='Password'
            p={2}
            size={16}
            _focus={{bg:'white'}}
            value={password}
            onChangeText={text=>setPassword(text)}

        />
        <Input
            m={2}
            placeholder='Confirm Password'
            p={2}
            _focus={{bg:'white'}}
            value={cpassword}
            onChangeText={text=>setCpassword(text)}
            size={16}
        />

        <Button m={2} onPress={handleSignup} bg='amber.600'>Register</Button>

        <AuthDialog isOpen={isOpen} setIsOpen={setIsOpen} />

    </Box>
  )
}
