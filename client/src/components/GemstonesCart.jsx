import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const GemstonesCart = ({ key,_id,benefits,description,image,price,quantity,title}) => {
  return (
    <Box key={key}>
      <Link to={`/gemstones/${_id}`}>
      <Box border={"1px solid #ececec"} padding={"10px"} width={"250px"} margin={"auto"} textAlign={"center"} cursor={'pointer'} borderRadius={"3px"} _hover={{border:"none", boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius:"3px"}}>
  <Image src={image} alt='Dan Abramov' width={"100%"} height={"200px"}/>
  <Box textAlign={"left"}>
  <Text>Name: {title}</Text>
  <Text>Price:{" "}₹{price}</Text>
  <Text>des:{" "}{description}</Text>
  </Box>
</Box>
    </Link>
    </Box>
  )
}

export default GemstonesCart
