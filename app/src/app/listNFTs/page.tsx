"use client";
import { useAccount } from "wagmi";
import Members from "../components/Members";
import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { abi, address as contractAddress } from "../../constants";
import axios from "axios";

const listNFTs = () => {
  const { address } = useAccount();
  const [uri, setUri] = useState([]);
  const [data, setData] = useState([]);

  const { data: tokenURIData } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getAllURIs",
    args: [],
  });
  useEffect(() => {
    if (tokenURIData) {
      setUri(tokenURIData.filter((uri: any) => uri));
    }
  }, [tokenURIData]);
  useEffect(() => {
    const fetchMetadata = async () => {
      if (uri.length > 0) {
        try {
          const dataArray = [];
          for (const uriItem of uri) {
            const url = `https://gateway.pinata.cloud/ipfs/${uriItem}`;
            const response = await axios.get(url);
            dataArray.push(response.data);
          }
          setData(dataArray);
        } catch (error) {
          console.error("Error fetching metadata:", error);
        }
      }
    };
    fetchMetadata();
  });
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="mt-20">
        <Members members={data} />
      </div>
    </div>
  );
};

export default listNFTs;
