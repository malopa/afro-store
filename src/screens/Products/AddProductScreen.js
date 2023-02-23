// import { ImagePicker } from 'expo-image-multiple-picker';
// import { ImageBrowser } from 'expo-image-picker-multiple';
import { Box, Button,CheckIcon, FlatList, Icon, Image, Input, Pressable, ScrollView, Select, Text, TextArea } from 'native-base'
import React, { useMemo, useState } from 'react'
import { StyleSheet } from 'react-native';
import { categories, data } from '../../data/data';
import * as ImagePicker from 'expo-image-picker';
import { useMutation, useQuery } from 'react-query';
import { addProduct, getCategories } from '../../data/api';
import mime from "mime";

let imagesArray = [];





export default function AddProductScreen() {

  const mutation = useMutation(addProduct,{
    onSuccess:(data)=>{
      alert(JSON.stringify(data))
    }
  })
    const [service,setService] = useState("");
    const [condition,setCondition] = useState("");
    const [product,setProduct] = useState("");
    const [category,setCategory] = useState("");
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [description,setDescription] = useState("");
    const [images,setImages] = useState([]);
    const [image, setImage] = useState(null);
    const [_images, set_Image] = useState([]);



    const {isLoading,data:categories} = useQuery("categories",getCategories);

  //let _images = [];
  const formData = new FormData();
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        allowsMultipleSelection:true,
        aspect: [4, 3],
        quality: 1,
      });
  


      let img = result.assets.map(r=>{
        // console.log(r)

        let localUri = r.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = mime.getType(localUri);//match ? `image/${match[1]}` : `image`;

        console.log("typeee",(filename))
        // Upload the image using the fetch and FormData APIs
        // console.log('photo', { uri: localUri, originalname: filename, type });


        let im = { uri: localUri,name:filename, type };
        
        // console.log(im)
        // formData.append("img",im);

        // var file = dataURLtoFile(localUri, filename);
        // console.log("===files==",file);

        formData.append("img[]",im)
        set_Image(p=>[...p,im]);
        
        return r.uri
      
      })



      setImages(img)
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

//     function dataURLtoFile(dataurl, filename) {
//       var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
//       bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
//       while(n--){
//           u8arr[n] = bstr.charCodeAt(n);
//       }
//     return new File([u8arr], filename, {type:mime});
// }

    const handleSave = ()=>{
      let data = {name:product,category,price,condition,quantity,img:_images}

      _images.forEach(i=>{
        console.log("===imae--",i)
        formData.append("img",i)
      });
      formData.append("name",product);
      formData.append("price",price);
      formData.append("condition",condition);
      formData.append("quantity",quantity);
      formData.append("category",category);
      formData.append("description",description);

      
      mutation.mutate(formData);
    }



  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <Box flex={1} w='full' bg='white'>
        <Box  p={4} bg='white'>

            <Box p={2}>
                <Input 
                _focus={{bg:"white"}}
                bg='white'
                fontSize={14}
                placeholder="Enter product name"
                value={product}
                onChangeText={text=>setProduct(text)}
                />

            </Box>

            <Box>
              {/* {""+JSON.stringify(_images)} */}
            </Box>

            <Box p={2}>
                <Input 
                _focus={{bg:"white"}}
                bg='white'
                fontSize={18}
                placeholder="Enter product price"
                value={price}
                onChangeText={text=>setPrice(text)}
                />

            </Box>


            <Box p={2}>
                <Input 
                _focus={{bg:"white"}}
                bg='white'
                fontSize={18}
                placeholder="Enter product quantity"
                value={quantity}
                onChangeText={text=>setQuantity(text)}
                />

            </Box>


            {/* <Box>{"images "+JSON.stringify(images)}</Box> */}
            <Box p={2}>
            <Select 
                size={18}
                _focus={{bg:'white'}}
                bg='white' 
                selectedValue={condition} minWidth="200" accessibilityLabel="Choose product category" placeholder="Choose Category" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                        }} mt={1} 
                    onValueChange={itemValue => setCondition(itemValue)}>
                    <Select.Item label="New " value="new" />
                    <Select.Item label="Refurbed" value="refurb" />
                    <Select.Item label="Used" value="used" />
                </Select>
            </Box>


            <Box p={2}>
                <Select 
                fontSize={18}
                _focus={{bg:'white'}}
                bg='white' 
                selectedValue={category} minWidth="200" 
                accessibilityLabel="Choose Status" 
                placeholder="Choose Status" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
        }} mt={1} onValueChange={itemValue => setCategory(itemValue)}>
                    {categories?.data?.map(d=><Select.Item   key={d._id} label={`${d.name}`} value={`${d._id}`} />
                        
                    )}
                </Select>
            </Box>


            <Box p={2}>
                <TextArea
                fontSize={18}
                bg='white' 
                placeholder="Product desctiprion"
                _focus={{bg:'white'}}
                value={description}
                onChangeText={text=>setDescription(text)}
                />
            </Box>


           

            <Pressable h={20} 
                  justifyContent='center'
                  alignItems='center'
                  borderWidth={1} borderStyle={'dashed'} 
                  borderColor='blueGray.300'
                  m={2}
                  onPress={pickImage}
                  >    
           
                    <Text color='gray.400'>Pick Image</Text>

                    {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
{/*                     
    </View> */}
                    
            </Pressable>


            {/* {image && <Image  alt='my images' source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}


            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={images}
              renderItem={({ item }) => (
                <Image
                alt='user'
                  source={{ uri: item }}
                  style={{
                    height: 150,
                    width: 200,
                    borderRadius: 10,
                    marginHorizontal: 10,
                    resizeMode: "contain",
                  }}
                />
              )}
            />


            <Button bg='black'  
            onPress={handleSave}
            _text={{font:12}} m={2}>
                <Text fontSize={16} color='white'>{mutation.isLoading?"uploading":"Save"}</Text>
            </Button>
        </Box>
    </Box>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  bgColor:{
    backgroundColor:'red',
  },
  container: {
    paddingTop: 25,
    position: 'relative'
  },
  emptyStay:{
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF'
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff'
  }
});