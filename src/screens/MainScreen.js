import 'react-native-gesture-handler';
import { Box,Image,FlatList, Center, Icon, Text, ScrollView, Pressable, HStack } from 'native-base'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ImageSlider } from "react-native-image-slider-banner";
import { categories } from '../data/data';
import { useSelector } from 'react-redux';


const data = [
  {id:1,name:"watch one then we will limit later",price:2000,img:require('../assets/pic1.jpeg')},
  {id:2,name:"Serenium watch let put all content in full",price:2000,img:require('../assets/pic2.jpeg')},
  {id:3,name:"Digital watch, walk smart",price:2000,img:require('../assets/pic3.jpeg')},
  {id:4,name:"White sneaker, attraction",price:2000,img:require('../assets/pic4.jpeg')},
  {id:5,name:"watch ahoewa",price:2000,img:require('../assets/pic5.jpeg')},
  {id:6,name:"Cap cat then one to buy" ,price:2000,img:require('../assets/pic1.jpeg')},
  {id:7,name:"watch ahoewa one sneaker equalizer",price:2000,img:require('../assets/pic1.jpeg')},
  {id:8,name:"watch ahoewa  the helena or the later",price:2000,img:require('../assets/pic1.jpeg')},
];
export default function MainScreen({navigation}) {

  const [images,setImages] = useState(
    [
      "https://source.unsplash.com/1024x768/?nature",
      "https://source.unsplash.com/1024x768/?water",
      "https://source.unsplash.com/1024x768/?girl",
      "https://source.unsplash.com/1024x768/?tree", // Network image
      require('../assets/pic1.jpeg')
      
    ]
  )


  const user = useSelector(state=>state.user);


  // const categories = [
  //   {id:1,name:"Electrinics"},
  //   {id:2,name:"Clothes & jewels"},
  //   {id:3,name:"Cars"},
  //   {id:4,name:"Real Estate"},
  //   {id:4,name:"Real Estate"},
  //   {id:4,name:"Real Estate"},
  // ]


  const renderCategoriesItem = ({item})=>{
    return <Box m={2} bg='white' rounded='sm' w={150} p={2} mx={4} borderWidth={1} 
    borderColor='gray.400'>
      <Text>{item.name}</Text>
    </Box>;
  }

  const renderItem = ({item})=>{
    return <Pressable w={'49%'} m={1} bg='white' rounded={'md'}
    onPress={()=>navigation.navigate("ProductDetails",{title:item.name,img:item.img})}>
      <Center p={2} alignItems='center'  h={250} flex={1} >
      <Box position={"relative"} py={1} my={1}
      bg="white" borderBottomColor={'orange.300'} >
        <Box bg='gray.10' p={2} rounded='md' w='98%'>
          <Image resizeMode='cover' source={item.img} w={136} alt={''} 
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

  const HeaderTop = ()=>{
        return  <Box py={2}
         h={100}>
          <FlatList 
          data={categories}
          renderItem={renderCategoriesItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item=>item.id}
          />
    </Box> 
  }

  return (
    <Box p={2}>
      <Box h={200}>
        <ImageSlider 
            data={[
                {img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU'},
                {img: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg'},
                {img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg'}
            ]}
            autoPlay={true}
            onItemChanged={(item) => console.log("")}
            closeIconColor="#fff"
            caroselImageStyle={{ resizeMode: 'cover' }}
        /> 
      </Box>

            

      <FlatList bg='gray.100' w={"full"}
      ListHeaderComponent={HeaderTop}
      renderItem={renderItem}
      data={data}
      keyExtractor={item => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      _contentContainerStyle={{
        paddingBottom:100
      }}
      /> 
{/* </ScrollView>       */}
    </Box>
  )
}
