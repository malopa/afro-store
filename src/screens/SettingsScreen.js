import { Box, Center, Divider, HStack, Icon, Text } from 'native-base'
import React from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { Pressable } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export default function SettingsScreen({navigation}) {
    const user = useSelector(state=>state.user);

  return (<Box py={8} px={4} flex={1} bg='white'>
            <Text>Profile</Text>
            <Center mt={8}>
                <Box rounded={'full'} p={2} borderColor="gold" borderWidth={2}>
                <Icon as={<MaterialCommunityIcons name="account" />} 
                color={'gray'} size={8} />
            </Box>
            <Text color="gray.500">{user?.user?.name}</Text>
            <Text color="gray.600">{user?.user?.email}</Text>
            </Center>
            <Divider _light={{bg:'gray.100'}} mt={8}/>
            <HStack w='full' py={3}  px={1} justifyContent='space-between' 
            alignItems={'center'} >
                <Box>
                <HStack alignItems={'center'}>
                <Box mr={2} borderColor='yellow.50' alignItems="center" justifyContent='center' textAlign='center' borderWidth={2} p={2} rounded="full" > 
                    <Icon as ={<Octicons name="list-unordered" />} size={6}/>
                </Box>
                    <Text color={"red"}>My Posts</Text>
                </HStack>
                </Box>
                <Icon as ={<FontAwesomeIcon name="angle-right" />} color='gray.200' size={6}/>
            </HStack>
            <Divider  _light={{
        bg: "muted.100"
      }} borderColor={"yellow.200"} />
            
            <Pressable onPress={()=>navigation.navigate("AddProduct")}>
            <HStack w='full' py={3} px={2} justifyContent='space-between' 
            alignItems={'center'} >
                <Box>
                    
                <HStack alignItems={'center'}>
                <Box mr={2} borderColor='yellow.50' alignItems="center" 
                justifyContent='center' textAlign='center'
                 borderWidth={2} p={2} rounded="full" > 
                    <Icon as ={<Entypo name="add-to-list" />} size={6}/>
                
                </Box>
                    <Text color={"red"} >Add Products</Text>
                </HStack>
                </Box>
                <Icon color='gray.100' as={<FontAwesomeIcon name="angle-right" />} size={6}/>
            </HStack>
            </Pressable>

            <Divider _light={{bg:'gray.100'}}/>

            <HStack w='full' py={3} px={1} justifyContent='space-between' 
            alignItems={'center'} >
                <Box>
                <HStack alignItems={'center'}>
                    <Box mr={2} borderColor='yellow.50' alignItems="center" 
                    justifyContent='center' textAlign='center' borderWidth={2} p={2} 
                    rounded="full" > 
                        <Icon  as ={<AntDesign name="message1" />} size={6}/>
                    </Box>
                    <Text color={"red"}>Inbox</Text>
                </HStack>
                </Box>
                <Icon color='gray.100' as ={<FontAwesomeIcon name="angle-right" />} size={6}/>
            </HStack>
            <Divider _light={{bg:'gray.100'}}/>

            <HStack w='full' py={2} px={1} justifyContent='space-between' 
            alignItems={'center'} >
                <Box>
                <HStack alignItems={'center'}>
                <Box mr={2} borderColor='yellow.50' alignItems="center" 
                justifyContent='center' textAlign='center' 
                borderWidth={2} p={2} rounded="full" > 
                    <Icon as ={<Ionicons name="person-outline" />} 
                    size={6}/>
                </Box>
                    <Text color={"red"}>Personal Details</Text>
                </HStack>
                </Box>
                <Icon color='gray.100' as ={<FontAwesomeIcon name="angle-right" />} size={6}/>
            </HStack>
            <Divider _light={{bg:'gray.100'}}/>

            <Pressable onPress={()=>navigation.navigate("Login")}>
                <HStack w='full' py={2} px={1} justifyContent='space-between' 
                alignItems={'center'} >
                    <Box>
                    <HStack alignItems={'center'}>
                    <Box mr={2} borderColor='yellow.50' alignItems="center" justifyContent='center' textAlign='center' borderWidth={2} p={2} rounded="full" > 
                        <Icon as ={<FontAwesomeIcon name="sign-out" />} size={6}/>
                    </Box>
                        <Text color={"red"} >Sign out</Text>
                    </HStack>
                    </Box>
                    <Icon color='gray.100' as={<FontAwesomeIcon name="angle-right" />} size={6}/>
                </HStack>
            </Pressable>
            <Divider _light={{bg:'gray.100'}}/>
        </Box>
  )
}
