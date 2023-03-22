export function truncateAddress(address: string, length: number = 6): string {
  if (address.length <= 2 + length * 2) {
    return address;
  }
  const start = address.slice(0, 2 + length);
  const end = address.slice(-length);
  return `${start}...${end}`;
}
