"use client";
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { abi, address as contractAddress } from "../../constants";
const Admin = () => {
  const [status, setStatus] = useState<string>("");
  const { writeContract } = useWriteContract();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setStatus("Uploading...");
    let result = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });
    result = await result.json();
    setStatus("Uploaded metadata to IPFS, now minting NFT...");
    await mintNFT((result as any).NFTUri, formData.get("address") as string);
    setStatus("NFT minted successfully");
  };
  const mintNFT = async (uri: string, userAddress: string) => {
    try {
      writeContract({
        abi,
        address: contractAddress,
        functionName: "safeMint",
        args: [userAddress, uri],
      });
      console.log("NFT minted successfully");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl mt-20">Admin Panel</h1>

        <div className="flex justify-center items-center border">
          <form
            className="w-full max-w-md  rounded-lg shadow-md p-5"
            onSubmit={handleSubmit}
          >
            <label htmlFor="memberName" className="block mt-4 font-medium">
              Name:
              <input
                type="text"
                name="memberName"
                className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
            <label htmlFor="memberImage" className="block font-medium mt-4">
              Image:
              <input
                type="file"
                name="memberImage"
                className="file-input  w-full max-w-xs mt-1 p-2 "
              />
            </label>
            <label htmlFor="memberRole" className="block font-medium mt-4">
              Role:
              <select
                name="memberRole"
                className="w-full mt-1 p-2 border  rounded focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
              >
                <option value="member">Admin</option>
                <option value="vice-president">Vice President</option>
                <option value="mentor">Mentor</option>
              </select>
            </label>
            <label htmlFor="memberBatch" className="block font-medium mt-4">
              Batch:
              <select
                name="memberBatch"
                className="w-full mt-1 p-2 border  rounded focus:outline-none focus:ring-2 focus:ring-blue-400  appearance-none"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </label>
            <label htmlFor="address" className="block font-medium mt-4">
              Address:
              <input
                type="text"
                name="address"
                className="w-full mt-1 p-2 border  rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
            <button
              type="submit"
              className="w-full py-2 px-4 mt-4 bg-blue-500 hover:bg-blue-600 rounded font-medium transition-colors duration-300"
            >
              Mint your NFT
            </button>
          </form>
        </div>
        <div className="text-center mt-4">{status}</div>
      </div>
    </>
  );
};
export default Admin;
