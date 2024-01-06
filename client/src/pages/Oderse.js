import {
  Box, Button, AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton, Grid, GridItem, Heading, Image, SkeletonCircle, SkeletonText, Text, useDisclosure, Badge
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Oderse = () => {
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState("")
const [exist, setExist] = useState(false)
  const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [render, setRender] = useState(false)
  const token = localStorage.getItem('token')

  const updaterFun = () => {
    setRender((prev) => !prev)
  }


  const handleCancelOrder = (id, UserId) => {

    axios.patch(`https://outrageous-shoulder-pads-fly.cyclic.app/order/cancel/${id}`, { UserId: UserId },)
      .then((res) => {
        console.log(res)
        updaterFun()
      })
      .catch((error) => {
        console.log(error.message)
      })
 //   updaterFun()
    onClose()
  }

  const initialRender = () => {
    setLoading(true)
    axios
      .get('https://outrageous-shoulder-pads-fly.cyclic.app/order', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        if(res.data.state){
          console.log(res.data);
           setOrderData(res.data.order);
          setLoading(false)
        }else{
setExist(true)
setLoading(false)
        }
     
      })
      .catch((error) => {
        console.log("Network issue")
        setLoading(false)
        setError(error.response.data.msg)
      })
  }



  useEffect(() => {
    if (token) {
      initialRender()
    }
  }, [render]);

  return (
    <>

      {error ? <Heading color={"white"} width={"40%"} m={"auto"} mt={10} bg={"red.600"} fontSize={"22px"} textAlign={"center"}>Unable to fetch data </Heading> : <> <Box borderLeft="10px solid green" borderRadius={5} margin={5}>
        <Heading fontSize={['20px','30px','30px','30px']} p={5}> My Order Summary </Heading>
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



        {exist && <Box position={"relative"} top={"50%"} left={"50%"}>
          <Text as={"b"}>No Order Placed Yet</Text>
        </Box>}
        <Grid
          templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
          gap={6}
          padding={5}
          justifyContent="center"
        >
          {orderData &&
            orderData?.map((item, index) => {
              return (
                <Box  key={index}>
                  {!loading && <GridItem
                   
                    w={['100%', '100%', '95%', '85%']} // Adjust the width based on screen size
                    h="auto"
                    p={5}
                    boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
            
              >
                    <Image boxSize="150px" objectFit="cover" src={item.image} alt={item.title} width={["55%",'50%', '50%', '50%']} />
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
                    <Box display="flex">
                      <Text as="b">Order Status : </Text>
                      {item.cancel === 'canceled' ? <Badge fontFamily={'initial'} variant='solid' colorScheme='red'>{item.cancel}</Badge> : <Badge fontFamily={'initial'} variant='solid' colorScheme='green'>{item.cancel}</Badge>}
                    </Box>
                    {item.cancelDate && <Box display="flex">
                      <Text as="b">cancel date : </Text>
                      {item.cancelDate && <Text> {item.cancelDate.slice(0, 10)}</Text>}
                    </Box>}
                    <Box textAlign={"center"}>
                      <Button mt={item.cancel === 'canceled'?'10px':"34px"} onClick={onOpen} colorScheme='red' isDisabled={item.cancel === 'canceled'} >Cancel</Button>
                    </Box>
                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Cancel Order
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure? You want to cancel order
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              close
                            </Button>
                            <Button colorScheme='red' onClick={() => handleCancelOrder(item._id, item.UserId)} ml={3}>
                              Order Cancel
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </GridItem>}

                </Box>
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