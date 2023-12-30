import React, { useContext, useEffect, useState } from 'react';
import { GiShoppingCart } from "react-icons/gi";
import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Center,
  HStack,
  Link,
  Text,
  Select,
  Button,
  useColorModeValue as mode,
  useToast,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Alert,
  useDisclosure,
  Modal,
  Spinner,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  FormLabel,
  ModalFooter,
  SkeletonCircle,
  SkeletonText,
  IconButton,
} from '@chakra-ui/react';

import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';
import ThemeContext from '../components/ThemeContext';
import styled from '@emotion/styled';


const initialAddress = {
  address1: "",
  address2: "",
  country: "",
  city: "",
  postalCode: "",
  phone: "",
}


const Cart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [deleteloading, setDeleteloading] = useState(false)
  const [failed, setFaild] = useState(false)
  const [update, setUpdate] = useState(false);
  const [cartData, setData] = useState([]);
  const totalPrice = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [paymentLoading, setPaymentLoading] = useState(false)
  const toast = useToast()
  const [address, setAddress] = useState(initialAddress)
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const handleQuantity = (id, e) => {
    let quantity = e.target.value;
    const updatedItems = cartData.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          quantity: +quantity,
        };
      }
      return item;
    });
    setData(updatedItems);
  };

  const func = () => {
    setUpdate((prev) => !prev);
  };

  const handleDelete = async (id) => {
  setDeleteloading(true)
    try {
      const response = await axios.delete(`https://vast-teal-abalone-wrap.cyclic.app/cart/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response) {
        setUpdate((prev) => !prev);
       await toggleTheme()
        setDeleteloading(false)
      }

    } catch (error) {
      func();
      setDeleteloading(false)
    }
  };

  const getCartProduct = () => {
    return axios
      .get('https://vast-teal-abalone-wrap.cyclic.app/cart', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const cartData = res.data.map(item => ({ ...item, quantity: 1 }));
        setData(cartData);
      
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePayment = async () => {
    try {
      const { data } = await axios.post("https://vast-teal-abalone-wrap.cyclic.app/api/payment/orders", { amount: totalPrice }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // console.log(data);
      // Call the function to initialize payment with Razorpay
      initPayment(data.data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error during payment initiation",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_FZa7FJ6Bglhj8Y", // Replace with your actual key
      amount: data.amount,
      currency: data.currency,
      name: "Dukha Bhanjan",
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          await axios.post("https://vast-teal-abalone-wrap.cyclic.app/api/payment/verify",response,{
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
          });

          if (response.razorpay_signature) {
            toast({
              title: 'Paymeny Done Successfully.',
              description: "Your Order Done Success",
              status: 'success',
              position: "top-right",
              duration: 3000,
              isClosable: true,
            })
            setPaymentLoading(true)
            await handleMyOrderData(cartData)
            await handledeleteCartData(cartData)
            setPaymentLoading(false)
          } else {
            setFaild(true)
            setPaymentLoading(false)
          }
        } catch (error) {
          console.error(error.message);
        }
      },
      theme: {
        color: "#F7C440",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();

  };


  const handledeleteCartData = async (data) => {
    return axios
      .post('https://vast-teal-abalone-wrap.cyclic.app/cart/order/delete', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        if (res.data.state) {
          toggleTheme()
          navigate("/success")
        } else {
          toast({
            title: 'something went wrong while deleting cartdata',
            status: 'error',
            position: "top-right",
            duration: 3000,
            isClosable: true,
          })
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }


  const handleSubmitForm = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleForm = (e) => {
    e.preventDefault();
    if (address.address1.length == 0 && address.address2.length == 0 && address.city.length == 0 && address.country.length == 0 && address.phone.length == 0 && address.postalCode.length == 0) {

      toast({
        title: 'missing input feild fill first',
        status: 'error',
        position: "top-right",
        duration: 3000,
        isClosable: true,
      })
    } else {
      axios.post("https://vast-teal-abalone-wrap.cyclic.app/address/create", address, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          if (res.data.state == "create") {
            setAddress(initialAddress)
            onClose()
            handlePayment()
          } else {
            onClose()
            handlePayment()
          }
        })
    }

  }


  const handleMyOrderData = async (datatoAdd) => {

    try {
      const response = await axios.post("https://vast-teal-abalone-wrap.cyclic.app/order/create", datatoAdd, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

    } catch (error) {
      // console.error(error);
      console.log(error.message)
    }
  };

  const conditionallyPaymentForm = async () => {

    try {
      const response = await axios.post("https://vast-teal-abalone-wrap.cyclic.app/address/create", address, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.state == "onOpen") {
        onOpen()
      } else if (response.data.state == "handlePayment") {
        handlePayment()
      } else {
        handlePayment()
      }

    } catch (error) {
      console.log(error.message)
      // Handle any errors that occurred during the request
      // You might want to handle errors appropriately, such as displaying an error message
    }
  };


  const handleClose = () => {
    setAddress(initialAddress)
    onClose()
  }

  useEffect(() => {
    getCartProduct();
  }, [update, theme]);



  return (
    <>
      {paymentLoading ? (
        <Box position={'relative'}>
          <Box  position={'absolute'} mt={"30px"} left={'50%'}>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          </Box>
        </Box>
      ) : (
        <DIV>
          <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader borderLeft={"4px solid blue"} bg={"#E8E8E8"} margin={"10px"} p={"2px"}>Shipping Address</ModalHeader>
              <ModalCloseButton onClick={() => handleClose()} />
              <ModalBody pb={6}>
                <Box display={"flex"} gap={5}>
                  <FormControl isRequired>
                    <FormLabel>Address Line 1</FormLabel>
                    <Input placeholder='Address Line 1' name='address1' value={address.address1} onChange={handleSubmitForm} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Address Line 2</FormLabel>
                    <Input placeholder='Address Line 2' name='address2' value={address.address2} onChange={handleSubmitForm} />
                  </FormControl>
                </Box>

                <Box mt={5} display={"flex"} gap={5}>
                  <FormControl isRequired>
                    <FormLabel>Country</FormLabel>
                    <Input placeholder='country' name='country' value={address.country} onChange={handleSubmitForm} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                    <Input placeholder='city' name='city' value={address.city} onChange={handleSubmitForm} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Postal code</FormLabel>
                    <Input placeholder='postal code' name='postalCode' value={address.postalCode} onChange={handleSubmitForm} />
                  </FormControl>
                </Box>

                <Box mt={5}>
                  <FormControl isRequired>
                    <FormLabel>Phone No.</FormLabel>
                    <Input placeholder='phone Number' name='phone' value={address.phone} onChange={handleSubmitForm} />
                  </FormControl>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='green' mr={3} onClick={handleForm}>
                  SUBMIT
                </Button>



                <Button onClick={() => handleClose()}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {cartData.length > 0 ? (
            <>
              <Heading ml={5} color={"gray.500"} mt={5} fontSize={{base:"20px", md:'25px'}} fontWeight="bold">
                Shopping Cart ({cartData.length} items)
              </Heading>
              <Box
                width="100%"
                padding="20px"
                justifyContent="space-between"
                display="flex"
                flexDirection={['column', 'column', 'row']}
              >
                {deleteloading ? <Box gap={"20px"}  display={"flex"} flexDirection={"column"} width={['100%', '100%', '65%']} height="100%" mb={['20px', '20px', '0']}> <Box padding='6' boxShadow='lg' bg='white'>
              <SkeletonCircle size='10' />
              <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
            <Box padding='6' boxShadow='lg' bg='white'>
              <SkeletonCircle size='10' />
              <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
            <Box padding='6' boxShadow='lg' bg='white'>
              <SkeletonCircle size='10' />
              <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box></Box> : 
                 <Box width={['100%', '100%', '65%']} height="100%" mb={['20px', '20px', '0']}>
                  {cartData && cartData.map((item) => (
                    <Box
                      className='cart_Main'
                  
                      key={item._id}
                      boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;"
                      flexWrap="wrap"
                      alignItems={"center"}
                      justifyContent="space-between"
                      display="flex"
                
                      height="30%"
                    // border={"1px solid red"}
                    >
                      {/* Image */}
                      <Box className='image_outer'  width="25%"   height={{base:"50%",md:'100%'}}>
                        <Image
                          className='cart_image'
                          borderRadius="10px"
                         
                          objectFit="cover"
                          src={item.image}
                          alt={item.title}
                        />
                
                      </Box>

                      {/* Title box */}
                      <Box className='cart_title' width="10%"  height="100%">
                        <Text className='title' fontSize="17px"  color="gray.600">
                         {item.title}
                        </Text>
                      </Box>

                      {/* Select quantity box */}
                      <Box className='cart_quality' width="10%"  height="100%">
                        <Select onChange={(e) => handleQuantity(item._id, e)} >
                          {[1, 2, 3, 4, 5].map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </Select>
                      </Box>
                      <Text className='product_quality'>{item.quality}</Text>

                      {/* Price box */}
                      <Box className='product_price' width="10%"  height="100%">
                        <Text className='price'  fontSize={{base:"20px", md:"20px"}} color="gray.600">
                          ₹{item.price * (item.quantity || 1)} Per Ratti
                        </Text>
                      </Box>

                      {/* Delete icon */}

                      <Box onClick={()=>handleDelete(item._id)} className='cart_delete' width="10%" position="relative" height="100%" p={4}>
                        <IconButton
                        
                          icon={<CloseIcon />}
                          colorScheme='red'
                          variant={"outline"}
                          isRound
                        />

                      
                      </Box>
                    </Box>


                  ))}
                </Box>}
                {/* Left box */}
               



                {/* Right box */}
                <Box width={['100%', '100%', '30%']} borderRadius="5px" height="100%" mt={['20px', '20px', '0']}>
                  <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
                    <Heading size="md">Order Summary</Heading>

                    <Stack spacing="6">
                      <Box display="flex" justifyContent="space-between">
                        <Text fontSize="17px" color="gray.700" fontWeight={500}>
                          Subtotal
                        </Text>
                        <Text>₹{(totalPrice)}</Text>
                      </Box>

                      <Flex justify="space-between">
                        <Text fontSize="21px" fontWeight="semibold">
                          Total
                        </Text>
                        <Text fontSize="xl" fontWeight="extrabold">
                          ₹ {totalPrice}
                        </Text>
                      </Flex>
                    </Stack>

                    <Button
                      onClick={conditionallyPaymentForm}
                      colorScheme="yellow"
                      color="white"
                      size="lg"
                      fontSize="md"
                      rightIcon={<FaArrowRight />}
                    >
                      Checkout
                    </Button>

                    <Center>
                      <HStack textAlign="center" mt="6" fontWeight="semibold">
                        <p>or</p>
                        <Link color={mode('blue.500', 'blue.200')} onClick={() => navigate('/gemstones')}>
                          Continue shopping
                        </Link>
                      </HStack>
                      {failed && (
                        <Alert status="error">
                          <AlertIcon />
                          <AlertTitle>Payment Failed</AlertTitle>
                          <AlertDescription>Your Payment is failed try Again</AlertDescription>
                        </Alert>
                      )}
                    </Center>
                  </Stack>
                </Box>
              </Box>
            </>
          ) : (
            <Center height={'40vh'} display={'flex'} flexDirection={'column'} alignItems={'center'}>

              <Box  mt={{base:"100px", md:"170px"}} mb={3}><GiShoppingCart size={"150px"} /></Box>
              <Box mb={'70px'}>
                <Text fontSize="lg" marginLeft={5} fontWeight="bold">
                  Your Cart is Empty
                </Text>
                <Button mt={4} ml={4} onClick={() => navigate("/gemstones")} _hover={{ textDecoration: 'none', cursor: 'pointer' }} color={"white"} colorScheme='yellow'>Continue Shopping</Button>

              </Box>
            </Center>
          )}
        </DIV>
      )}
    </>
  );
};

export default Cart;


const DIV = styled.div`

/* Responsive styles for small devices (phones) */
@media only screen and (max-width: 600px) {
 
  .cart_Main{
  
    display: flex;
    flex-direction: column;
  }
  .image_outer{
    margin-left:-30px;
    width: 90%;
  }
  .cart_image{
    width: 500px;
  
  }
  .cart_title{
   
    width: 100%;
  }
  .title{
    font-size: 25px;
    margin-top: 10px;
    margin-left: 15px;
  }
  .cart_quality{
    width: 95%;
    margin-top: 10px;
    margin-left: -10px;
  }
  .product_quality{
    width: 100%;
    margin-left: 25px;
    margin-top: 10px;
    /* margin-left: 10px; */
    font-size: 25px;
    color: #686666;
  }
  .product_price{
    width: 100%;
    margin-top: 10px;
    margin-left: 25px;
  }
  .price{
    margin-left: 5px; 
  }
  .product_title{
    width: 100%;
    margin-top: 10px;
    
  }
  .cart_delete{
    
    width: 100%;
    margin-top: 10px;
    justify-content: center;
    text-align: center; 
  }
  .delete{
    
    width: 70%;
    background-color: #f56262;
    
    color: #000000;

  font-size: 50px;
  margin-top: 20px;
  margin-left: -130px;
   font-size: 70px;
   
  }

  
}

/* Responsive styles for medium devices (tablets) */
@media only screen and (min-width: 601px) and (max-width: 1024px) {
 

  /* Additional styles for medium devices */
}

/* Responsive styles for large devices (desktops) */
@media only screen and (min-width: 1025px) {
  body {
    font-size: 18px;
  }
}
`



