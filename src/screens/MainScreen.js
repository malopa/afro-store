import 'react-native-gesture-handler';
import { Box,Image,FlatList, Center, Icon, Text, ScrollView, Pressable, HStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useSelector } from 'react-redux';
import { getCategories, getMyPost, getProductBySlug, getProducts, getPromotedPost } from '../data/api';
import { useQuery } from 'react-query';
import { ActivityIndicator, Alert, BackHandler, TouchableOpacity, View } from 'react-native';
import EmptyData from '../components/EmptyData';
import { FlatListSlider } from 'react-native-flatlist-slider';
import { StyleSheet } from 'react-native';



export default function MainScreen({navigation}) {

  
  
  const user = useSelector(state=>state.user);
  const [refreshing,setRefreshing] = useState(false)
  const [loading,setLoading] = useState(false)
  const [loading1,setLoading1] = useState(false)
  
  const [limit,setLimit] = useState(30)
  const [skip,setSkip] = useState(0)

  const {isLoading:isCatLoading,data:categories} = useQuery({queryKey:['categories'], queryFn:()=>getCategories()})
  const {isLoading:isElLoading,data:electronics} = useQuery({queryKey:['electronics'], queryFn:()=>getProductBySlug("ElectronicsScreen")})
  const {isLoading:isLoLoading,data:laptops} = useQuery({queryKey:['laptops'], queryFn:()=>getProductBySlug("LapcomputerScreen")})
  const {isLoading:isJeLoading,data:jewels} = useQuery({queryKey:['jewels'], queryFn:()=>getProductBySlug("ClothJewelScreen")})
  const {isLoading:isMoLoading,data:mobiles} = useQuery({queryKey:['mobiles'], queryFn:()=>getProductBySlug("MobilePhoneAccessories")})
  const {isLoading:isHoLoading,data:houses} = useQuery({queryKey:['house'], queryFn:()=>getProductBySlug("HouseEstateScreen")})
  const {isLoading,data:promoted} = useQuery({queryKey:['images'], queryFn:()=>getPromotedPost("Gold")})
  const {isLoading:isPostLoading,data:posts} = useQuery({queryKey:['products'], queryFn:()=>getProducts(limit,skip),
    refetchInterval: 50000,
  })




  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };  

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const retrieveMore = ()=>{
    setLoading(true)
    setSkip(s=>+s + limit)

    setRefreshing(!refreshing)

    getProducts(limit,skip)
    .then(res=>{
      if(res.data.length == 0){
        setSkip(0)
      }

      setPost(res)
      setLoading(false)

    })
  }

  const renderCategoriesItem = ({item})=>{
    return <Center>
      <Pressable  maxHeight={70}
    onPress={()=>navigation.navigate("ElectronicsScreen",{slug:item.slug})}
    bg='white' 
    rounded='sm' p={2} 
    mx={4} borderWidth={1} 
    borderColor='gray.400'>
      <Text>{item.name}</Text>
    </Pressable>
    </Center>
    ;
  }

  const renderItem = ({item})=>{
    return <Pressable m={1} shadow={1} w={'31%'} 
   bg='white' rounded={'md'} p={1}

    onPress={()=>navigation.navigate("ProductDetails",{title:item.name,id:item._id,img:item?.image[0]})}>
      <Box alignItems='center'  flex={1} >
      <Box position={"relative"} py={1}
      bg="white" borderBottomColor={'orange.300'} >
        <Box bg='gray.10' rounded='md' w='100%'>
          <Image resizeMode='cover'
          rounded={'md'} 
          source={{uri:item?.image[0]}} 
          w={140} alt={''} 
          bg='gray.300' h={150} />
          <Icon  as={<MaterialIcons name="favorite-border"/>} size={6} 
          position={"absolute"} right={10} 
          top={10}/>
      </Box>
      <Box>
        <Center>
        <Text color='blueGray.600' letterSpacing='sm'>{item.name}</Text>
       <Text fontSize={14} fontWeight='bold'  letterSpacing='sm'>Tzs {parseFloat(item.price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
       </Center>
      </Box>
    </Box>
    </Box>
    </Pressable>
  }




  const renderSlugGridData = ({item})=>{
    return (<Pressable   
      borderWidth={1}
      key={item._id}
      borderColor={'gray.200'}
      bg='white'
      shadow={.5}
      rounded={'xl'} 
      m={1}
      w={'48%'}
      onPress={()=>navigation.navigate("ProductDetails",{title:item.name,id:item._id,img:item?.image[0]})}>
      <Center p={2} alignItems='center' flex={1} >
      <Box position={"relative"} 
      bg="white" borderBottomColor={'orange.300'} >
        <Box bg='gray.10' rounded='md' w='100%'>
          <Image resizeMode='cover' rounded={'md'} 
          source={{uri:item?.image[0]}} w={150} alt={''} 
            h={150} />
          <Icon  as={<MaterialIcons 
          name="favorite-border"/>} size={6} 
          position={"absolute"} right={10} 
          top={10}/>
      </Box>
      <Box>
        <Center>
          <Text color='blueGray.600' overflowX={'hidden'} letterSpacing='sm'>{item.name}</Text>
          <Text fontSize={16} fontWeight='bold' letterSpacing='sm'>Tzs {item.price}</Text>
       </Center>
      </Box>
    </Box>
    </Center>
    </Pressable>)
  }


  const renderSlugData = ({item})=>{
    return (<Pressable   
      borderWidth={1}
      key={item._id}
      borderColor={'gray.200'}
      bg='white'
      shadow={1}
      rounded={'xl'} 
      m={1}
      w={150}
      onPress={()=>navigation.navigate("ProductDetails",{title:item.name,id:item._id,img:item?.image[0]})}>
      <Center p={2} alignItems='center'
       flex={1} >
      <Box position={"relative"} 
      bg="white" borderBottomColor={'orange.300'} >
        <Box bg='gray.10' rounded='md' w='100%'>
          <Image resizeMode='cover' rounded={'md'} 
          source={{uri:item?.image[0]}} w={150} alt={''} 
            h={150} />
          <Icon  as={<MaterialIcons 
          name="favorite-border"/>} size={6} 
          position={"absolute"} right={10} 
          top={10}/>
      </Box>
      <Box>
        <Center>
          <Text color='blueGray.600' overflowX={'hidden'} letterSpacing='sm'>{item.name}</Text>
          <Text fontSize={16} fontWeight='bold' letterSpacing='sm'>Tzs {item.price}</Text>
       </Center>
      </Box>
    </Box>
    </Center>
    </Pressable>)
  }


  const HeaderTop = ()=>{
        return  <Box py={4}
         >
          <FlatList 
          data={categories?.data}
          renderItem={renderCategoriesItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item=>item.id}
          />


{/* {promoted?.data.length > 0?
      <FlatListSlider
        data={promoted?.data}
        height={120}
        timer={8000}
        imageKey={'img'}
        component={<Preview />}
        onPress={item => navigation.navigate("ProductDetails",{title:item.name,id:item._id,img:item.img})}
        contentContainerStyle={{paddingHorizontal: 8}}
        animation
        indicator={false}
      />:""} */}

    </Box> 
  }

  


  const renderFooter = () => {
    try {
      if (isPostLoading) {
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


  const Preview1 = ({
    style,
    item,
    imageKey,
    onPress,
    index,
    active,
    local,
  }) => {
    return (
      <TouchableOpacity key={index}
        style={[styles.videoContainer]}
        onPress={() => onPress(item)}>
          <Image alt=""
            source={{uri: item[imageKey]}}
          />
        <Text style={styles.desc}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const Preview = ({
    style,
    item,
    imageKey,
    onPress,
    index,
    active,
    local,
  }) => {
    return (
      <TouchableOpacity key={index}
        style={[styles.videoContainer]}
        onPress={() => onPress(item)}>
        <View style={[styles.imageContainer, styles.shadow]}>
          <Image alt=""
            style={[styles.videoPreview, active ? {} : {height: 140}]}
            source={{uri: item[imageKey]}}
          />
        </View>
        <Text style={styles.desc}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView paddingBottom={400}
    showsVerticalScrollIndicator={false}
    >
      {/* <Box h={250}> */}

      
      

      {promoted?.data.length > 0?
      <FlatListSlider
        data={promoted?.data}
        height={240}
        timer={5000}
        imageKey={'img'}
        onPress={item => alert(JSON.stringify(item))}
        contentContainerStyle={{paddingHorizontal: 2}}
        indicatorContainerStyle={{position:'absolute', bottom: 10}}
        indicatorActiveColor={'#8e44ad'}
        indicatorInActiveColor={'#ffffff'}
        indicatorActiveWidth={30}
        animation
      />:""}

      {isPostLoading?<ActivityIndicator />:  
      <FlatList bg='red.100' py={2} w={"100%" }
      contentContainerStyle={{backgroundColor:'white'}}
        ListHeaderComponent={HeaderTop}
        renderItem={renderItem}
        data={posts?.data.slice(0,6)}
        keyExtractor={item => item._id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          paddingBottom:100
        }}

        // onEndReachedThreshold={0.7}
        // Refreshing (Set To True When End Reached)
        ListFooterComponent={renderFooter}
        // refreshing={refreshing}
        // onEndReached={retrieveMore}
        ListEmptyComponent={<EmptyData />}
      /> 
    }



  <Box m={2} border={1} my={2}>
    <Box _text={{fontSize:18,p:2}} >Electronics</Box>
    <Center>

    <FlatList 
    bg='white'
    p={2}
    w={'100%'}
    data={electronics?.data.slice(0,4)}
    renderItem={renderSlugGridData}
    keyExtractor={item=>item._id}
    numColumns={2}
    showsHorizontalScrollIndicator={false}
    />

    </Center>
  </Box>


  <Box  m={2} border={1} my={2}>
    <Box fontSize={18} _text={{color:'#000',p:2,fontSize:20}}>Laptop & Computer</Box>

    <FlatList 
    bg='white'
    data={laptops?.data}
    renderItem={renderSlugData}
    keyExtractor={item=>item._id}
    horizontal
    showsHorizontalScrollIndicator={false}
    />
              {/* <HStack bg='red.500'>
      {laptops?.data.map(item=><Pressable   
        borderWidth={1}
        key={item._id}
        borderColor={'gray.200'}
        bg='white'
        shadow={2}
        rounded={'xl'} 
        m={1}
        w={150}
        onPress={()=>navigation.navigate("ProductDetails",{title:item.name,id:item._id,img:item?.image[0]})}>
        <Center p={2} alignItems='center'  h={250} flex={1} >
        <Box position={"relative"} 
        bg="white" borderBottomColor={'orange.300'} >
          <Box bg='gray.10' rounded='md' w='100%'>
            <Image resizeMode='cover' rounded={'md'} 
            source={{uri:item?.image[0]}} w={150} alt={''} 
              h={150} />
            <Icon  as={<MaterialIcons 
            name="favorite-border"/>} size={6} 
            position={"absolute"} right={10} 
            top={10}/>
        </Box>
        <Box>
          <Center>
            <Text color='blueGray.600' overflowX={'hidden'} letterSpacing='sm'>{item.name}</Text>
            <Text fontSize={16} fontWeight='bold' letterSpacing='sm'>Tzs {item.price}</Text>
         </Center>
        </Box>
      </Box>
      </Center>
      </Pressable>)}
      </HStack> */}

    
  </Box>


  <Box bg='gray.50' m={1} border={1} my={2}>
    <Box _text={{fontSize:18,p:2}}>Clothes & Jewels</Box>

    <Box bg='red.100'>
    <FlatList 
        bg='red.100'
        p={2}
        w={'100%'}
        data={jewels?.data.slice(0,6)}
        renderItem={renderItem}
        keyExtractor={item=>item._id}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  </Box>


{(houses?.data.length > 0)?  <Box bg='gray.50' m={2} border={1} my={2}>
    <Box _text={{fontSize:18,fontWeight:'bold',py:2}}>House & Real Estate</Box>
    <Box>
      <FlatList 
        bg='green.50'
        data={houses?.data}
        renderItem={renderSlugData}
        keyExtractor={item=>item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        />
    </Box>
  </Box>
  :""}

  <Box bg='gray.50' mb={1} border={1} >
    <Box _text={{fontSize:18,fontWeight:'bold',p:2}}>Mobile Phone & Access</Box>

    <FlatList 
        bg='blue.50'
        p={2}
        w={'100%'}
        data={mobiles?.data.slice(0,4)}
        renderItem={renderSlugGridData}
        keyExtractor={item=>item._id}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
      />
  </Box>


  <Box p={5} bg='white' m={2} mb={10} border={1} my={2}>
    {/* <Box>Mobile Phone & Access</Box> */}
  </Box>


    </ScrollView>
  )
}


const styles = StyleSheet.create({
  videoContainer: {
    width: 140,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  videoPreview: {
    width: 140,
    height: 120,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  desc: {
    fontSize: 14,
    letterSpacing: 0,
    // lineHeight: 24,
    backgroundColor:"#FFF",
    paddingVertical:4,
    width:'100%',
    paddingHorizontal:4,
    borderBottomLeftRadius:4,
    borderBottomRightRadius:4
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
