import {
  Box,
  Image,
  Text,
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
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';

const GemstonesCart = ({
  _id,
  benefits,
  description,
  image,
  price,
  title,
  qualities
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedQualityPrice, setSelectedQualityPrice] = useState('');
  const toast = useToast();
  const [selectedQuality, setSelectedQuality] = useState("")
  const [radioItem, setRadioItem] = useState(0)



  const handleQualityChange = (e) => {
    const { value } = e.target
    setSelectedQuality(e.target.value);
    setSelectedQualityPrice(+value)
  };

  let matchdatafound = qualities.find((el) => el.type == selectedQuality)

  const handleCartData = async () => {
    let finalData = {
      _id,
      quality: selectedQuality,
      image,
      price: radioItem,
      title,
    };
    // console.log(finalData)
    try {
      const response = await axios.post(
        'http://localhost:4000/cart/create',
        finalData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.state) {
        toast({
          title: "product is added in cart ",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        toast({
          title: "product is Already in your cart",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: error.response.data.msg,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSort = (e) => {
    const { value } = e.target
    setRadioItem(+value)
  }
console.log(typeof radioItem)
  return (
    <Box>
      <Box
        onClick={onOpen}
        border="1px solid #ececec"
        padding="10px"
        width={['100%', '250px']}
        margin="auto"
        textAlign="center"
        cursor="pointer"
        borderRadius="3px"
        _hover={{
          border: 'none',
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          borderRadius: '3px',
        }}
      >
        <Image src={image} alt={title} width="100%" height={['150px', '200px']} />
        <Box textAlign="left">
          <Text>Name: {title}</Text>
          <Text>Price: ₹{price}</Text>
          <Text>Des: {description}</Text>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image height={['50%', '70%']} src={image} alt={title} />
            <Box mt={4}>
              {/* <Text>{}</Text> */}
              <Flex>
                <FormLabel>Description</FormLabel>
                <Text>{description}</Text>
              </Flex>
              <Flex>
                <FormLabel>Benefits</FormLabel>
                {/* <Text>{benefits[0][0]}</Text> */}
              </Flex>
              {/* <Flex>
                <FormLabel>Price:</FormLabel>
                <Text>{price + selectedQualityPrice}</Text>
              </Flex> */}
            </Box>
            <Box display={"flex"}>
              <FormControl mt={4} width={"40%"}>
                <FormLabel>Quality</FormLabel>
                <Select placeholder='Select quality' width={"70%"} onChange={(e) => setSelectedQuality(e.target.value)}>
                  {
                    qualities && qualities.map((item) => (
                      <>
                        <option value={item.type}>{item.type}</option>

                      </>
                    ))

                  }
                </Select>
<br />
                {/* radio input start here  */}
                <FormLabel>Quality Per Ratti Price</FormLabel>
                {
                  matchdatafound && matchdatafound.prices.map((item) => {
                    return (<Box onChange={handleSort}>
                      <input type="radio" name='order' value={item} />
                      <label>{item}</label><br />
                    </Box>)
                  })

                }
                {/* radio input end here  */}


              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={handleCartData}>
              ADD TO CART
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GemstonesCart;
