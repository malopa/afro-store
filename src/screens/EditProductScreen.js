import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Button, FlatList, Icon, Image, Input, Pressable, Radio, ScrollView, Text, VStack } from 'native-base';
import React, { useRef, useState } from 'react'
import { Alert } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { getProductDetails } from '../data/api';

export default function EditProductScreen({route,navigations}) {
    const user = useSelector(state=>state.user);
    const refRBSheet = useRef();
    const [value, setValue] = React.useState('one');
    
    let params = route.params 
    const {data:details} = useQuery({queryKey:['products-detals'], queryFn:()=>getProductDetails(params.id)})

    const [product,setProduct]  = useState(details?.data.name)
    const [price,setPrice]  = useState(details?.data.price)
    const [cquantity,setQuantity]  = useState(details?.data.quantity)

    const showAlert = () =>
  Alert.alert(
    'Confirmation',
    'Are you sure you want to delete?',
    [
      {
        text: 'OK',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'Image deleted successfully.',
        ),
    },
  );


  const BottomDialog = ()=>{
    return (
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <Box>Test items</Box>

      </RBSheet>
    )
  }

    const renderItem = ({item})=>{
        return (<Box 
        bg='white' p={2}
        rounded='md'
        position='relative' key={item} m={2}>
            <Pressable 
            position='absolute'
            top={-9}
            zIndex={10}
            left={1}
            onPress={showAlert}>
                <Box rounded='full' 
                borderWidth={1}
                borderColor='red.500'
                backgroundColor='white'
                width={10}
                height={10}
                justifyContent="center"
                alignItems='center'
                
                _text={{fontSize:18,fontWeight:'bold'}}
                >
                    X
                </Box>
            </Pressable>
            <Image source={{uri:item}}  height={300} width={250} alt=''/>
        </Box>)
    }

  return (
    <ScrollView 
    pb={8}
    showsVerticalScrollIndicator={false}
    flex={1}>




    <VStack bg='white' m={2} rounded='md' p={2}>
        <Box m={2}>
            <Text mb={2} fontSize={16}>Product Name</Text>
            <Input
            py={3} 
                _focus={{backgroundColor:'white'}}
                placeholder='product name'
                fontSize={16}
                bg='white'
                value={product}
            />
        </Box>

        <Box m={2}>
            <Text fontSize={16} mb={2}>Price</Text>
            <Input
                py={3} 
                _focus={{backgroundColor:'white'}}
                placeholder='product name'
                fontSize={16}
                bg='white'
                value={price}
            />
        </Box>
        </VStack>
        <FlatList 
        contentContainerStyle={{p:2}}
        horizontal
        data={details?.data?.image}
        renderItem = {renderItem}
        showsHorizontalScrollIndicator={false}
        />

        <Box rounded='md' m={2} bg='white' p={4}>
            <Button 
            p={3}
            rounded='full'
            backgroundColor='gold'
            _text={{fontWeight:'bold',
            color:'blue.400'}}
            >
                Edit
            </Button>

            <Button 
            mt={4}
            p={3}
            rounded='full'
            backgroundColor='green.400'
            _text={{fontWeight:'bold',color:'blue.400'}}
            onPress={() => refRBSheet.current.open()}
            >
                Promote
            </Button>

        </Box>


        <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
   
   <Box p={4}>
  

   <Radio.Group defaultValue="1" size="lg" name="exampleGroup" accessibilityLabel="pick a choice">
      <Radio _text={{
      mx: 2
    }} colorScheme="green" value="1" 
    icon={<Icon as={<MaterialCommunityIcons name="alien" />} />} 
    size="lg"
    my={1}>
        10,000 - Premium 
      </Radio>
      <Radio 
      mt={4}
      _text={{
      mx: 2
    }} colorScheme="red" value="2" 
    size="lg"
    icon={<Icon as={<MaterialCommunityIcons name="fire" />} />} my={1}>
        20,000 - Premium Promotion
      </Radio>
     
    </Radio.Group>

    <Button bg='gold' rounded='full' mt={4} _text={{color:'black.600',fontSize:16, fontWeight:'bold'}}>Promote</Button>


    </Box>
    
      </RBSheet>


    </ScrollView>
  )
}
