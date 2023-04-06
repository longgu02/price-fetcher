import { useState } from "react";
import "./App.css";
import { getPrice } from "./utils";
import detectEthereumProvider from "@metamask/detect-provider";
import Metamask from "./connectors/metamask";
import { useWeb3React } from "@web3-react/core";

function App() {
  const [input, setInput] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const connect = async () => {
    try {
      await activate(Metamask);
    } catch (exception) {
      console.log(exception);
    }
  };

  const connectMetamask = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      console.log("Ethereum successfully detected!");

      // From now on, this should always be true:
      // provider === window.ethereum

      // Access the decentralized web!

      // Legacy providers may only have ethereum.sendAsync
      // const chainId = await provider.request({
      //   method: "eth_chainId",
      // });
      // console.log(chainId);
    } else {
      // if the provider is not detected, detectEthereumProvider resolves to null
      console.error("Please install MetaMask!");
    }
  };

  const handleClick = async () => {
    connect();
    const wallet = new Metamask(null, false);
    await wallet.activate();
    // setPrice(await getPrice(input));
  };

  return (
    <div className="App">
      <input
        type={"text"}
        id="in-add"
        placeholder="0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
        style={{ width: "400px" }}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={() => handleClick()}>Get price</button>

      <div>
        <p>{price}</p>
      </div>
    </div>
  );
}

export default App;
