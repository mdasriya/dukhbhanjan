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
import { Link } from 'react-router-dom';

const GemstonesCart = ({
  _id,
  benefits,
  description,
  image,
  price,
  quantity,
  title,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedQuality, setSelectedQuality] = useState('');
  const toast = useToast();
  const qualityOptions = ['quality 1', 'quality 2', 'quality 3'];

  const handleQualityChange = (e) => {
    setSelectedQuality(e.target.value);
  };

  const handleCartData = async () => {
    let finalData = {
      _id,
      quality: selectedQuality,
      image,
      price,
      quantity,
      title,
    };
   
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
          title: response.data.msg,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        toast({
          title: response.data.msg,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error.response.data.error);
      toast({
        title: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
              <Text>{}</Text>
              <Flex>
                <FormLabel>Description</FormLabel>
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
  );
};

export default GemstonesCart;
