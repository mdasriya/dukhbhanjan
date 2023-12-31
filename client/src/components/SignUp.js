import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Alert,
  AlertIcon,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from 'react-router-dom'



export default function SignUp() {
  const toast = useToast();
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPass(newPassword);
    setError('');
  };


  const getPasswordStrength = () => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /\d/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    if (
      pass.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    ) {
      return 'Strong';
    } else if (pass.length >= minLength && (hasUpperCase || hasLowerCase || hasNumber)) {
      return 'Medium';
    } else {
      return 'Weak';
    }
  };

  const getValidationColor = (condition) => (condition ? 'green' : 'red');




  const handleSubmit = (e) => {
    e.preventDefault()
    // pass validation criteria
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /\d/.test(pass);

    // Check if password meets the criteria
    if (pass.length < minLength || !hasUpperCase || !hasLowerCase || !hasNumber) {
      setError('Invalid password. Please ensure it meets the criteria.');
      return;
    } else {
      let data = { firstName, lastName, email, pass }
      axios.post("https://outrageous-shoulder-pads-fly.cyclic.app/user/register", data)
        .then(res => {
          setError(false)
          if(res.data.msg){
            // alert(res.data.msg)
            localStorage.setItem("firstname", firstName)
            toast({
              title: 'Account created successfully.',
             
              status: 'success',
              duration: 3000,
              isClosable: true,
              position:"top-right"
            })
            navigate("/login")
          }
        })
        .catch((error) => {
          console.log(error)
        })
       setFirstname("")
       setLastname("")
        setEmail("")
        setPass("")
    }

    // Proceed with user registration logic
    // You can send a request to your server for registration here



  }



  return (
    <div data-aos="flip-right">
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              SIGN UP
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              AND GET RID OF YOUR PROBLEMS
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={pass}
                    onChange={handlePasswordChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
               
              </FormControl>
              <Stack spacing={10} pt={2}>

              {pass && (
        <VStack align="start" spacing={2} mb="4">
          <Text>
            Password Strength:{' '}
            <span style={{ color: getValidationColor(pass.length >= 8) }}>Length</span> |{' '}
            <span style={{ color: getValidationColor(/[A-Z]/.test(pass)) }}>Uppercase</span> |{' '}
            <span style={{ color: getValidationColor(/[a-z]/.test(pass)) }}>Lowercase</span> |{' '}
            <span style={{ color: getValidationColor(/\d/.test(pass)) }}>Number</span> |{' '}
            <span style={{ color: getValidationColor(/[!@#$%^&*(),.?":{}|<>]/.test(pass)) }}>
              Special Character
            </span>
          </Text>
         
        </VStack>
      )}


              {/* code for error start */}
                {error && (
                  <Alert status="error" mb="4">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}
              {/* code for error end */}

              {
                  isLoading ? <Button
                  isLoading
                     bg={"yellow.500"}
                     color={"white"}
                     _hover={{
                       bg: "yellow.500",
                     }}
                     
                     onClick={handleSubmit}
                   >
                     Login
                   </Button> : <Button
                     bg={"yellow.400"}
                     color={"white"}
                     _hover={{
                       bg: "yellow.500",
                     }}
                     
                     onClick={handleSubmit}
                   >
                    Sign Up
                   </Button>
                  }
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link to="/login">Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}