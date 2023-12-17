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
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';

const Cart = () => {
  const toast = useToast()
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState([]);
const [failed, setFaild] = useState(false) 
  const totalPrice = data.reduce((acc, item) => acc + item.price * item.quantity, 0);

  console.log(typeof totalPrice)
  const handleQuantity = (id, e) => {
    let quantity = e.target.value;
    const updatedItems = data.map((item) => {
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
    try {
      const response = await axios.delete(`http://localhost:4000/cart/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response)
      setUpdate((prev) => !prev);
    } catch (error) {
      func();
    }
  };

  const getCartProduct = () => {
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
       
            if(response.razorpay_signature){
              toast({
                title: 'Paymeny Done Successfully.',
                description: "Your Order Done Success",
                status: 'success',
                position:"top-right",
                duration: 9000,
                isClosable: true,
              })
            }else{
setFaild(true)
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






  useEffect(() => {
    getCartProduct();
  }, [update]);

  console.log(data[0])
  return (
    <>

      {
        data.length > 0 ? <>  <Heading mt={5} fontSize="2xl" fontWeight="extrabold">
          Shopping Cart ({data.length} items)
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
              {data &&
                data.map((item) => (
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

                <Button onClick={handlePayment} colorScheme="yellow" color="white" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
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
        </Box>
      }


    </>
  );
};

export default Cart;
