import {
  Box,
  Stack,
  HStack,
  VStack,
  Link,
  Divider,
  Image,
  Text,
  Button,
  Center,
} from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import Sun from "./imgs/sun.png";
const Footer = () => {
  var currentDate = new Date();
  // Get the current year
  var currentYear = currentDate.getFullYear();

  return (
    <div style={{ marginTop: "40px" }}>
<hr />
      <Box p={{ base: 5, md: 8 }} maxW="5xl" marginInline="auto">
        <Stack
          spacing={{ base: 8, md: 0 }}
          justifyContent="space-between"
          direction={{ base: "column", md: "row" }}
        >
          <Box maxW="300px">
            <Image w="100px" src={Sun} alt="Dukh Bhanjan" />

            <Text mt={2} color="gray.500" fontSize="md">
              "Dukh Bhanjan Astrology: Illuminating Paths, Alleviating Pains."
            </Text>
          </Box>
          <HStack
            spacing={4}
            d={{ base: "none", sm: "flex" }}
            justifyContent={{ sm: "space-between", md: "normal" }}
          >
            <VStack spacing={4} alignItems="center" textAlign={"center"}>
              <Text fontSize="md" ml={{ base: "30px" }} fontWeight="bold">
                Address
              </Text>
              <VStack spacing={2} alignItems="flex-start" color="gray.500">
                <Text ml={{ base: "50px" }}>L1603 Sashtri Nagar Meerut-25004</Text>
              </VStack>
            </VStack>
          </HStack>
        </Stack>

        <Divider my={4} />

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={3}
          justifyContent="space-between"
        >
          <Text fontSize="md" color={"gray.500"}>
            Give Us Call :-
            <Link style={{ color: "#bcbcf5" }}>
              +91 7276301985 || +91 7060308055
            </Link>
          </Text>
          <Stack spacing={2} direction={{ base: "column", md: "row" }}>
            <Button
              leftIcon={<FaFacebook size={"20px"}/>}
              as={Link}
              href="#"
              rounded="md"
              color={"white"}
              bg="blue.500"
              _hover={{ bg: "blue.600" }}
            ></Button>
            <Button
              leftIcon={<IoLogoYoutube size={"20px"}/>}
              as={Link}
              href="https://youtube.com/@Dhukhbhanjan?si=9As3OXYEDouEzcvh"
              target="_blank"
              rounded="md"
              color="white"
              bg="red.500"
              _hover={{ bg: "red.600" }}
            ></Button>
            <Button
           
              leftIcon={<FaInstagram  size={"20px"}/>}
              as={Link}
              href="https://www.instagram.com/dhukh_bhanjan?igsh=dTJhcTUwZmFtZTJh"
              target="_blank"
              rounded="md"
              color="white"
              bg="pink.500"
              _hover={{ bg: "pink.600" }}
            ></Button>
          </Stack>
        </Stack>
      </Box>
      <Box w="100%" p={4}>
        <Center>
          <Text color={"gray"} fontWeight={"600"} fontSize={"lg"}>
            Designed and Developed by &copy;
          </Text>
          <Link
            href="http://royalswebtech.com"
            isExternal
            target="_blank"
          >
            <Text
              color={"gray"}
              _hover={{ color: "black" }}
              fontWeight={"600"}
              fontSize={"lg"}
            >
              Royals WebTech
            </Text>
          </Link>
          <Text
            ml={3}
            color={"gray"}
            fontWeight={"600"}
            fontSize={"lg"}
            href="http://royalswebtech.com/"
          >
            &nbsp;{currentYear}
          </Text>
        </Center>
      </Box>
    </div>
  );
};

export default Footer;