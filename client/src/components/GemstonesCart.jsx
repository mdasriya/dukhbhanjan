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
  const { toggleTheme } = useContext(ThemeContext);
  const [show, setShow] = useState('nowrap');

  let matchdatafound = qualities.find((el) => el.type === selectedQuality);
  const token = localStorage.getItem("token")


  const handleCartData = async () => {
    if (!token) {
      toast({
        title: "Login first",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      return
    }
    setLoading(true)
    if (!radioItem) {
      setEmptyRadio(true);
      setLoading(false)
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
        'https://outrageous-shoulder-pads-fly.cyclic.app/cart/create',
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
          position:'top'

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
        setLoading(false)
      }
    } catch (error) {
      // console.error('Error submitting form:', error);
      toast({
        title: error.response.data.msg,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false)
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

  return (
    <Box mt={"10px"}>
      <Box
        border="1px solid #ececec"
        padding="10px"
        width={['85%', '250px']}
        // border={"1px solid red"}
        margin="auto"
        textAlign="center"
        cursor="pointer"
        borderRadius="3px"
        boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
        _hover={{
          border: 'none',
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
          borderRadius: '3px',
        }}
      >
        <Box
  as="div"
  position="relative"
  overflow="hidden"
  borderRadius="10px"
>

  <Box
    as="div"
    transition="transform 0.3s ease-in-out"
    _hover={{ transform: 'scale(1.1)'}}
    onClick={onOpen}

  >
    <Image src={image} borderRadius="10px" alt={title} width="100%" height={['190px', '200px']} />
  </Box>

  <Box textAlign="left" p={2} mt={2}>
    <Text  fontWeight={{base:'600', md:'500'}} fontSize={{base:'20px', md:'17px'}} 
        onClick={onOpen}
        >
      {title}
    </Text>
    <Text textOverflow={'ellipsis'}overflow={'hidden'} whiteSpace={show}transition={'ease-in 0.3s'}
    onClick={()=>{show == 'nowrap' ? setShow('normal') : setShow('nowrap')}}>{description}</Text>
  </Box>
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
                    <input type="radio" name='order' value={item} style={{ marginRight: '10px' }} />
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
