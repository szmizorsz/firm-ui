import React, { useState, useEffect } from "react";
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
  Checkbox,
  Box,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useCompanies, EnhancedFirmsQueryQuery } from "@/hooks/useCompanies";
import { useAccount } from "wagmi";
import CreateFirm from "./createFirm";

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
  const { address, isConnected } = useAccount();
  const { data, isLoading } = useCompanies();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showMyCompanies, setShowMyCompanies] = useState(false);

  const handleMyCompaniesChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowMyCompanies(e.target.checked);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const [filteredFirms, setFilteredFirms] = useState<PartialFirm[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (data) {
      const newFilteredFirms = data.newFirmCreateds
        .map((firm): PartialFirm => firm)
        .filter((firm) => {
          return (
            !showMyCompanies ||
            (isConnected &&
              address &&
              firm.creator.toLowerCase() === address.toLowerCase())
          );
        });

      setFilteredFirms(newFilteredFirms);
    }
  }, [data, showMyCompanies, isConnected, address]);

  useEffect(() => {
    setCurrentPage(1);
  }, [showMyCompanies]);

  if (!filteredFirms) {
    return (
      <Box minHeight="800px">
        <Spinner />
      </Box>
    );
  }

  const currentRows = filteredFirms.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil((filteredFirms.length ?? 0) / rowsPerPage);

  const handleClickNext = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const handleClickPrev = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="2xl">Internet-native companies</Text>
        {isConnected && (
          <Box>
            <Checkbox
              onChange={handleMyCompaniesChange}
              isChecked={showMyCompanies}
            >
              My Companies
            </Checkbox>
          </Box>
        )}
      </Flex>
      {isLoading ? (
        <Box minHeight="772px">
          <Spinner />
        </Box>
      ) : (
        <Box minHeight="572px">
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
        </Box>
      )}
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Flex flexDirection="column" width="100%" mb={4}>
          <Flex alignSelf="flex-start">
            <Box mt="6">
              <CreateFirm />
            </Box>
          </Flex>
          <Flex alignSelf="center">
            <Text>
              Showing {indexOfFirstRow + 1} to {indexOfLastRow} of{" "}
              {data?.newFirmCreateds?.length ?? 0} entries
            </Text>
          </Flex>
        </Flex>
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
