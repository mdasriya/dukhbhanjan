import React, { useEffect, useState } from 'react'
import { useLocation,  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../redux/productReducer/action'
import { Box } from '@chakra-ui/react'
import GemstonesCart from './GemstonesCart'

const Gemstones = () => {

const location = useLocation()
const dispatch = useDispatch()

const {products} = useSelector((store)=>store.productReducer)

useEffect(()=> {
  dispatch(getProduct())
},[location.search])

// console.log(products)
  return (
    <Box display={"grid"} gridTemplateColumns={"auto auto auto auto"} gap={"20px"}>
{
        products.length>0 && products.map((el)=> ( <div key={el._id}> <GemstonesCart  {...el}/></div>
            
      ))
      }      
    </Box>
  )
}

export default Gemstones



























// import React, { useState } from "react";
// import {
//   Card,
//   CardBody,
//   Image,
//   Stack,
//   Heading,
//   Text,
//   Divider,
//   CardFooter,
//   Button,
//   SimpleGrid,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   useDisclosure,
//   useToast,
// } from "@chakra-ui/react";
// import data2 from "../data2";
// import { useCart } from "../CartContext";

// const GemstoneCard = ({
//   id,
//   title,
//   img,
//   description,
//   benefits,
//   price,
//   onDetailsClick,
// }) => (
//   <Card key={id} maxW="sm">
//     <CardBody>
//       <Image src={img} alt={title} borderRadius="lg" />
//       <Stack mt="6" spacing="3">
//         <Heading size="md">{title}</Heading>
//         <Divider />
//         <Stack spacing="2">
//           <Text fontWeight="bold">{description}</Text>
//         </Stack>
//       </Stack>
//     </CardBody>
//     <Divider />
//     <CardFooter>
//       <Button color={"white"} colorScheme="yellow" onClick={onDetailsClick}>
//         View Details
//       </Button>
//     </CardFooter>
//   </Card>
// );

// const Gemstones = () => {
//   const [products, setProducts] = useState([])
//   const [selectedGemstone, setSelectedGemstone] = useState(null);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const { addToCart } = useCart();
//   const toast = useToast(); // Initialize useToast

//   const handleAddToCart = () => {
//     if (selectedGemstone) {
//       const { id, title, img, quantity, price } = selectedGemstone;
//       addToCart({ id, title, img, quantity, price });
//       toast({
//         title: "Product Added To Cart",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//       handleCloseModal();
//     }
//   };

//   const handleDetailsClick = (gemstone) => {
//     // Ensure that the gemstone object has the 'price' property
//     const { id, title, img, benefits, price } = gemstone;
//     setSelectedGemstone({ id, title, img, benefits, price, quantity: 1 });
//     onOpen();
//   };

//   const handleCloseModal = () => {
//     setSelectedGemstone(null);
//     onClose();
//   };

//   return (
//     <>
//       <Heading as="h1" textAlign="center" my={8}>
//         Gemstones...
//       </Heading>
//       <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
//         {/* Render GemstoneCard for each product */}
//         {data2.map((gemstone) => (
//           <GemstoneCard
//             key={gemstone.id}
//             {...gemstone}
//             onDetailsClick={() => handleDetailsClick(gemstone)}
//           />
//         ))}
//       </SimpleGrid>

//       {/* Modal for displaying Gemstone details */}
//       <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
//         <ModalOverlay
//           bg="blackAlpha.300"
//           backdropFilter="blur(10px) hue-rotate(90deg)"
//         />

//         <ModalContent>
//           <ModalHeader>{selectedGemstone?.title} Details</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Text fontWeight="bold">Price: ₹{selectedGemstone?.price}</Text>
//             <Text fontWeight="bold">Benefits:</Text>

//             {selectedGemstone?.benefits.map((benefit, index) => (
//               <Text key={index}>{benefit}</Text>
//             ))}
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="yellow" onClick={handleAddToCart}>
//               Add to Cart
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default Gemstones;