import provider from "@/util/ethersProvider";

const addressCache = new Map<string, string>();

export async function resolveENSName(address: string): Promise<string> {
  const cachedName = addressCache.get(address);
  if (cachedName) {
    return cachedName;
  }

  try {
    const name = (await provider.lookupAddress(address)) ?? "NOT FOUND";
    addressCache.set(address, name);
    return name;
  } catch (error) {
    console.error(`Failed to resolve ENS name for address: ${address}`, error);
    return "";
  }
}
