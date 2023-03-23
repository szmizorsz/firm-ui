import React, { useEffect } from "react";
import {
  FirmsQueryDocument,
  FirmsQueryQuery,
  execute,
  NewFirmCreated,
} from "../.graphclient";
import { resolveENSName } from "@/util/resolveENS";
import { truncateAddress } from "@/util/ethAddressUtil";

export type EnhancedFirmsQueryQuery = FirmsQueryQuery & {
  newFirmCreateds: Array<
    Pick<NewFirmCreated, "id" | "creator" | "safe" | "blockTimestamp"> & {
      idDisplay: string;
      blockDate: string;
      creatorName: string;
      safeDisplay: string;
    }
  >;
};

export function useCompanies() {
  const [data, setData] = React.useState<EnhancedFirmsQueryQuery>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    execute(FirmsQueryDocument, {}).then(async (result) => {
      const enhancedResult = result?.data as EnhancedFirmsQueryQuery;
      if (enhancedResult?.newFirmCreateds) {
        for (const firm of enhancedResult.newFirmCreateds) {
          const ensName = await resolveENSName(firm.creator);
          firm.creatorName =
            ensName === "NOT FOUND" ? truncateAddress(firm.creator) : ensName;
          firm.idDisplay = `${firm.id.substr(0, 6)}...${firm.id.substr(-8)}`;
          firm.blockDate = new Date(
            firm.blockTimestamp * 1000
          ).toLocaleString();
          firm.safeDisplay = truncateAddress(firm.safe);
        }
      }
      enhancedResult.newFirmCreateds.sort(
        (
          a: EnhancedFirmsQueryQuery["newFirmCreateds"][number],
          b: EnhancedFirmsQueryQuery["newFirmCreateds"][number]
        ) => {
          return b.blockTimestamp - a.blockTimestamp;
        }
      );
      setData(enhancedResult);
      setIsLoading(false);
    });
  }, [setData]);

  return { data, isLoading };
}
