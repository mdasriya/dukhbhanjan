// Nav.js
import React, { useContext, useEffect, useState } from "react";
// import Sun from "./imgs/sun.png";
import { IoCart } from "react-icons/io5";

import "./style/Nav.css"
import {
  Button,
  Box,
  Flex,
  Image,
  HStack,
  Text,
  IconButton,
  useDisclosure,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import ThemeContext from "./components/ThemeContext";
export default function Nav() {
  const [cartItems, setCartItems] = useState("");
  const location = useLocation()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("")
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);


  const handleLogout = () => {
    // Perform logout logic (clear user session, etc.)
    // For now, let's just navigate to the signup page
    if (username) {
      localStorage.clear()
      setUsername(null)
      toast({
        title: 'sucessfully Logout',
        // description: "We've created your account for you.",
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: "top-right"
      })
      navigate("/")
    }


  };

 


  useEffect(() => {
    setUsername(localStorage.getItem("firstname"))
  }, [username, location])

useEffect(()=> {
  const getCartProduct = () => {
  
    return axios
      .get('http://localhost:4000/cart', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
       setCartItems(res.data.length)
      })
      .catch((err) => {
        console.log(err);
      });
  };
getCartProduct()
},[theme, cartItems])


// useEffect(()=> {

// },[theme,toggleTheme])
// console.log(theme)
  return (
    <>
       <Box bg={"gray.100"} px={4} >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
           <HStack spacing={8} alignItems={"center"}>
          <Box className="rotate-container">
              <Image src="http://localhost:3000/static/media/sun.121ef67838daba6b63c1.png" className="rotate-image" height={"60px"} width={"60px"} />
            </Box>
            <Text fontWeight="bold" fontSize={{ base: "20px", md: "30px" }}>
              Dukha Bhanjan
            </Text>

            <HStack
              as={"nav"}
              spacing={12}
              display={{ base: "none", md: "flex" }}
              alignContent={"center"}
              position={"relative"}
            left={"22rem"}
            >
              <Link to="/" style={{ fontWeight: "600", color: "gray.900" }}>HOME</Link>
              <Link to="/contact" style={{ fontWeight: "600", color: "gray.900" }} >CONTACT US</Link>
              <Menu>
                <MenuButton  bg="transparent" fontWeight={"600"} color={"gray.900"} >
                  SHOP
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to="/yantra">Yantra</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/workshipitems">WorkShip Items</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/gemstones">Gemstones</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton  bg="transparent" fontWeight={"600"} color={"gray.900"}>
                  SERVICES
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to="kundali"> Send Your Kundali</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="services">Remedies</Link>
                  </MenuItem>
                </MenuList>
              </Menu>

              <Link to="/about" style={{ fontWeight: "600", color: "gray.900" }}>ABOUT US</Link>
              {/* <Link to="/newcart" style={{ fontWeight: "600", color: "gray.900" }}>CART</Link> */}
              <Link to="/newcart">
        <IoCart  size={24} style={{ marginRight: '5px' }} />
        {cartItems > 0 && (
          <span
            style={{
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '3px 7px',
              fontSize: '11px',
              position: 'absolute',
              top: '-10px',
              right: '-10px',
            }}
          >
            {cartItems}
          </span>
        )}
      </Link>
              {/* <FaCartShopping size={"23px"}/> */}

            </HStack>

          </HStack>

          <Flex alignItems={"center"} gap={"10px"}>
         {username && <Text fontSize={"18px"}>{username.toUpperCase()}</Text>}   
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar size={"sm"} name={username} src='https://bit.ly/broken-link' />

              </MenuButton>

              <MenuList mt={"13px"}>
                <MenuItem onClick={() => navigate("/orders")}>My Orders</MenuItem>
                <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                {
                  !username ? <MenuItem onClick={() => navigate("/login")}>Login</MenuItem> : <MenuItem onClick={handleLogout}>Logout</MenuItem>
                }

                {/* <MenuDivider /> */}

              </MenuList>

            </Menu>
          </Flex>
        </Flex>


        

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link to="/">Home</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/about">About Us</Link>
              <Link to="/newcart">My Cart</Link>

              <Menu>
                <MenuButton as={Button} bg="transparent" fontWeight={"400"}>
                  Shop
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to="/yantra">Yantra</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/workshipitems">WorkShip Items</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/gemstones">Gemstones</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton  bg="transparent" fontWeight={"400"}>
                  <Box className="sbtn">Services</Box>
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to="kundali"> Send Your Kundali</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="services">Remedies</Link>
                  </MenuItem>

                  {/* Add more options as needed */}
                </MenuList>
              </Menu>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
