import 'react-native-gesture-handler';
import { Box,Image,FlatList, Center, Icon, Text, ScrollView, Pressable, HStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ImageSlider } from "react-native-image-slider-banner";
import { categories } from '../data/data';
import { useSelector } from 'react-redux';
import { getMyPost, getProducts } from '../data/api';
import { useQuery } from 'react-query';
import { ActivityIndicator } from 'react-native';


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

  
  // const {isLoading,data:posts} = useQuery({queryKey:['products'], queryFn:()=>getProducts()})


  const user = useSelector(state=>state.user);
  const [refreshing,setRefreshing] = useState(false)
  const [loading,setLoading] = useState(false)
  const [loading1,setLoading1] = useState(false)
  const [posts,setPost] = useState([])
  const [limit,setLimit] = useState(20)
  const [skip,setSkip] = useState(0)


  useEffect(()=>{
    setLoading1(true)
    getProducts(limit,skip)
    .then(res=>{
      setPost(res)
      if(res.data.length == 0){
        setSkip(0)
        retrieveMore()
      }
      setLoading1(false)

    })
  },[])

  const retrieveMore = ()=>{
    setLoading(true)
    setSkip(s=>+s + limit)

    setRefreshing(!refreshing)

    getProducts(limit,skip)
    .then(res=>{
      if(res.data.length == 0){
        // alert(res.data.length)
        setSkip(0)
        // retrieveMore()
      }

      setPost(res)
      setLoading(false)

    })
  }

  const renderCategoriesItem = ({item})=>{
    return <Box m={2} bg='white' rounded='sm' w={150} p={2} mx={4} borderWidth={1} 
    borderColor='gray.400'>
      <Text>{item.name}</Text>
    </Box>;
  }

  const renderItem = ({item})=>{
    return <Pressable w={'49%'} m={1} bg='white' rounded={'md'}
    onPress={()=>navigation.navigate("ProductDetails",{title:item.name,id:item._id,img:item?.image[0]})}>
      <Center p={2} alignItems='center'  h={250} flex={1} >
      <Box position={"relative"} py={1} my={1}
      bg="white" borderBottomColor={'orange.300'} >
        <Box bg='gray.10' p={2} rounded='md' w='98%'>
          <Image resizeMode='cover' 
          source={{uri:item?.image[0]}} w={136} alt={''} 
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


  const renderFooter = () => {
    try {
      // Check If Loading
      if (loading) {
        return (<Box>
          <ActivityIndicator />
        </Box>
        )
      }
      else {
        return null;
      }
    }
    catch (error) {
      console.log(error);
    }
  };

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


            
      {loading1?<ActivityIndicator />:  
      <FlatList bg='gray.100' w={"full"}
        ListHeaderComponent={HeaderTop}
        renderItem={renderItem}
        data={posts?.data}
        keyExtractor={item => item._id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          paddingBottom:100
        }}

        onEndReachedThreshold={0}
        // Refreshing (Set To True When End Reached)
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onEndReached={retrieveMore}
      /> 
    }
    </Box>
  )
}
