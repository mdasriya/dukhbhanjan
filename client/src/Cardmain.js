import React from "react";
import {
  Box,
  Text,
  Heading,
  Flex,
  Avatar,
  Link,
  VStack,
  IconButton,
  Divider,
  Fade,
} from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import motion from framer-motion

const SocialMediaLink = ({ url, label, type, icon }) => (
  <IconButton
    as={Link}
    isExternal
    href={url}
    aria-label={label}
    colorScheme={type}
    icon={icon}
    rounded="full"
    variant="ghost"
    size="lg"
    isRound
  />
);

const Cardmain = ({ author }) => {
  return (
    <VStack spacing={5}>
      <motion.div whileHover={{ y: -5, scale: 1.1 }}>
        {/* Use motion.div here */}
        <Box boxShadow="xl" _hover={{ boxShadow: "lg" }} borderRadius="full">
          <Avatar
            _groupHover={{ width: "5rem", height: "5rem" }}
            size="xl"
            src="https://avatars2.githubusercontent.com/u/37842853?v=4"
          />
        </Box>
      </motion.div>
      <Heading
        fontSize="xl"
        fontFamily="body"
        textTransform="capitalize"
        noOfLines={2}
      >
        {author.name}
      </Heading>
      <Text
        color="gray.500"
        fontSize="lg"
        noOfLines={{ base: 3, md: 4 }}
        _groupHover={{ display: "none" }}
        display="block"
      >
        Founder
      </Text>
      <Fade in>
        <Text
          color="gray.500"
          fontSize="lg"
          noOfLines={{ base: 3, md: 4 }}
          _groupHover={{ display: "block" }}
          display="none"
        >
          I'm a Founder of Dukh Bhanjan
        </Text>
      </Fade>
      <Divider />
      <Flex alignItems="center" justify="center" w="100%">
        <Box textAlign="center">
          {author.accounts.map((sc, index) => (
            <SocialMediaLink key={index} {...sc} />
          ))}
        </Box>
      </Flex>
    </VStack>
  );
};

export default Cardmain;
