// UserProfile.js

import React, { useEffect, useState } from 'react';
import { Box, Avatar, Heading, Text, VStack, Center, Flex, SkeletonCircle, Skeleton } from '@chakra-ui/react';
import axios from 'axios';

const Profile = () => {
  const [profiledata, setProfileData] = useState({});
  const [isloading, setIsloading] = useState(true)
  useEffect(() => {
    setIsloading(true)
    axios
      .get("http://localhost:4000/user/profile", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => {
        //   console.log(res.data)
        setProfileData(res.data);
        setIsloading(false)
      });
  }, []);

  return (
    <>
    {
      isloading ? <Box padding='6' width="100%" maxW="800px" mx="auto" mt={10}  boxShadow='lg' bg='white'>
      <Center>
        <SkeletonCircle size='20' />
        </Center>
        <Center>
         <Skeleton height='20px' mt='4' width={240}/>
          </Center>
          <Center>
         <Skeleton height='10px' mt='4' width={240}/>
          </Center>
          <Center>
         <Skeleton height='20px' mt='4' width={240}/>
          </Center>
          <Center>
         <Skeleton height='20px' mt='4' width={240}/>
          </Center>
      
      </Box> :  <Box width="100%" maxW="800px" mx="auto" mt={10}>
      {profiledata && (
        <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}>
          <Center>
            <Avatar size="xl" name={`${profiledata.firstName} ${profiledata.lastName}`} src="https://bit.ly/broken-link" />
          </Center>
          <VStack mt={4} spacing={2} align="center">
            <Heading>{`${profiledata.firstName} ${profiledata.lastName}`}</Heading>
            <Text>@{`${profiledata.firstName}${profiledata.lastName}`}</Text>
            <Flex>
              <label>Email: </label>
              <Text>{" "}{profiledata.email}</Text>
            </Flex>
            <Text>Password: ******</Text>
            {/* Add more user details as needed */}
          </VStack>
        </Box>
      )}
    </Box>
    }
   
    </>
  );
};

export default Profile;
