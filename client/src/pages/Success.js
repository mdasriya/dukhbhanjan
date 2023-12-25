"use client";

import { Box, Center, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  const [count, setCount] = useState(5); // Start with the initial count of 5

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Decrement the count by 1
      setCount((prev) => prev - 1);
    }, 1000); // Adjust the interval to 1000ms (1 second)

    // Cleanup the interval when component unmounts or count reaches 0
    return () => {
      clearInterval(intervalId);

      // Redirect to home page when count reaches 0
      if (count === 1) {
        navigate("/");
      }
    };
  }, [count, navigate]);

  return (
    <Box textAlign="center">
      <Center>
        <Box boxSize="sm">
          <Image

            src="https://cashfreelogo.cashfree.com/website/landings/instant-settlements/payment-done.png"
            alt="payment done"
          />
        </Box>
      </Center>
      <Text color={"gray.500"} fontSize={"30px"} fontWeight={500}>
        Thank you for ordering from "Dukha Bhanjan"
      </Text>
      <Text color={"gray.500"}>
        Redirecting to Home Page in {count} seconds
      </Text>
    </Box>
  );
}
