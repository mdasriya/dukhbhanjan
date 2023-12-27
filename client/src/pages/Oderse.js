import { Box, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Oderse = () => {
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState("")

  useEffect(() => {
    axios
      .get('https://wicked-cowboy-hat-pike.cyclic.app/order', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setOrderData(res.data);
      })
      .catch((error)=> {
        console.log("Network issue")
        // setError(error.response.data.msg)
        
      })
  }, []);

  return (
    <>


    {error ? <Heading color={"white"} width={"40%"} m={"auto"} mt={10} bg={"red.600"} fontSize={"22px"} textAlign={"center"}>Network issue Check your Internet </Heading> : <> <Box borderLeft="10px solid green" borderRadius={5} margin={6}>
        <Heading p={5}> My Order Summary </Heading>
      </Box>

  {!orderData  && <Box position={"relative"} top={"50%"} left={"50%"}>
 <Text as={"b"}>No Order Placed Yet</Text>
</Box>}    
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
        gap={6}
        padding={5}
        justifyContent="center"
      >
        {orderData &&
          orderData.map((item, index) => {
            return (
              <GridItem
                key={index}
                w={['100%', '100%', '50%', '100%']} // Adjust the width based on screen size
                h="auto"
                p={5}
                boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
              >
                <Image boxSize="200px" objectFit="cover" src={item.image} alt={item.title} width="100%" />
                <Box display="flex">
                  <Text as="b">Name : </Text>
                  <Text> {item.title}</Text>
                </Box>
                <Box display="flex">
                  <Text as="b">Price : </Text>
                  <Text> {item.price}</Text>
                </Box>
                <Box display="flex">
                  <Text as="b">Quality : </Text>
                  <Text>{item.quality}</Text>
                </Box>
                <Box display="flex">
                  <Text as="b">Quantity : </Text>
                  <Text> {item.quantity}</Text>
                </Box>
              </GridItem>
            );
          })}
      </Grid></>}
     
    </>
  );
};

export default Oderse;
