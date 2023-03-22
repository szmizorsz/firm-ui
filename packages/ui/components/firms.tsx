import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Spinner } from "@chakra-ui/react";
import { useCompanies } from "@/hooks/useCompanies";

function Firms() {
  const { data, isLoading } = useCompanies();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Creator</Th>
              <Th>Safe</Th>
              <Th>Block Number</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.newFirmCreateds.map((firm) => (
              <Tr key={firm.id}>
                <Td>{firm.id}</Td>
                <Td>{firm.creator}</Td>
                <Td>{firm.safe}</Td>
                <Td>{firm.blockNumber}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
}

export default Firms;
