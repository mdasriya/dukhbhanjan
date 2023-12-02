
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
  Image,
  Text,
  Select,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons';


import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartProduct } from '../redux/cartReducer/action';

const Cart = () => {
const dispatch = useDispatch()
const [cart, setCartData] = useState("")
const cartData = useSelector((store) => store.cartReducer.carts);

useEffect(()=>{
  dispatch(getCartProduct())
},[])
console.log("cart",cart)
  return (
    
    
      <>
        <Heading border={"1px solid red"} mt={5} fontSize="2xl" fontWeight="extrabold">
          Shopping Cart (3 items)
        </Heading>
     <Box width={"100%"} padding={"20px"} justifyContent={"space-between"} display={"flex"} border={"1px solid blue"} height={"600px"}>

{/* left box */}
<Box width={"60%"}  border={"1px solid green"} height={"100%"}>
 
 {cartData.map((item)=> {
  return  <Box  border={"1px solid red"} flexWrap={"wrap"} mt={10} justifyContent={"space-between"} display={"flex"} height={"30%"}>
  {/* image start */}
  <Box width={"25%"} border={"1px solid black"} height={"100%"}>
  <Image
    width={"100%"}
    height={"100%"}
    objectFit='cover'
    src={item.image}
    alt='Dan Abramov'
  />
  </Box>
  {/* image start end*/}

  {/* title box */}
  <Box width={"20%"} border={"1px solid black"} height={"100%"}>
    <Text fontSize={"23px"} color={"gray.600"}>{item.title}</Text>
  </Box>
   {/* title box */}

{/* select quantity box */}
  <Box width={"10%"} position="relative" border={"1px solid black"} height={"100%"}>
  <Select position={"absolute"} top={"40%"}>
  <option value='1'>1</option>
  <option value='2'>2</option>
  <option value='3'>3</option>
  <option value='4'>4</option>
  <option value='5'>5</option>
</Select>
  </Box>
  {/* select quantity box */}

  {/* price box start */}
  <Box width={"10%"} position={"relative"} border={"1px solid black"} height={"100%"}>
    <Text fontSize={"20px"} position={"absolute"} top={"40%"} color={"gray.600"}>₹ {item.price}</Text>
  </Box>
   {/* price box end */}


  {/* delete icon start */}
  <Box width={"10%"} position={"relative"} border={"1px solid black"} height={"100%"}>
  <CloseIcon boxSize={4} position={"absolute"} top={"40%"} color={"GrayText"}/>
  </Box>
  {/* delete icon end */}
 </Box>
 })}
 {/* map box start */}

 {/* map box start end*/}

</Box>
{/* left box */}
{/* right box */}
<Box width={"30%"} border={"1px solid green"} height={"100%"}></Box>
     </Box>
          </>
       
 

 
  )
}

export default Cart
