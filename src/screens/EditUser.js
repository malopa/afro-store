import { Box, Button, Center, Heading, Input, Text } from 'native-base'
import React, { useState } from 'react'

import { useMutation } from 'react-query'
import { useSelector } from 'react-redux';
import { AuthDialog } from '../components/AuthDialog';
import { signUp, updateUser } from '../data/api'


export default function EditUserScreen({navigation}) {
    const [isOpen, setIsOpen] = useState(false);

    const {token,user} = useSelector(state=>state.user);
    
    const mutation = useMutation(updateUser,{
        onSuccess:(data)=>{
            setIsOpen(!isOpen)
            if(data.status){
                navigation.navigate("Dashboard")            
            }
    }})


    const [mobile,setMobile] = useState(user.mobile);
    const [businesName,setBusinessName] = useState(user.busines_name);
    const [businesNumber,setBusinessNumber] = useState(user.busines_mobile);
    const [email,setEmail] = useState(user.email);
    const [username,setUsername] = useState(user.name);
    const [location,setBusinessLocation] = useState(user.email);


    const handleSignup = ()=>{
        // if(!mobile || !businesNumber) return;
        // if(!mobile && !location)return;

        // setIsOpen(!isOpen)
        let data = {username,mobile,busines_name:businesName,busines_mobile:businesNumber,
            email,location,token}
            // alert(JSON.stringify(data))
            // return;
            mutation.mutate(data)
    }

    return (
    <Box p={4} bg='#FFF' flex={1}>
            <Center mt={5}>
        </Center> 

        <Input 
            m={2}
            bg='white'
            _focus={{bg:'white'}}
            size={16}
            placeholder='Enter Mobile number'
            p={2}
            isReadOnly={true}
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


        

        <Button m={2} onPress={handleSignup} fontWeight='bold' bg='amber.600'>UPDATE DETAILS</Button>

        <AuthDialog isOpen={isOpen} setIsOpen={setIsOpen} />

    </Box>
  )
}
