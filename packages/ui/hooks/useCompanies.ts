import React, { useEffect } from "react";
import { FirmsQueryDocument, FirmsQueryQuery, execute } from "../.graphclient";

export function useCompanies() {
  const [data, setData] = React.useState<FirmsQueryQuery>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    execute(FirmsQueryDocument, {}).then((result) => {
      setData(result?.data);
      setIsLoading(false);
    });
  }, [setData]);

  return { data, isLoading };
}
