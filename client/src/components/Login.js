// "use client";
import { useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
export default function Login({ }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState('');
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false)
  const toast = useToast()




  const loginSubmit = (e) => {
    if (!email || !pass) {
      setError('This field is required.');
      return;
    }

    e.preventDefault()
    setIsLoading(true);
    const data = { email, pass }
    axios.post("http://localhost:4000/user/login", data)
      .then(res => {
   setIsLoading(true)
        localStorage.setItem("token", res.data.token)

        toast({
          title: res.data.msg,
          // description: "redirectig to home page",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        if(res.data.token){
          localStorage.setItem("firstname", res.data.username)
          location.state ? navigate(location.state, {replace:true}) : navigate("/")
        }
      }).catch((error)=> {
        console.log(error)
      
      }).finally(()=> {
        setIsLoading(false)
      })
    setEmail("")
    setPass("")
    setError(false)
  }

// console.log(location)

  return (
    <>
      <div data-aos="flip-left">
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Log in to your account</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                HELLO AGAIN....
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="email" isRequired isInvalid={!!error}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    borderColor={error ? 'red.300' : undefined}
                  />
                </FormControl>
                <FormControl id="password" isRequired isInvalid={!!error}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    borderColor={error ? 'red.300' : undefined}
                  />
                </FormControl>
                {error && (
              <Box color="red.500" fontSize="sm" >
                {error}
              </Box>
            )}
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Text color={"yellow.400"}>Forgot password?</Text>
                  </Stack>
                 
                 
                 



                  {
                  isLoading ? <Button
                  isLoading
                     bg={"yellow.500"}
                     color={"white"}
                     _hover={{
                       bg: "yellow.500",
                     }}
                     
                     onClick={loginSubmit}
                   >
                     Login
                   </Button> : <Button
                     bg={"yellow.400"}
                     color={"white"}
                     _hover={{
                       bg: "yellow.500",
                     }}
                     
                     onClick={loginSubmit}
                   >
                     Login
                   </Button>
                  }
                  
                </Stack>
                <Center>
                <Flex>
                <Text align={"center"} >
                  New User ? <Text color={"blue"} as={"u"} _hover={{cursor:"pointer"}} onClick={()=>navigate("/signup")}>Register Here</Text>
                </Text>
                </Flex>
                </Center>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </div>
    </>
  );
}
