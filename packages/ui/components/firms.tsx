import React, { useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Spinner } from "@chakra-ui/react";
// ...
// we import types and typed-graphql document from the generated code (`..graphclient/`)
import { FirmsQueryDocument, FirmsQueryQuery, execute } from "../.graphclient";

function Firms() {
  const [data, setData] = React.useState<FirmsQueryQuery>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    execute(FirmsQueryDocument, {}).then((result) => {
      setData(result?.data);
      setIsLoading(false);
    });
  }, [setData]);
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
