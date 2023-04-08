import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import { Box, FlatList, ScrollView, StatusBar } from 'native-base'
import React from 'react'

export default function ServiceScreen() {

    let data = [
        {id:1,name:"Tax & Accountant"},
        {id:2,name:"Layer"},
        {id:3,name:"Archtects"},
        {id:4,name:"ICT"},
        {id:5,name:"Electirc Technicians"},
        {id:6,name:"Car Hiring"},
        {id:8,name:"Gerage Motor Technicians"},
        {id:9,name:"Hospitals"},
        {id:10,name:"Pharmacy"},
        {id:11,name:"Security Services"},
        {id:12,name:"Food & Catering"},
        {id:14,name:"Doctor Services"},
    ]


    const renderItem = ({item})=>{
        return <Box p={4} borderWidth={1}  borderColor='gray.300' rounded='md' _text={{fontWeight:'bold', fontSize:16}} bg='white' my={1}>{item.name}</Box>
    }
  return (
    <Box p={2}>
        <ExpoStatusBar />


        <FlatList
            _contentContainerStyle={{paddingBottom:16}}
            data={data}
            renderItem={renderItem}
            keyExtractor={item=>item.id}
            showsVerticalScrollIndicator={false}
        />

    </Box>

  )
}
