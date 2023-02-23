import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Box, Center, FlatList, Icon, Image, Text } from 'native-base'
import React from 'react'
import { render } from 'react-dom'
import { Pressable } from 'react-native'


const data = [
    {id:1,name:"watch one then we  later",price:2000,img:require('../assets/pic1.jpeg')},
    {id:2,name:"Serenium watch in full",price:2000,img:require('../assets/pic2.jpeg')},
    {id:3,name:"Digital watch, walk smart",price:2000,img:require('../assets/pic3.jpeg')},
    {id:4,name:"White sneaker, attraction",price:2000,img:require('../assets/pic4.jpeg')},
    {id:5,name:"watch ahoewa",price:2000,img:require('../assets/pic5.jpeg')},
    {id:6,name:"Cap cat then one to buy" ,price:2000,img:require('../assets/pic1.jpeg')},
    {id:7,name:"watch  equalizer",price:2000,img:require('../assets/pic1.jpeg')},
    {id:8,name:"watch  or the later",price:2000,img:require('../assets/pic1.jpeg')},
  ];


export default function ShoperScreen({navigation}) {

    const renderItem  = ({item})=>{
        return (
            <Pressable w={'50%'} m={1} bg='white' rounded='md'
                onPress={()=>navigation.navigate("ProductDetails",
                {title:item.name,img:item.img})}>

                <Center p={2} alignItems='center'  h={250} flex={1} >
                <Box position={"relative"} py={1} my={1}
                bg="white" borderBottomColor={'orange.300'} >
                    <Box bg='gray.50' p={2} rounded='md' w='98%'>
                    <Image resizeMode='cover' source={item.img} w={140} alt={''} 
                    bg='gray.300' m={1} h={150} />
                    <Icon  as={<MaterialIcons name="favorite-border"/>} size={6} 
                    position={"absolute"} right={10} 
                    top={10}/>
                </Box>
                <Box p={1} mt={-1}>
                    <Text color='blueGray.600' letterSpacing='sm'>{item.name}</Text>
                <Text fontSize={16} mt={2} fontWeight='bold' letterSpacing='sm'>Tzs {item.price}</Text>
                </Box>
                </Box>
                </Center>
                </Pressable>
        )
            };



            const ShopperHeader = ()=>{
                return (
                <Center p={4}>
                    <Box>
                        <Icon size={16} as={<Ionicons name="person-circle-outline" />} />
                        <Text letterSpacing={0} color='gray.700'>@joedoe</Text>
                    </Box>
                </Center>
                );
                
            }
  return (
    <Center bg='fff' flex={1}>
       <FlatList  w={"full"}
        ListHeaderComponent={ShopperHeader}
            renderItem={renderItem}
            data={data}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
            paddingBottom:20
            ,alignItems:'center'
      }}
      /> 

    </Center>
  )
}
