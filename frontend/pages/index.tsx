import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractEvents,
  useNFTs,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { contract } = useContract(
    "0x9aF1438B503fD194dC5736eC0A6fE63882555066"
  );

  const address = useAddress();
  const { data: nfts } = useOwnedNFTs(contract, address);

  useEffect(() => {
    if (nfts) console.log(nfts);
  }, [nfts]);

  return (
    <div className={styles.container}>
      <div className={styles.connect}>
        <ConnectWallet />
      </div>

      <Web3Button
        contractAddress="0x9aF1438B503fD194dC5736eC0A6fE63882555066"
        action={(contract) => contract.call("claim", address, 0, 1)}
      >
        Get a Challenger
      </Web3Button>
      

      {nfts?.map((nft, index) => (
        <div key={nft.metadata.id.toString()}>
          <ThirdwebNftMedia metadata={nft.metadata} />
          <h1>X {nft.supply}</h1>
          <Web3Button
            contractAddress="0x9aF1438B503fD194dC5736eC0A6fE63882555066"
            action={(contract) => contract.erc1155.burn(nft.metadata.id, 3)}
          >
            Kill the enemy
          </Web3Button>
        </div>
      ))}
    </div>
  );
};

export default Home;
