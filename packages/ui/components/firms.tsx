import React, { useState } from "react";
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
  Button,
  Flex,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useCompanies, EnhancedFirmsQueryQuery } from "@/hooks/useCompanies";

type PartialFirm = Partial<
  Pick<
    EnhancedFirmsQueryQuery["newFirmCreateds"][number],
    "idDisplay" | "blockDate" | "creatorName" | "safeDisplay"
  >
> &
  Pick<
    EnhancedFirmsQueryQuery["newFirmCreateds"][number],
    "id" | "creator" | "safe" | "blockTimestamp"
  >;

function Firms() {
  const { data, isLoading } = useCompanies();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.newFirmCreateds
    .map((firm): PartialFirm => firm)
    .slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(
    (data?.newFirmCreateds?.length ?? 0) / rowsPerPage
  );

  const handleClickNext = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const handleClickPrev = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

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
              <Th textAlign="center">Id</Th>
              <Th textAlign="center">Creator</Th>
              <Th textAlign="center">Safe</Th>
              <Th textAlign="center">Created at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentRows?.map((firm) => (
              <Tr key={firm.id}>
                <Td textAlign="center">
                  <Tooltip label={firm.id} fontSize="md">
                    {firm.idDisplay}
                  </Tooltip>
                </Td>
                <Td textAlign="center">{firm.creatorName}</Td>
                <Td textAlign="center">
                  <Link
                    href={"https://goerli.etherscan.io/address/" + firm.safe}
                    isExternal
                  >
                    {firm.safeDisplay} <ExternalLinkIcon mx="2px" />
                  </Link>
                </Td>
                <Td textAlign="center">{firm.blockDate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Text my={4}>
          Showing {indexOfFirstRow + 1} to {indexOfLastRow} of{" "}
          {data?.newFirmCreateds?.length ?? 0} entries
        </Text>
        <Flex justifyContent="center">
          <Button
            disabled={currentPage === 1}
            onClick={handleClickPrev}
            my={4}
            mx={2}
          >
            Prev
          </Button>
          <Button
            disabled={currentPage === totalPages}
            onClick={handleClickNext}
            my={4}
            mx={2}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export default Firms;
