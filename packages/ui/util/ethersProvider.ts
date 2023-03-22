import { ethers } from "ethers";

const provider = new ethers.providers.AlchemyProvider(
  "mainnet",
  process.env.NEXT_PUBLIC_ALCHEMY_KEY
);

export default provider;
