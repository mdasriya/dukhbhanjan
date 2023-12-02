import {
  Container,
  Box,
  chakra,
  Flex,
  Text,
  Stack,
  Avatar,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

const testimonials = [
  {
    name: "Amit Kumar",
    position: "Customer",
    company: "Dukh Bhanjan",
    image:
      "   https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80",
    content: `Dukh Bhanjan has truly been a blessing in my life. The products and services they offer are exceptional, and their team is dedicated to customer satisfaction. I highly recommend Dukh Bhanjan to everyone seeking quality and reliability.`,
  },
  {
    name: "Priya Sharma",
    position: "Client",
    company: "Dukh Bhanjan",
    image:
      "  https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
    content: `I've been a client of Dukh Bhanjan for years, and they consistently exceed my expectations. Their commitment to excellence and holistic approach to well-being make them stand out. Thank you, Dukh Bhanjan, for your amazing services!`,
  },
  {
    name: "Raj Singh",
    position: "Partner",
    company: "Dukh Bhanjan",
    image:
      "  https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80",
    content: `Working with Dukh Bhanjan has been an incredible experience. Their team is not only professional but also compassionate. Together, we've achieved great results, and I look forward to continued collaboration.`,
  },
  {
    name: "Anita Verma",
    position: "Supporter",
    company: "Dukh Bhanjan",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
    content: `Dukh Bhanjan's commitment to community welfare is commendable. I am proud to be a supporter of their initiatives. Their impact on people's lives is truly transformative. Keep up the great work, Dukh Bhanjan!`,
  },
];

const Testimonials = () => {
  const bgColor = useColorModeValue("gray.200", "gray.600");
  const bgColor2 = useColorModeValue("white", "gray.800");
  const bgColor3 = useColorModeValue("white", "#1a202c");
  return (
    <div data-aos="fade-right">
      <Container maxW="5xl" py={10} px={6} bg={bgColor}>
        <Flex justify="center" mb={8}>
          <chakra.h3 fontSize="3xl" fontWeight="bold" mb={3} textAlign="center">
            What people are saying about Us
          </chakra.h3>
        </Flex>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          placeItems="center"
          spacing={1}
          mt={12}
          mb={4}
        >
          {testimonials.map((obj, index) => (
            <Stack
              key={index}
              direction={{ base: "column", sm: "row" }}
              spacing={2}
              mb={5}
              justify="center"
            >
              <Stack
                maxW="345px"
                boxShadow="lg"
                rounded="md"
                p={6}
                pos="relative"
                bg={bgColor2}
                _after={{
                  content: `""`,
                  w: "0",
                  h: "0",
                  borderColor: `transparent ${bgColor3} transparent`,
                  borderStyle: "solid",
                  borderWidth: "10px 0 10px 10px",
                  position: "absolute",
                  top: { base: "unset", sm: "45%" },
                  right: { base: "unset", sm: "-10px" },
                  left: { base: "48%", sm: "unset" },
                  bottom: { base: "-15px", sm: "unset" },
                  transform: { base: "rotate(90deg)", sm: "unset" },
                  display: "block",
                }}
              >
                <Text fontWeight="medium" fontSize="sm">
                  {obj.content}
                </Text>
              </Stack>
              <Stack
                direction="column"
                spacing={2}
                p={2}
                justify="flex-end"
                alignItems="center"
              >
                <Avatar
                  size="lg"
                  showBorder={true}
                  borderColor="yellow.400"
                  name="avatar"
                  src={obj.image}
                />
                <Box textAlign="center">
                  <Text fontWeight="bold" fontSize="md">
                    {obj.name}
                  </Text>
                  <Text fontWeight="medium" fontSize="xs" color="gray.400">
                    {obj.position}, {obj.company}
                  </Text>
                </Box>
              </Stack>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default Testimonials;
