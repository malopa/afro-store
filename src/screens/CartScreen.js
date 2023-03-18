import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { Box,Image,FlatList, Center, Icon, Text } from 'native-base'
import React, { useContext, useState } from 'react'
import { Pressable } from 'react-native';
// import {  } from 'react-native';
// import { SliderBox } from 'react-native-image-slider-box'

// import { SliderBox } from "react-native-image-slider-box";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useQuery } from 'react-query';
import { SearchContext } from '../context/SearchContext';
import { getProducts } from '../data/api';



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

  const {data:posts} = useQuery({queryKey:['products'], queryFn:()=>getProducts()})
  
  const {searchPhrase,setClicked} = useContext(SearchContext);

  const renderItem = ({item})=>{

    if (searchPhrase === "") {
      return <Pressable w={'49%'} m={1} bg='white' rounded={'md'}
        onPress={()=>navigation.navigate("ProductDetails",{title:item.name,id:item._id,img:item?.image[0]})}>
        <Center p={2} alignItems='center'  h={250} flex={1} >
        <Box position={"relative"} py={1} my={1}
        bg="white" borderBottomColor={'orange.300'} >
          <Box bg='gray.10' p={2} rounded='md' w='98%'>
            <Image resizeMode='cover' 
            source={{uri:item?.image[0]}} w={150} alt={''} 
            bg='gray.300' m={1} h={150} />
            <Icon  as={<MaterialIcons name="favorite-border"/>} size={6} 
            position={"absolute"} right={10} 
            top={10}/>
        </Box>
        <Box>
          <Text color='blueGray.600' letterSpacing='sm'>{item.name}</Text>
         <Text fontSize={16} mt={2} fontWeight='bold' letterSpacing='sm'>Tzs {item.price}</Text>
        </Box>
      </Box>
      </Center>
      </Pressable>
    }
    else if(item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Pressable w={'49%'} m={1} bg='white' rounded={'md'}
      onPress={()=>navigation.navigate("ProductDetails",{title:item.name,id:item._id,img:item?.image[0]})}>
        <Center p={2} alignItems='center'  h={250} flex={1} >
        <Box position={"relative"} py={1} my={1}
        bg="white" borderBottomColor={'orange.300'} >
          <Box bg='gray.10' p={2} rounded='md' w='98%'>
            <Image resizeMode='cover' 
            source={{uri:item?.image[0]}} w={150} alt={''} 
            bg='gray.300' m={1} h={150} />
            <Icon  as={<MaterialIcons name="favorite-border"/>} size={6} 
            position={"absolute"} right={10} 
            top={10}/>
        </Box>
        <Box>
          <Text color='blueGray.600' letterSpacing='sm'>{item.name}</Text>
         <Text fontSize={16} mt={2} fontWeight='bold' letterSpacing='sm'>Tzs {item.price}</Text>
        </Box>
      </Box>
      </Center>
      </Pressable>
    }
    
  }



  return (
    <Center flex={1}
    onStartShouldSetResponder={() => {
      setClicked(false);
    }}
    >
      <ExpoStatusBar />


      <FlatList bg='gray.100' w={"full"}
        renderItem={renderItem}
        data={posts?.data}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          paddingBottom:100,
          width:'100%',
          justifyContent:'center',
          alignItems:'center'
        }}
        />

    </Center>

  )
}
