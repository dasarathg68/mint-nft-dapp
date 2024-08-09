"use client";

import React, { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { abi, address as contractAddress } from "../../constants";
import axios from "axios";
import UserNft from "../components/UserNFT";

const Page = () => {
  const { address } = useAccount();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: currUserUri, refetch: refetchUserURI } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getUserURI",
    args: [address],
  });

  useEffect(() => {
    refetchUserURI();
  }, []);

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
      } else {
        setLoading(false);
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
