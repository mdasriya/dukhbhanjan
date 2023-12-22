import { Box, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Oderse = () => {
  const [orderData, setOrderData] = useState([])

useEffect(()=> {
axios.get("http://localhost:4000/order", {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
})
.then((res)=> {
  console.log(res.data)
  setOrderData(res.data)
})
},[])


  return (
    <> 
    <Box borderLeft={"10px solid green"} borderRadius={5} margin={6}> 
    <Heading p={5}> My Order Summary </Heading>
    </Box>
    <Grid templateColumns='repeat(4, 1fr)' gap={6}  padding={5} display={"flex"} justifyContent={"center"}>
  {orderData &&  orderData.map((item, index) => {
  return <GridItem w='100%' h='auto' p={5} boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"} >
 <Image
    boxSize='200px'
    objectFit='cover'
    src={item.image}
    alt={item.title}
    width={"100%"}
  />
  <Box display={"flex"}>
    <Text as={"b"}>Name : </Text>
  <Text> {item.title}</Text>
  </Box>
  <Box display={"flex"}>
    <Text as={"b"}>Price : </Text>
  <Text> {item.price}</Text>
  </Box>
  <Box display={"flex"}>
    <Text as={"b"}>Quality : </Text>
  <Text>{item.quality}</Text>
  </Box>
  <Box display={"flex"}>
    <Text as={"b"}>Quantity : </Text>
  <Text> {item.quantity}</Text>
  </Box>
  

  </GridItem>
  })}
</Grid>
    </>
    
  )
}

export default Oderse
