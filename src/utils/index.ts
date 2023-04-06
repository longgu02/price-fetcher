import { ethers } from "ethers";
const PancakeFactoryBSC = require("../abis/PancakeFactoryBSC.json");
const CONTRACT_ADDRESS = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
const PROVIDER_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/";

const Web3 = require("web3");
const web3 = new Web3(PROVIDER_URL);

// export const getTokenBalance = (accountAddress: string) =>
//   contract.methods
//     .balanceOf(accountAddress)
//     .call((err: any, result: any) => result);

// export const getTokenSymbol = () =>
//   contract.methods.symbol().call((err: any, result: any) => result);

// export default contract;

export async function getPrice(address: string) {
  // const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const contract = new web3.eth.Contract(PancakeFactoryBSC, CONTRACT_ADDRESS);

  const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
  const PancakeSwapContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    PancakeFactoryBSC,
    provider
  );
  console.log("running...");
  console.log(contract);
  // const _promise = await PancakeSwapContract.getPair(
  //   "0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
  //   "0x55d398326f99059fF775485246999027B3197955"
  // );
  const _promise = await contract.methods.getPair(
    "0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
    "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
  ).call();
  // const _promise = await PancakeSwapContract.allPairsLength();
  console.log("running2...");
  return _promise;
}
