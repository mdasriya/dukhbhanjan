
import React, { useContext, useEffect, useState } from "react";
import { IoCart } from "react-icons/io5";
import "./style/Nav.css"
import { CgProfile } from "react-icons/cg";
import { BsBucket } from "react-icons/bs";
import { IoLogInOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { MdGTranslate } from "react-icons/md";
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
import sun from "../src/imgs/sun.png"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import ThemeContext from "./components/ThemeContext";
export default function Nav() {
  const [cartItems, setCartItems] = useState(0);
  const location = useLocation()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("")
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

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


  const handleCloseNav = () => {
    onClose()
  }

const handleChangeLanguage = () => {
  alert("we are working on this featues")
}




  useEffect(() => {
    setUsername(localStorage.getItem("firstname"))
  }, [username, location])

  useEffect(() => {
    const getCartProduct = () => {
      return axios
        .get('https://outrageous-shoulder-pads-fly.cyclic.app/cart', {
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
  }, [theme, cartItems])



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
            <Box onClick={()=> navigate("/")} className="rotate-container" _hover={{cursor:"pointer"}}>
              <Image src={sun} className="rotate-image" height={"60px"} width={"60px"} />
            </Box>
            <Text fontWeight="bold" fontSize={{ base: "20px", md: "30px" }} ml={{base:"-60px 0px"}}>
              Dukha Bhanjan
            </Text>

            <HStack
              as={"nav"}
              spacing={12}
              display={{ base: "none", md: "flex" }}
              alignContent={"center"}
              position={"relative"}
              left={"21rem"}
            >
              <Link to="/" style={{ fontWeight: "600", color: "gray" }}>HOME</Link>
              <Link to="/contact" style={{ fontWeight: "600", color: "gray" }} >CONTACT US</Link>
              <Menu>
                <MenuButton bg="transparent" fontWeight={"600"} color={"gray"} >
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
                <MenuButton bg="transparent" fontWeight={"600"} color={"gray"}>
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
           
              <Link to="/about" style={{ fontWeight: "600", color: "gray" }}>ABOUT US</Link>
            
            
            <Box as="button" onClick={handleChangeLanguage} _hover={{cursor:"pointer"}}>

              <MdGTranslate size={"20px"}/>
            </Box>



              {/* <Link to="/newcart" style={{ fontWeight: "600", color: "gray.900" }}>CART</Link> */}
              <Link to="/newcart">
                <IoCart size={24} style={{ marginRight: '5px' }} />
                {cartItems >= 0 && (
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
            {/* {username && <Text fontSize={"18px"}>{username.toUpperCase()}</Text>} */}
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

              <Box p={1} onClick={()=>navigate('/signup')}> 
                <Box p={1} display={"flex"} justifyContent={"space-between"} > 
                <Text fontSize={"17px"} mt={"5px"}>New Customer?</Text>
               <Text  color={"blue"} ml={3} fontSize={"20px"} fontWeight={500} _hover={{cursor:"pointer"}}>Sign Up</Text>
                </Box>
              <hr />
                </Box>
               


                <Flex >
                <MenuItem onClick={() => navigate("/orders")}> 
                <BsBucket  size={"20px"}/>
                <label style={{marginLeft:'10px'}}>Orders</label>
                </MenuItem>
                </Flex>
                
                <MenuItem  onClick={() => navigate("/profile")}>
                <CgProfile  size={"20px"}/>
                <label style={{marginLeft:'10px'}}>My Profile</label>
                  </MenuItem>
                {
                  !username ? <MenuItem onClick={() => navigate("/login")}>
                    <IoLogInOutline   size={"20px"}/>
                    <label style={{marginLeft:'10px'}}>Login</label>
                    </MenuItem> : <MenuItem onClick={handleLogout}>
                    <MdLogout    size={"20px"}/>
                    <label style={{marginLeft:'10px'}}>Logout</label>
                    
                      </MenuItem>
                }

                {/* <MenuDivider /> */}

              </MenuList>

            </Menu>
          </Flex>
        </Flex>




        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link to="/" onClick={handleCloseNav}>Home</Link>
              <Link to="/contact" onClick={handleCloseNav}>Contact Us</Link>
              <Link to="/about" onClick={handleCloseNav}>About Us</Link>
              <Link to="/newcart" onClick={handleCloseNav}>My Cart</Link>

              <Menu>
                <MenuButton  textAlign={"start"} bg="transparent" fontWeight={"400"}>
                  Shop
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to="/yantra" onClick={handleCloseNav}>Yantra</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/workshipitems" onClick={handleCloseNav}>WorkShip Items</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/gemstones" onClick={handleCloseNav}>Gemstones</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton bg="transparent" fontWeight={"400"}>
                  <Box className="sbtn" ml={{base:"-10px", md:"0px"}} textAlign={"start"}>Services</Box>
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to="kundali" onClick={handleCloseNav}> Send Your Kundali</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="services" onClick={handleCloseNav}>Remedies</Link>
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
