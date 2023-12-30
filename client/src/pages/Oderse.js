import { Box, Grid, GridItem, Heading, Image, SkeletonCircle, SkeletonText, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Oderse = () => {
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get('https://dull-gray-jackrabbit-shoe.cyclic.app/order', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setOrderData(res.data);
        setLoading(false)
      })
      .catch((error)=> {
        console.log("Network issue")
        setLoading(false)
         setError(error.response.data.msg)
      })
  }, []);

  return (
    <>

    {error ? <Heading color={"white"} width={"40%"} m={"auto"} mt={10} bg={"red.600"} fontSize={"22px"} textAlign={"center"}>Network issue Check your Internet </Heading> : <> <Box borderLeft="10px solid green" borderRadius={5} margin={6}>
        <Heading p={5}> My Order Summary </Heading>
      </Box>

      {loading && <DIV> <Box padding='6' boxShadow='lg' bg='white'>
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
            </Box>
            <Box padding='6' boxShadow='lg' bg='white'>
              <SkeletonCircle size='10' />
              <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box> </DIV>}



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


const DIV = styled.div`
  
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 30px;
padding: 20px;
  @media only screen and (min-width: 601px) and (max-width: 800px) {
    gap: 10px;
padding: 10px; 
grid-template-columns: repeat(2,1fr);      
}

@media only screen and (min-width: 400px) and (max-width: 600px) {
  gap: 10px;
padding: 5px;
grid-template-columns: repeat(1,1fr);
          
}

@media only screen and (min-width: 300px) and (max-width: 399px){
  width: 100%;
            display: grid;
            grid-template-columns: repeat(1,1fr);
}

`;