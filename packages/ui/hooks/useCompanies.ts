import React, { useEffect } from "react";
import {
  FirmsQueryDocument,
  FirmsQueryQuery,
  execute,
  NewFirmCreated,
} from "../.graphclient";

export type EnhancedFirmsQueryQuery = FirmsQueryQuery & {
  newFirmCreateds: Array<
    Pick<NewFirmCreated, "id" | "creator" | "safe" | "blockTimestamp"> & {
      idDisplay: string;
      blockDate: string;
    }
  >;
};

export function useCompanies() {
  const [data, setData] = React.useState<EnhancedFirmsQueryQuery>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    execute(FirmsQueryDocument, {}).then((result) => {
      const enhancedResult = result?.data as EnhancedFirmsQueryQuery;
      if (enhancedResult?.newFirmCreateds) {
        enhancedResult.newFirmCreateds = enhancedResult.newFirmCreateds.map(
          (firm) => ({
            ...firm,
            idDisplay: `${firm.id.substr(0, 6)}...${firm.id.substr(-8)}`,
            blockDate: new Date(firm.blockTimestamp * 1000).toLocaleString(),
          })
        );
      }
      enhancedResult.newFirmCreateds.sort(
        (
          a: EnhancedFirmsQueryQuery["newFirmCreateds"][number],
          b: EnhancedFirmsQueryQuery["newFirmCreateds"][number]
        ) => {
          return (
            new Date(b.blockDate).getTime() - new Date(a.blockDate).getTime()
          );
        }
      );
      setData(enhancedResult);
      debugger;
      setIsLoading(false);
    });
  }, [setData]);

  return { data, isLoading };
}
