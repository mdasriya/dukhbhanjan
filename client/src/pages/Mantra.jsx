import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
  Heading,
  Box,
} from "@chakra-ui/react";


const Mantra = () => {
  return (
    <>
      <Box>
        <Center>
          <Heading as="h3">Mantras for your Problems</Heading>
        </Center>
        <TableContainer>
          <Table
            variant="striped"
            colorScheme="yellow"
            size="sm"
            width="100%"
            overflowX="auto"
            position={"relative"}
            top={"3rem"}
          >
            <TableCaption>Mantras and their purposes</TableCaption>
            <Thead>
              <Tr>
                <Th width="5%" fontSize={17} bg={"#FEFCBF"}>
                  SrNo
                </Th>
                <Th width="40%" fontSize={17} bg={"#FEFCBF"}>
                  Mantra
                </Th>
                <Th width="25%" fontSize={17} bg={"#FEFCBF"}>
                  Purpose
                </Th>
                <Th width="30%" fontSize={17} bg={"#FEFCBF"}>
                  Ritual
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* {MantraData.map((mantra) => (
                <Tr key={mantra.id}>
                  <Td>{mantra.SrNo}</Td>
                  <Td>{mantra.mantra}</Td>
                  <Td>{mantra.purpose}</Td>
                  <Td>{mantra.ritual}</Td>
                </Tr>
              ))} */}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Mantra;