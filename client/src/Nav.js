// Nav.js
import React, { useEffect, useState } from "react";
import Sun from "./imgs/sun.png";
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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
export default function Nav() {
  const location = useLocation()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("")
  const navigate = useNavigate();



  const handleLogout = () => {
    // Perform logout logic (clear user session, etc.)
    // For now, let's just navigate to the signup page
if(username){
  localStorage.clear()
  setUsername(null)
  toast({
    title: 'sucessfully Logout',
    // description: "We've created your account for you.",
    status: 'success',
    duration: 4000,
    isClosable: true,
    position:"top-right"
  })
  navigate("/")
}

  
  };


  useEffect(()=>{
 setUsername(localStorage.getItem("firstname"))
  },[username, location])

  return (
    <>
      <Box bg={"gray.100"} px={4}>
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
            <Text fontWeight="bold" fontSize="45px">
              Dukha Bhanjan
            </Text>

            <HStack
              as={"nav"}
              spacing={12}
              display={{ base: "none", md: "flex" }}
              alignContent={"center"}
              position={"relative"}
              left={"12rem"}
            >
              <Link to="/">Home</Link>
              <Link to="/contact">Contact Us</Link>
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
                <MenuButton as={Button} bg="transparent" fontWeight={"400"}>
                  Services
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

              <Link to="/about">About Us</Link>
              <Link to="/newcart">My Cart</Link>
            </HStack>
          </HStack>
          <Flex alignItems={"center"} gap={"10px"}>
            <Text fontSize={"20px"}>{username}</Text>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar size={"sm"} name={username} src='https://bit.ly/broken-link' />
            
              </MenuButton>
             
              <MenuList  mt={"13px"}>
                <MenuItem onClick={()=>navigate("/orders")}>My Orders</MenuItem>
                <MenuItem onClick={()=>navigate("/profile")}>Profile</MenuItem>
                {
                  !username ?   <MenuItem onClick={()=>navigate("/login")}>Login</MenuItem> :  <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
              <Link to="/cart">My Cart</Link>
            
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
                <MenuButton as={Button} bg="transparent" fontWeight={"400"}>
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
