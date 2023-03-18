import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { Box,Pressable, Button, Center, FlatList, HStack, Icon, Image, Text } from 'native-base'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { getProductDetails } from '../data/api'



export default function ProductDetails({route,navigation}) {

    const user = useSelector(state=>state.user);
    
    let params = route.params 
    const {data:details} = useQuery({queryKey:['products-detals'], queryFn:()=>getProductDetails(params.id)})

    const [itemImg,setItem] = useState(route.params.img)

    const renderImage = ({item})=>{
        return <Pressable borderWidth={1} borderColor='gray.200' rounded='md' mx={2} onPress={()=>setItem(item.img)}>
           <Image bg='gray.100' 
                source={{uri:item}} 
                alt='item' w={20}  h={20} resizeMode='cover' ml={2} /> 
        </Pressable>
    }


    const renderRelatedContent = ({item})=>{
        return <Pressable rounded='md'  w={200} ml={2} 
            onPress={()=>navigation.navigate("ProductDetails",{title:item.name,img:item.image[0]})}>
            <Center  alignItems='center'  h={250} flex={1} bg='white'>
                <Box position={"relative"} py={1} my={1}
                bg="white" borderBottomColor={'orange.300'} rounded={'md'}>
                    <Box bg='white' p={2} rounded='md' w='100%'>
                    <Image resizeMode='cover' source={details?.data?.image[0]} w={128} alt={''} bg='gray.300' 
                    m={1} h={150} />
                    <Icon  as={<MaterialIcons name="favorite-border"/>} size={6} 
                    position={"absolute"} right={10} 
                    top={10}/>
                </Box>
                    <Box>
                        <Text color='blueGray.600' letterSpacing='sm'>{item.name}</Text>
                        <Text fontSize={16} fontWeight='bold' letterSpacing='sm'>Tzs {item.price}</Text>
                    </Box>
                </Box>
            </Center>
            </Pressable>
    }

    // const user = useSelector(state=>state.user)

    const handleLoginStatus = ()=>{
        if(user){

            if(user.isLoggedIn){
                
                navigation.navigate("QuickSignup")
            }else{
                navigation.navigate("Login")
            }
        }else{

            navigation.navigate("Login")

        }
    }   

  return (<ScrollView
    showsVerticalScrollIndicator={false}
    backgroundColor='white'
    flex={1}
  >

            <Box  p={4} h={250} flex={1} justifyContent='center' alignItems='center'>

                <Image pt={4} 
                resizeMode='cover' 
                bg='gray.100' 
                source={{uri:details?.data?.image[0]}} 
                alt='item' w={200} h={200}
                />

            </Box>
            <Box>
            </Box>
            <Box bg='white' py={2} borderColor='gray.100'>
                <FlatList bg='white'
                    horizontal={true}
                    data={details?.data?.image}
                    renderItem={renderImage}
                    keyExtractor={item=>item.id}
                />
            </Box>
            <Box bg='#FFF' p={4}>
                <Text fontWeight='bold' fontSize={16}>{route.params.title}</Text>
                <Text color='gray.800' letterSpacing={0} fontSize={16}>{} </Text>

                <Box p={2} mt={4}>
                    <Text letterSpacing={.2} fontSize={18} fontWeight='bold'>TZS {details?.data?.price}</Text>
                </Box>

                <Text font='bold' color='gray.600' p={2}>Product status : {details?.data?.price}</Text>

                <Pressable onPress={()=>navigation.navigate("ShoperScreen",{title:details?.data?.user?.name})}>
                    <Text font='bold' color='gray.800' underline={true} p={2} py={1} >More about provider <Icon name={<FontAwesome name='angle-right' />} size={6} /> </Text>
                </Pressable>
                
                <HStack justifyContent='space-between' p={2}>
                    <Button onPress={handleLoginStatus} 
                        bg='#FFF' p={0} 
                        rounded='full' 
                        w={150} color='black' 
                        borderColor={`black`} 
                        borderWidth={1} px={4}
                    >
                        <Text color='black'>Send Message</Text>
                        </Button>
                    <Button bg='amber.300' color='black' w={150} rounded='full' px={8}>
                        <Text color='black'>Call Now</Text>
                        </Button>
                </HStack>

            </Box>

            <Box mt={4}>
                <Text fontWeight='bold' px={2} my={4} fontSize={18}>Related Content</Text></Box>

{/* <Box>{JSON.stringify(details)}</Box> */}

            <FlatList p={2} bg='amber.100'
                data={details?.related} 
                horizontal={true}
                renderItem={renderRelatedContent}
                keyExtractor={item=>item.id}
                showsHorizontalScrollIndicator={false}
            /> 
          </ScrollView>
  )
}
