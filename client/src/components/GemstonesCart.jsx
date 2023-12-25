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
  AlertIcon,
  Alert,
  AlertTitle,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import ThemeContext from './ThemeContext';

const GemstonesCart = ({
  _id,
  description,
  image,
  title,
  qualities
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedQuality, setSelectedQuality] = useState("");
  const [radioItem, setRadioItem] = useState(0);
  const [emptyRadio, setEmptyRadio] = useState(false);
const [isLoading, setLoading] = useState(false)
const {toggleTheme } = useContext(ThemeContext);


  let matchdatafound = qualities.find((el) => el.type === selectedQuality);

  const handleCartData = async () => {
    setLoading(true)
    if (!radioItem) {
      setEmptyRadio(true);
      return;
    }
    let finalData = {
      _id,
      quality: selectedQuality,
      image,
      price: radioItem,
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
          title: "product is added in cart ",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setLoading(false)
        onClose();
        toggleTheme()
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

  const handleQuality = (e) => {
    setRadioItem(0);
    setSelectedQuality(e.target.value);
  };

  const handleSort = (e) => {
    setEmptyRadio(false);
    const { value } = e.target;
    setRadioItem(+value);
  };

  const handleQualityChange = () => {
    setRadioItem(0);
  };
// console.log(theme)
  return (
    <Box mt={"10px"}>
      <Box
        onClick={onOpen}
        border="1px solid #ececec"
        padding="10px"
        width={['85%', '250px']}
        // border={"1px solid red"}
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
        <Image src={image} borderRadius={"10px"} alt={title} width="100%" height={['150px', '200px']} />
        <Box textAlign="left" mt={2}>
          <Text>Name: {title}</Text>
          {/* <Text>Price: ₹{price}</Text> */}
          <Text>Des: {description}</Text>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image height={['50%', '200px']} src={image} alt={title} />
            <Box mt={4}>
              <Flex>
                <FormLabel>Description</FormLabel>
                <Text>{description}</Text>
              </Flex>
            </Box>
            <Box display={"flex"}>
              <FormControl mt={4} width={"40%"}>
                <FormLabel>Quality</FormLabel>
                <Select placeholder='Select quality' width={"70%"} onChange={(e) => { handleQuality(e); handleQualityChange(); }}>
                  {qualities && qualities.map((item) => (
                    <option key={item.type} value={item.type}>{item.type}</option>
                  ))}
                </Select>
                <br />
                {emptyRadio && <Alert status='error' width={"100%"}>
                  <AlertIcon />
                  <AlertTitle>Select Price As per Ratti</AlertTitle>
                </Alert>}
                {selectedQuality && <FormLabel>Quality Per Ratti Price</FormLabel>}
                {matchdatafound && matchdatafound.prices.map((item) => (
                 <Box key={item} onChange={handleSort} style={{ marginBottom: '8px' }}>
                 <input type="radio" name='order' value={item} style={{ marginRight: '10px' }}/>
                 {/* <label style={{ textDecoration: 'line-through', color: 'teal' }}>₹{(item * 10) / 100 + item}</label> */}

                 <label style={{ marginLeft: '8px' }}>₹{item}</label><br />
               </Box>
                ))}
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={isLoading} colorScheme="yellow" mr={3} onClick={handleCartData}>
              ADD TO CART
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GemstonesCart;
