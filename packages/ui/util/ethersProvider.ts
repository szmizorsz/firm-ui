import { ethers } from "ethers";

const provider = new ethers.AlchemyProvider(
  "mainnet",
  process.env.NEXT_PUBLIC_ALCHEMY_KEY
);

export default provider;
