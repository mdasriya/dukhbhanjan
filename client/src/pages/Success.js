"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

export default function Success() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        YOUR PAYMENT HAS BEEN COMPLETE SUCCESSFULLY
      </Heading>
      <Text color={"gray.500"}>Thank you to order from "Dukha Bhanjan"</Text>
    </Box>
  );
}
