"use client";
import { useAccount } from "wagmi";
import Members from "../components/Members";
import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { abi, address as contractAddress } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const listNFTs = () => {
  const [uri, setUri] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: tokenURIData } = useReadContract({
    abi,
    address: `0x${contractAddress}`,
    functionName: "getAllURIs",
    args: [],
  });

  useEffect(() => {
    if (tokenURIData) {
      setUri((tokenURIData as any).filter((uri: any) => uri));
    }
  }, [tokenURIData]);

  useEffect(() => {
    const fetchMetadata = async () => {
      setLoading(true);
      if (uri.length > 0) {
        try {
          const dataArray: any = [];
          for (const uriItem of uri) {
            const url = `https://gateway.pinata.cloud/ipfs/${uriItem}`;
            const response = await axios.get(url);
            dataArray.push(response.data);
          }
          setData(dataArray);
        } catch (error) {
          console.error("Error fetching metadata:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (uri.length > 0) {
      fetchMetadata();
    }
  }, [uri]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {!loading ? (
        <div className="mt-20 w-11/12 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            All NFT Holders
          </h2>
          <Members members={data} />
        </div>
      ) : (
        <span className="loading loading-infinity loading-lg"></span>
      )}

      <ToastContainer draggable position="top-center" />
    </div>
  );
};

export default listNFTs;
