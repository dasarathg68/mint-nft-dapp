"use client";

import React, { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { abi, address as contractAddress } from "../../constants";
import axios from "axios";
import UserNft from "../components/UserNFT";

const Page = () => {
  const { address } = useAccount();
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState("");
  const [uri, setUri] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: tokenURIData, refetch: refetchTokenURIs } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getAllURIs",
    args: [],
  });

  const { data: currUserUri, refetch: refetchUserURI } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getUserURI",
    args: [address],
  });

  useEffect(() => {
    refetchTokenURIs();
    refetchUserURI();
  }, []);

  // Set URI when tokenURIData changes
  useEffect(() => {
    if (tokenURIData) {
      setUri(tokenURIData.filter((uri: any) => uri));
    }
  }, [tokenURIData]);

  // Fetch metadata when URI changes
  useEffect(() => {
    const fetchMetadata = async () => {
      if (uri.length > 0) {
        try {
          setLoading(true);
          const dataArray = [];
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

  // Fetch user-specific metadata when currUserUri changes
  useEffect(() => {
    const fetchUserMetadata = async () => {
      if (currUserUri) {
        try {
          setLoading(true);
          const url = `https://gateway.pinata.cloud/ipfs/${currUserUri}`;
          const response = await axios.get(url);
          setUserData(response.data);
          console.log("User data:", response.data);
        } catch (error) {
          console.error("Error fetching user metadata:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserMetadata();
  }, [currUserUri]);

  return !loading ? (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="mt-20">
        <UserNft data={userData} />
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <span className="loading loading-infinity loading-lg mt-20"></span>
    </div>
  );
};

export default Page;
