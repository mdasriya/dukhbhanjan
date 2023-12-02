import { Box, Image, Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
  Flex, } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
const GemstonesCart = ({ key,_id,benefits,description,image,price,quantity,title}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedQuality, setSelectedQuality] = useState('');
  const toast = useToast()
  const qualityOptions = ['quality 1', 'quality 2', 'quality 3'];

  const handleQualityChange = (e) => {
    setSelectedQuality(e.target.value);
  };

const handleCartData = async() => {
  let finalData = {quality:selectedQuality,image,price,quantity,title}
  
  try {
    // Make the HTTP request and wait for the response
    const response = await axios.post("http://localhost:4000/cart/create", finalData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    // Log the response data
// Show a success toast
if(response.data.state){
toast({
title: "product added in cart successfully",
status: "success",
duration: 3000,
isClosable: true,
position:"top-right"
})

}else{
toast({
title: response.data.msg,
status: "error",
duration: 3000,
isClosable: true,
});

}

} catch (error) {
  // Log and show an error toast
  console.error("Error submitting form:", error.response.data.error);
  toast({
    title: error.response.data.error,
    status: "error",
    duration: 5000,
    isClosable: true,
  });
}



}


  return (
    <Box >
      <Box onClick={onOpen} border={"1px solid #ececec"} padding={"10px"} width={"250px"} margin={"auto"} textAlign={"center"} cursor={'pointer'} borderRadius={"3px"} _hover={{border:"none", boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius:"3px"}}>
  <Image src={image} alt='Dan Abramov' width={"100%"} height={"200px"}/>
  <Box textAlign={"left"}>
  <Text>Name: {title}</Text>
  <Text>Price:{" "}₹{price}</Text>
  <Text>des:{" "}{description}</Text>
  </Box>
</Box>

<Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image height={"70%"} src={image} alt={title} />
          <Box mt={4}>
            <Text>{}</Text>
            <Flex>
            <FormLabel>description</FormLabel>
            <Text>{description}</Text>
            </Flex>
            <Flex>
            <FormLabel>Benefits</FormLabel>
            <Text>{benefits[0][0]}</Text>
            </Flex>
           <Flex>
            <FormLabel>Price:</FormLabel>
            <Text>{price}</Text>
           </Flex>
          </Box>
          <FormControl mt={4}>
            <FormLabel>Quality</FormLabel>
            <Select
              placeholder="Select quality"
              value={selectedQuality}
              onChange={handleQualityChange}
            >
              {qualityOptions.map((quality) => (
                <option key={quality} value={quality}>
                  {quality}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="yellow" mr={3} onClick={handleCartData}>
            ADD TO CART
          </Button>
         
        </ModalFooter>
      </ModalContent>
    </Modal>
 
    </Box>
  )
}

export default GemstonesCart
