import { Box,Image,FlatList, Center, Icon, Text } from 'native-base'
import React, { useState } from 'react'
import { Pressable } from 'react-native';
// import {  } from 'react-native';
// import { SliderBox } from 'react-native-image-slider-box'

// import { SliderBox } from "react-native-image-slider-box";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const data = [
  {id:1,name:"watch one",price:2000,img:require('../assets/pic1.jpeg')},
  {id:2,name:"watch two",price:2000,img:require('../assets/pic2.jpeg')},
  {id:3,name:"watch thre",price:2000,img:require('../assets/pic3.jpeg')},
  {id:4,name:"watch ahoewa",price:2000,img:require('../assets/pic4.jpeg')},
  {id:5,name:"watch ahoewa",price:2000,img:require('../assets/pic5.jpeg')},
  {id:6,name:"watch ahoewa",price:2000,img:require('../assets/pic1.jpeg')},
  {id:7,name:"watch ahoewa",price:2000,img:require('../assets/pic1.jpeg')},
  {id:8,name:"watch ahoewa",price:2000,img:require('../assets/pic1.jpeg')},
];
export default function CartScreen({navigation}) {

  
  const [images,setImages] = useState(
    [
      "https://source.unsplash.com/1024x768/?nature",
      "https://source.unsplash.com/1024x768/?water",
      "https://source.unsplash.com/1024x768/?girl",
      "https://source.unsplash.com/1024x768/?tree", // Network image
      require('../assets/pic1.jpeg')
      
    ]
  )
  
  const renderItem = ({item})=>{
    return <Pressable w='100%' m={1} bg='white' rounded='md'
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
  }



  return (
    <Center flex={1}>

  <FlatList w={"full"} flex={1}
  _contentContainerStyle={{
    justifyContent:'space-around',
    alignItems:'center'
  }}
      
      renderItem={renderItem}
      data={data}
      keyExtractor={item => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      _contentContainerStyle={{
        backgroundColor:"white",
        paddingBottom:20
      }}
      /> 

    </Center>

  )
}
