"use client";
import ReactTyped from "react-typed";
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Testimonials from "./Testimonials";
import Img from "../imgs/devi2.jpeg";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "20%", md: "30%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "yellow.400",
                  zIndex: -1,
                }}
              >
                Welcome to{" "}
                <ReactTyped strings={["Dukha Bhanjan "]} typeSpeed={100} loop />
              </Text>
              <br />{" "}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
              In Puranic literature, Sharabha is linked with the deity Shiva and
              manifests to quell the intense forms of Vishnu. The myth of
              Sharabha engaging in combat with Narasimha, the man-lion
              incarnation of Vishnu, highlights the evident rivalry between the
              followers of Vishnu (Vaishnava sect) and those of Shiva (Shaiva
              sect), revealing a contentious aspect in the religious discourse.
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Button
                rounded={"full"}
                bg={"yellow.400"}
                color={"white"}
                _hover={{
                  bg: "yellow.500",
                }}
              >
                <Link to="readmore">Read More</Link>
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image alt={"Login Image"} objectFit={"cover"} src={Img} />
        </Flex>
      </Stack>
      <Testimonials />
    </>
  );
}
