import React from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Flex,
  Text,
  Icon,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import { IoLocation } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const contactOptions = [
  {
    label: "Address",
    value:
      "Gupta Palace 2nd Floor 208, Near Rajouri Garden Metro Gate No. 8, West, Delhi, 110027",
    icon: IoLocation,
  },
  {
    label: "PHONE NUMBER",
    value: "+91 7276301985",
    icon: FaPhone,
  },
  {
    label: "EMAIL",
    value: "support@dukhbhanjan.com  accounts@dukhbhanjan.com",
    icon: IoMail,
  },
];

const Contact = () => {
  return (
    <div data-aos="fade-in">
      <Container maxW="7xl" py={10} px={{ base: 5, md: 8 }}>
        <Stack spacing={10}>
          <VStack align="center">
            <Heading fontSize={{ base: "2xl", md: "4xl" }} mb={2}>
              Contact Us
            </Heading>
            <Text fontSize="lg" textAlign="center">
              FEEL FREE TO REACH US{" "}
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {contactOptions.map((option, index) => (
              <Flex
                key={index}
                direction="column"
                align="center"
                textAlign="center"
              >
                <Icon as={option.icon} w={10} h={10} color="yellow.400" />
                <Text fontSize="lg" fontWeight="semibold">
                  {option.label}
                </Text>
                <Text fontSize="md" textAlign="center">
                  {option.value}
                </Text>
              </Flex>
            ))}
          </SimpleGrid>
          <VStack
            as="form"
            spacing={8}
            w="100%"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
          >
            <VStack spacing={4} w="100%">
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3}>
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Write Your Name"
                    rounded="md"
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Your Mail" rounded="md" />
                </FormControl>
                <FormControl id="phone">
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="tel"
                    placeholder="Your Phone Number"
                    rounded="md"
                  />
                </FormControl>
              </SimpleGrid>
              <FormControl id="subject">
                <FormLabel>Subject</FormLabel>
                <Input type="text" placeholder="Your Problem" rounded="md" />
              </FormControl>
              <FormControl id="message">
                <FormLabel>Message</FormLabel>
                <Textarea
                  size="lg"
                  placeholder="Enter your message"
                  rounded="md"
                />
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Button
                bg="yellow.500"
                color="white"
                _hover={{
                  bg: "yellow.500",
                }}
                rounded="md"
                w={{ base: "100%", md: "max-content" }}
              >
                Send Message
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Container>
    </div>
  );
};

export default Contact;
