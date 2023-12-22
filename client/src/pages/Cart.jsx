import React, { useEffect, useState } from 'react';
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
  Skeleton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';


const initialAddress = {
  address1: "",
  address2: "",
  country: "",
  city: "",
  postalCode: "",
  phone: "",
}


const Cart = () => {
  const [address, setAddress] = useState(initialAddress)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setLoading] = useState(true)
  const toast = useToast()
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [cartData, setData] = useState([]);
  const [failed, setFaild] = useState(false)
  const totalPrice = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [paymentLoading, setPaymentLoading] = useState(false)


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
    setLoading(true)
    try {
      const response = await axios.delete(`http://localhost:4000/cart/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLoading(false)
      console.log(response)
      setUpdate((prev) => !prev);
    } catch (error) {
      func();
    }
  };

  const getCartProduct = () => {
    setLoading(true)
    return axios
      .get('http://localhost:4000/cart', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const cartData = res.data.map(item => ({ ...item, quantity: 1 }));
        setData(cartData);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:4000/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: totalPrice });
      console.log(data);

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
          console.log("Data to be sent for verification:", response);
          const verifyUrl = "http://localhost:4000/api/payment/verify";
          await axios.post(verifyUrl, response);

          if (response.razorpay_signature) {
            toast({
              title: 'Paymeny Done Successfully.',
              description: "Your Order Done Success",
              status: 'success',
              position: "top-right",
              duration: 9000,
              isClosable: true,
            })
            setPaymentLoading(true)
          await  handleMyOrderData(cartData)
           await  handledeleteCartData(cartData)
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
      .post('http://localhost:4000/cart/order/delete', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        if (res.data.state) {
          // toast({
          //   title: 'Cart Data Deleted After Payment',
          //   status: 'success',
          //   position: "top-right",
          //   duration: 3000,
          //   isClosable: true,
          // })
          navigate("/")
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
    setLoading(true)
if(address.address1.length==0 && address.address2.length==0 && address.city.length==0 && address.country.length==0 && address.phone.length==0 && address.postalCode.length==0){
 
 toast({
    title: 'missing input feild fill first',
    status: 'error',
    position: "top-right",
    duration: 3000,
    isClosable: true,
  })
}else{
  axios.post("http://localhost:4000/address/create", address, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => {
      if (res.data.state=="create") {
        // toast({
        //   title: res.data.msg,
        //   status: 'success',
        //   position: "top-right",
        //   duration: 3000,
        //   isClosable: true,
        // })
        setLoading(false)
        setAddress(initialAddress)
        onClose()
        handlePayment()
      }else{
        setLoading(false)
        onClose()
        handlePayment()
      }
    })
}
    
  }


  const handleMyOrderData = async (datatoAdd) => {
 
    try {
      const response = await axios.post("http://localhost:4000/order/create",datatoAdd, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  console.log(response)
 
      // if (response.data.state) {
      //   toast({
      //     title: response.data.msg,
      //     status: 'success',
      //     position: "top-right",
      //     duration: 3000,
      //     isClosable: true,
      //   });
 
      // await handledeleteCartData(datatoAdd);
      // } else {
      //   toast({
      //     title: 'Something went wrong while deleting cart data',
      //     status: 'error',
      //     position: "top-right",
      //     duration: 3000,
      //     isClosable: true,
      //   });
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const conditionallyPaymentForm = async () => {

    try {
      const response = await axios.post("http://localhost:4000/address/create", address, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    if(response.data.state=="onOpen"){
     onOpen()
    }else if(response.data.state=="handlePayment"){ 
handlePayment()
    }else{
      handlePayment()
    }
      
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error creating address:", error);
      // You might want to handle errors appropriately, such as displaying an error message
    }
  };
  

  const handleClose = () => {
    setAddress(initialAddress)
    onClose()
  }
  
  useEffect(() => {
    getCartProduct();
  }, [update]);

  return (
    <>
{paymentLoading ? <Box position={"relative"}>
  <Box position={"absolute"} top={"50vh"} left={"50%"}>
    <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>
</Box>
</Box>:<>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderLeft={"4px solid blue"} bg={"#E8E8E8"} margin={"10px"} p={"2px"}>Shipping Address</ModalHeader>
          <ModalCloseButton  onClick={()=> handleClose()}/>
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
      {/* purchase form model end */}

      {
        cartData.length > 0 ? <>  <Heading mt={5} fontSize="2xl" fontWeight="extrabold">
          Shopping Cart ({cartData.length} items)
        </Heading>
          <Box
            width="100%"
            padding="20px"
            justifyContent="space-between"
            display="flex"
            flexDirection={['column', 'column', 'row']}
          >
            {/* Left box */}
            <Box width={['100%', '100%', '65%']} height="100%" mb={['20px', '20px', '0']}>

              {cartData && cartData.map((item) => (

                <Box
                  key={item._id}
                  boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;"
                  flexWrap="wrap"
                  alignItems={"center"}
                  mt={10}
                  justifyContent="space-between"
                  display="flex"
                  height="30%"
                >
                  {/* Image */}
                  <Box width="25%" height="100%">
                    <Image
                      mt={2}
                      ml={5}
                      borderRadius="10px"
                      width="90%"
                      height="90%"
                      objectFit="cover"
                      src={item.image}
                      alt={item.title}
                    />
                  </Box>

                  {/* Title box */}
                  <Box width="10%" position="relative" height="100%">
                    <Text fontSize="17px" position="absolute" top="40%" color="gray.600">
                      {item.title}
                    </Text>
                  </Box>

                  {/* Select quantity box */}
                  {/* <Text>Select Quantity </Text> */}
                  <Box width="10%" position="relative" height="100%">
                    <Select onChange={(e) => handleQuantity(item._id, e)} position="absolute" top="40%">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </Select>
                  </Box>
                  <Text>{item.quality}</Text>
                  {/* <Box border={"1px"} padding={5}>
  <Text>{item.quality}</Text>
</Box> */}
                  {/* Price box */}
                  <Box width="10%" position="relative" height="100%">
                    <Text fontSize="20px" position="absolute" color="gray.600">
                      ₹{item.price * (item.quantity || 1)} Per Ratti
                    </Text>
                  </Box>

                  {/* Delete icon */}
                  <Box width="10%" position="relative" height="100%">
                    <CloseIcon
                      cursor="pointer"
                      _hover={{ color: 'red' }}
                      onClick={() => handleDelete(item._id)}
                      boxSize={4}
                      position="absolute"
                      top="40%"
                      color="GrayText"
                    />
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Right box */}
            <Box width={['100%', '100%', '30%']} borderRadius="5px" height="100%">
              <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
                <Heading size="md">Order Summary</Heading>

                <Stack spacing="6">
                  <Box display="flex" justifyContent="space-between">
                    <Text fontSize="17px" color="gray.700" fontWeight={500}>
                      Subtotal
                    </Text>
                    <Text>₹{(totalPrice)}</Text>
                  </Box>
                  {/* <Box display="flex" justifyContent="space-between">
          <Text fontSize="17px" color="gray.700" fontWeight={500}>
            Shipping + Tax
          </Text>
          <Text>40</Text>
        </Box> */}

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
                  // onClick={handlePayment}
                  // onClick={onOpen}
                  onClick={conditionallyPaymentForm}
                  colorScheme="yellow" color="white" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
                  Checkout
                </Button>

                <Center>
                  <HStack textAlign="center" mt="6" fontWeight="semibold">
                    <p>or</p>
                    <Link color={mode('blue.500', 'blue.200')} onClick={() => navigate('/gemstones')}>
                      Continue shopping
                    </Link>
                  </HStack>
                  {
                    failed && <Alert status='error'>
                      <AlertIcon />
                      <AlertTitle>Payment Failed</AlertTitle>
                      <AlertDescription>Your Payment is failed try Again</AlertDescription>
                    </Alert>
                  }
                </Center>
              </Stack>
            </Box>
          </Box>

        </> : <Box width={"100%"} height={"40vh"}>
          <Image width={"250px"} position={"relative"} top={"30%"} left={"40%"} src="https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA=" />
          <Center display={"flex"} flexDirection={"column"}>
            <Text zIndex={"1"} ml={"-30px"} mt={"50px"}>Your Cart Empty</Text>

            <Text position={"relative"} _hover={{ as: "i" }} zIndex={"9999"} >Continue Shopping</Text>


          </Center>
          {/* purchase form model start */}
        </Box>
      }

</>}

    </>
  );
};

export default Cart;




