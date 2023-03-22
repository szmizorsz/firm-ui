import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useCompanies, EnhancedFirmsQueryQuery } from "@/hooks/useCompanies";

function Firms() {
  const { data, isLoading } = useCompanies();

  return (
    <>
      <Text fontSize="2xl" mb={4}>
        Internet-native companies
      </Text>
      {isLoading ? (
        <Spinner />
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Creator</Th>
              <Th>Safe</Th>
              <Th>Created at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.newFirmCreateds.map(
              (firm: EnhancedFirmsQueryQuery["newFirmCreateds"][number]) => (
                <Tr key={firm.id}>
                  <Td>
                    <Tooltip label={firm.id} fontSize="md">
                      {firm.idDisplay}
                    </Tooltip>
                  </Td>
                  <Td>{firm.creatorName}</Td>
                  <Td>{firm.safe}</Td>
                  <Td>{firm.blockDate}</Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      )}
    </>
  );
}

export default Firms;
