  import { MaterialIcons } from '@expo/vector-icons'
  import { Box, Center, FlatList, Icon, Image, Pressable, Text } from 'native-base'
  import React from 'react'
import { data } from '../data/data'


  


  export default function ElectronicsScreen({navigation}) {

      const renderItem = ({item})=>{
          return <Pressable w={'50%'} m={1} bg='white' rounded='md'
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
      <Center>

  <FlatList w={"full"}
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
