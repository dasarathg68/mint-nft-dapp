"use client";
import { useAccount } from "wagmi";
import Members from "../components/Members";
import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { abi, address as contractAddress } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useChainId } from "wagmi";
import { chain } from "@/constants";
import { useSwitchChain } from "wagmi";
const listNFTs = () => {
  const [uri, setUri] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wrongChain, setWrongChain] = useState(false);
  const { switchChain, status } = useSwitchChain();

  const chainId = useChainId();

  const { data: tokenURIData } = useReadContract({
    abi,
    address: `0x${contractAddress}`,
    functionName: "getAllURIs",
    args: [],
  });
  useEffect(() => {
    if (chainId != Number(chain)) {
      toast.error(`Please switch chain with ID: ${chain} to use this app`);
      setLoading(false);
      setWrongChain(true);
    }
  }, []);
  useEffect(() => {
    if (status === "success") window.location.reload();
  }, [status]);
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
      {!loading && !wrongChain ? (
        <div className="mt-20 w-11/12 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            All NFT Holders
          </h2>
          <Members members={data} />
        </div>
      ) : !wrongChain && loading ? (
        <span className="loading loading-infinity loading-lg"></span>
      ) : null}

      {wrongChain && (
        <div className="mt-20 w-11/12 flex flex-col justify-center items-center">
          <button
            className="btn btn-accent mt-4"
            onClick={() => {
              switchChain({
                chainId: Number(chain) as 1 | 11155111 | 8453 | 204 | 10,
              });
            }}
          >
            Switch to correct chain
          </button>
        </div>
      )}
      <ToastContainer draggable position="top-center" />
    </div>
  );
};

export default listNFTs;
