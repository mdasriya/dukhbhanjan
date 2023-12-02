import React from "react";
import {
  Container,
  Box,
  HStack,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import Cardmain from "../Cardmain";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
const Author = () => {
  const bg = useColorModeValue("white", "#2f3244");

  const author = {
    name: "Rahul Singh",
    accounts: [
      {
        label: "Instagram Account",
        type: "pink",
        icon: <FaInstagram />,
      },
      {
        label: "Twitter Account",
        type: "twitter",
        icon: <FaTwitter />,
      },
      {
        label: "Facebook Account",
        type: "blue",
        icon: <FaFacebook />,
      },
      // Add more social media accounts as needed
    ],
  };

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Box
          maxH="400px"
          minH="354px"
          w="345px"
          boxShadow="lg"
          rounded="md"
          p={6}
          overflow="hidden"
          cursor="pointer"
          _hover={{ boxShadow: "lg" }}
          bg={bg}
          role="group"
        >
          <Cardmain author={author} />
        </Box>
      </Center>
    </Container>
  );
};

export default Author;
