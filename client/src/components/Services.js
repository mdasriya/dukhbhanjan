import React from "react";
import {
  Heading,
  Box,
  Stack,
  Button,
  Image,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import data from "../data";

const ServicesCard = ({ title, img }) => {
  const handleButtonClick = () => {
    window.location.href = "tel:+917060308055";
  };

  return (
    <Box
    maxW={"320px"}
    w={"full"}
    bg={useColorModeValue("white", "gray.900")}
    boxShadow={"2xl"}
    borderRadius={"10px"}
    p={6}
    textAlign={"center"}
    transition={"transform 0.3s ease-in-out"}
    _hover={{ transform: "scale(1.05)" }} // Zoom effect on hover
  >
    <Image
      height={"200px"}
      width={"300px"}
      src={img}
      mb={4}
      _after={{
        content: '""',
        w: 4,
        h: 4,
        bg: "green.300",
        border: "2px solid white",
        pos: "absolute",
        bottom: 0,
        right: 3,
      }}
    />
    <Heading fontSize={"xl"} fontFamily={"body"}>
      {title}
    </Heading>

    <Stack mt={8} direction={"row"} spacing={4}>
      <Button
        flex={1}
        fontSize={"sm"}
        rounded={"full"}
        bg={"yellow.400"}
        color={"white"}
        boxShadow={
          "0px 1px 25px -5px rgb(241 196 15 / 48%), 0 10px 10px -5px rgb(241 196 15 / 43%)"
        }
        _hover={{
          bg: "yellow.500",
        }}
        _focus={{
          bg: "yellow.500",
        }}
        onClick={handleButtonClick}
      >
        Call Us Now
      </Button>
    </Stack>
  </Box>
  );
};

export default function Services() {
  return (
    <div data-aos="fade-right">
      <Heading as="h1" textAlign="center" my={8}>
        What We Provide...
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 4 }}  pl={[8,5]} spacing={7}>
        {data && data.map(({ id, title, img }) => (
          <ServicesCard key={id} title={title} img={img} />
        ))}
      </SimpleGrid>
    </div>
  );
}
