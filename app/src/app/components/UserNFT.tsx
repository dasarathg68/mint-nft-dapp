"use client";
import React from "react";
import { useRouter } from "next/navigation";

const UserNFT = ({ data }) => {
  const router = useRouter();
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-600 text-2xl">
        <div>No NFT found for this address</div>
        <button
          className="btn btn-secondary mt-4"
          onClick={() => {
            router.push("/admin");
          }}
        >
          Mint NFT
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md  rounded-lg shadow-lg border  ">
      <h2 className=" text-center text-2xl py-3 font-semibold">
        Your Membership NFT
      </h2>
      <div className="p-5 flex flex-col justify-center items-center">
        <img
          src={data.image}
          alt={data.name}
          className="w-1/2 h-3/4 border-b"
        />
        <div className="py-4">
          <p className="mt-2 mb-4 text-lg ">
            <strong>Name:</strong> {data.name}
          </p>
        </div>
        <div className="flex flex-col justify-between w-full">
          <div className="space-y-2">
            {data.attributes.map((attribute: any, attrIndex: number) => (
              <div
                key={attrIndex}
                className=" p-3 rounded-lg flex items-center justify-between btn btn-secondary"
              >
                <strong>{attribute.trait_type}:</strong> {attribute.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNFT;
