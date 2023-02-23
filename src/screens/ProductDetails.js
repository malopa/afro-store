import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { Box,Pressable, Button, Center, FlatList, HStack, Icon, Image, Text } from 'native-base'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'



const data = [
    {id:1,img:require('../assets/pic3.jpeg')},
    {id:2,img:require('../assets/img5.jpeg')},
    {id:3,img:require('../assets/pic4.jpeg')},
    {id:4,img:require('../assets/pic2.jpeg')}, // Network image
    {id:5,img:require('../assets/pic1.jpeg')}
  ]


const data1 = [
    {id:1,name:"watch one",price:2000,img:require('../assets/pic1.jpeg')},
    {id:2,name:"Serenium watch",price:2000,img:require('../assets/pic2.jpeg')},
    {id:3,name:"Digital watch, walk smart",price:2000,img:require('../assets/pic3.jpeg')},
    {id:4,name:"White sneaker, attraction",price:2000,img:require('../assets/pic4.jpeg')},
    {id:5,name:"watch ahoewa",price:2000,img:require('../assets/pic5.jpeg')},
    {id:6,name:"watch ahoewa  the helena or the later",price:2000,img:require('../assets/pic1.jpeg')},
  ];

export default function ProductDetails({route,navigation}) {


    const [itemImg,setItem] = useState(route.params.img)

    const renderImage = ({item})=>{
        return <Pressable borderWidth={1} borderColor='gray.200' rounded='md' mx={2} onPress={()=>setItem(item.img)}>
           <Image bg='gray.100' 
                source={item.img} 
                alt='item' w={20}  h={20} resizeMode='cover' ml={2} /> 
        </Pressable>
    }


    const renderRelatedContent = ({item})=>{
        return <Pressable rounded='md'  w={200} ml={2} 
            onPress={()=>navigation.navigate("ProductDetails",{title:item.name,img:item.img})}>
            <Center  alignItems='center'  h={250} flex={1} bg='white'>
                <Box position={"relative"} py={1} my={1}
                bg="white" borderBottomColor={'orange.300'} rounded={'md'}>
                    <Box bg='white' p={2} rounded='md' w='100%'>
                    <Image resizeMode='cover' source={item.img} w={128} alt={''} bg='gray.300' 
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

  return (<ScrollView
    showsVerticalScrollIndicator={false}
    backgroundColor='white'
    flex={1}
  >
            <Box  p={4} h={250} flex={1} justifyContent='center' alignItems='center'>

                <Image pt={4} 
                resizeMode='cover' 
                bg='gray.100' 
                source={itemImg} 
                alt='item' w={200} />

            </Box>

            <Box bg='white' py={2} borderColor='gray.100'>
                <FlatList bg='white'
                    horizontal={true}
                    data={data}
                    renderItem={renderImage}
                    keyExtractor={item=>item.id}
                />
            </Box>

            <Box bg='#FFF' p={4}>
                <Text fontWeight='bold' fontSize={16}>{route.params.title}</Text>
                <Text color='gray.800' letterSpacing={0} fontSize={16}>The item descriptions will be here </Text>

                <Box p={2} mt={4}>
                    <Text letterSpacing={.2} fontSize={18} fontWeight='bold'>TZS 5,000</Text>
                </Box>

                <Text font='bold' color='gray.600' p={2}>Product status : refubished</Text>

                <Pressable onPress={()=>navigation.navigate("ShoperScreen",{title:'shopper name'})}>
                    <Text font='bold' color='gray.800' underline={true} p={2} py={1} >More about provider <Icon name={<FontAwesome name='angle-right' />} size={6} /> </Text>
                </Pressable>
                <HStack justifyContent='space-between' p={2}>
                    <Button bg='#FFF' p={0} rounded='full' 
                    w={150} color='black' borderColor={`black`} 
                    borderWidth={1} px={4}>
                        <Text color='black'>Send Message</Text>
                        </Button>
                    <Button bg='amber.300' color='black' w={150} rounded='full' px={8}>
                        <Text color='black'>Call Now</Text>
                        </Button>
                </HStack>

            </Box>

            <Box mt={4}>
                <Text fontWeight='bold' px={2} my={4} fontSize={18}>Related Content</Text></Box>

            <FlatList p={2} bg='amber.100'
                data={data1} 
                horizontal={true}
                renderItem={renderRelatedContent}
                keyExtractor={item=>item.id}
                showsHorizontalScrollIndicator={false}
            />
          </ScrollView>
  )
}
