// import React from "react";
// // import data2 from "../data2";
// import {
//   Flex,
//   Box,
//   Text,
//   IconButton,
//   Button,
//   useToast,
//   Image,
//   Center,
// } from "@chakra-ui/react";
// import { useCart } from "../CartContext";
// import { MinusIcon, AddIcon, CloseIcon } from "@chakra-ui/icons";
// // import axios from "axios"; // Don't forget to import axios

// const MyCart = () => {
//   const { cart, removeFromCart, updateQuantity } = useCart();
//   const toast = useToast();

//   if (cart.length === 0) {
//     return (
//       <>
   

//       <Center> 
//   <Image width={"20%"} src='https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg' alt='Dan Abramov' />
//       </Center>
// <Text textAlign="center" fontSize="xl" mt={8}>
//         Your Cart Is Empty....
//       </Text>
//       </>
//     );
//   }

//   const handleCheckout = async () => {
//     let token = localStorage.getItem("token");
//     if (token) {
//       try {
//         // Filter out items with quantity greater than 0
//         const selectedItems = cart.filter((item) => item.quantity > 0);

//         // Check if there are selected items in the cart
//         if (selectedItems.length === 0) {
//           toast({
//             title: "Please select a product before checkout",
//             status: "warning",
//             duration: 5000,
//             isClosable: true,
//           });
//           return;
//         }

//         const formattedItems = selectedItems.map((item) => ({
//           id: item.id,
//           quantity: item.quantity, // Use the user-selected quantity from the cart
//         }));

//         const response = await fetch("http://localhost:4000/checkout/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ items: formattedItems }),
//         });

//         const data = await response.json();

//         if (data.url) {
//           window.location.assign(data.url);
//         }
//       } catch (error) {
//         console.error(error);
//         toast({
//           title: "Error during checkout",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//       }
//     } else {
//       toast({
//         title: `Login First`,
//         position: "top-right",
//         isClosable: true,
//       });
//     }
//   };

//   const calculateTotal = () => {
//     // Calculate total only for items in the cart
//     return cart.reduce(
//       (total, item) => total + item.quantity * (item.price || 0),
//       0
//     );
//   };

//   return (
//     <>
//       <Flex direction="column" mt={8} overflowX="auto" flexDirection={"column"}>
//         <Box overflowX="auto">
//           <Flex
//             borderBottom="1px"
//             borderColor="gray.200"
//             paddingBottom={2}
//             marginBottom={2}
//             fontWeight="bold"
//           >
//             <Box flex="2">Product</Box>
//             <Box flex="1">Price</Box>
//             <Box flex="1">Quantity</Box>
//             <Box flex="1">Total</Box>
//             <Box flex="1">Action</Box>
//           </Flex>
//         </Box>
//         <Box overflowX="auto">
//           {cart.map((item) => (
//             <Flex
//               key={item.id}
//               borderBottom="1px"
//               borderColor="gray.100"
//               py={2}
//               alignItems="center"
//               marginBottom={2}
//             >
//               <Box flex="2">{item.title}</Box>
//               <Box flex="1">₹{item.price}</Box>
//               <Box flex="1">
//                 <IconButton
//                   aria-label="Decrease quantity"
//                   icon={<MinusIcon />}
//                   onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                   size="sm"
//                   variant="ghost"
//                 />
//                 <Text mx={2}>{item.quantity}</Text>
//                 <IconButton
//                   aria-label="Increase quantity"
//                   icon={<AddIcon />}
//                   onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                   size="sm"
//                   variant="ghost"
//                 />
//               </Box>
//               <Box flex="1">₹{item.quantity * item.price}</Box>
//               <Box flex="1">
//                 <Button
//                   onClick={() => removeFromCart(item.id)}
//                   size="sm"
//                   colorScheme="red"
//                   leftIcon={<CloseIcon />}
//                 >
//                   Remove
//                 </Button>
//               </Box>
//             </Flex>
//           ))}
//         </Box>
//       </Flex>
//       <Text textAlign="end" fontSize="lg" mt={4}>
//         Total: ₹{calculateTotal()}
//       </Text>
//       <Button
//         colorScheme="yellow"
//         mt={4}
//         color={"white"}
//         onClick={handleCheckout} // Attach the checkout function to the onClick event
//       >
//         Checkout
//       </Button>
//     </>
//   );
// };

// export default MyCart;