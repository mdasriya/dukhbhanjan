import React from "react";
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Center,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import astro from "../imgs/astro.jpg";
import { RiGuideFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { CgCommunity } from "react-icons/cg";
import Author from "./Author";
const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

const AboutUs = () => {
  return (
    <div data-aos="flip-left">
      <Container maxW={"5xl"} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"white"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("yellow.400", "yellow.400")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              About Us
            </Text>
            <Heading>Who we are ?</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              At Dukh Bhanjan, we embark on a spiritual journey to bring solace,
              enlightenment, and positive energy into your life. Our website is
              a sanctuary for astrology enthusiasts and those seeking divine
              guidance. Explore a harmonious blend of astrology services, sacred
              worship items, and a serene space to connect with the cosmic
              forces.
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                />
              }
            >
              {" "}
              <Text
                textTransform={"uppercase"}
                color={"white"}
                fontWeight={600}
                fontSize={"sm"}
                bg={useColorModeValue("yellow.400", "yellow.400")}
                p={2}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                Why Choose Dukh Bhanjan?
              </Text>
              <Feature
                icon={
                  <Icon as={RiGuideFill} color={"yellow.500"} w={5} h={5} />
                }
                iconBg={useColorModeValue("yellow.100", "yellow.900")}
                text={"Expert Guidance"}
              />
              <Feature
                icon={
                  <Icon as={FaShoppingCart} color={"green.500"} w={5} h={5} />
                }
                iconBg={useColorModeValue("green.100", "green.900")}
                text={"Quality Workship Items"}
              />
              <Feature
                icon={
                  <Icon as={CgCommunity} color={"purple.500"} w={5} h={5} />
                }
                iconBg={useColorModeValue("purple.100", "purple.900")}
                text={"Community Connection"}
              />
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={astro}
              objectFit={"cover"}
              borderRadius={"50px"}
            />
          </Flex>

          <Author />
          <Author />
          <Author />
          <Author />
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default AboutUs;
