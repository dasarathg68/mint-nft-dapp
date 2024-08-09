"use client";
import { useState, useEffect } from "react";
import { useWriteContract } from "wagmi";
import { abi, address as contractAddress } from "../../constants";
import { useReadContract, useAccount } from "wagmi";
import { isAddress } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const [isValid, setIsValid] = useState(true);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { address: currentAddress } = useAccount();
  const { data: ownerAddress, refetch: refetchOwner } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "owner",
    args: [],
  });

  const { writeContract, isSuccess, isError } = useWriteContract();
  const handleSubmit = async (event: any) => {
    setIsSubmitting(true);
    event.preventDefault();
    refetchOwner();
    if (ownerAddress !== currentAddress) {
      toast.error("You are not the owner of the contract");
      setIsSubmitting(false);
      return;
    }
    const formData = new FormData(event.target);
    if (
      !isValid ||
      !isFileUploaded ||
      !formData.get("memberName") ||
      !formData.get("memberRole") ||
      !formData.get("memberBatch") ||
      !formData.get("address")
    ) {
      toast.error("Invalid form data");
      setIsSubmitting(false);
      return;
    }

    toast.info("Uploading metadata to IPFS...");
    let result = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });
    result = await result.json();
    toast.info("Uploaded metadata to IPFS, now minting NFT...");
    await mintNFT((result as any).NFTUri, formData.get("address") as string);
    setIsSubmitting(false);
  };
  const mintNFT = async (uri: string, userAddress: string) => {
    try {
      writeContract({
        abi,
        address: contractAddress,
        functionName: "safeMint",
        args: [userAddress, uri],
      });
    } catch (e) {
      console.error(e);
    }
  };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file && file.size > 0) {
      setIsFileUploaded(true);
    } else {
      setIsFileUploaded(false);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("NFT minted successfully");
      setIsSubmitting(false);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      toast.error("Error minting NFT");
      setIsSubmitting(false);
    }
  }, [isError]);
  return (
    <>
      <div className=" card flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-3xl mt-20">Admin Panel</h1>

        <div className="flex justify-center items-center border">
          <form
            className="w-full max-w-md  rounded-lg shadow-md p-5"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="memberName"
              className="input input-bordered flex items-center gap-2"
            >
              Name:
              <input type="text" name="memberName" className="grow " />
            </label>
            <label htmlFor="memberImage" className="block font-medium mt-4">
              Image:
              <input
                type="file"
                onChange={handleFileInput}
                name="memberImage"
                className="file-input file-input-primary w-full max-w-xs mr-4 ml-4 p-2 "
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
            <label
              htmlFor="address"
              className="input input-bordered flex items-center gap-2 mt-4"
            >
              Address:
              <input
                type="text"
                name="address"
                className="grow"
                onInput={(e) => {
                  const inputValue = e.currentTarget.value.trim();
                  setIsValid(isAddress(inputValue));
                }}
              />
            </label>
            {isValid ? null : (
              <div className="text-red-800">Invalid address</div>
            )}
            {!isSubmitting ? (
              <button type="submit" className="btn btn-primary mt-4 w-full">
                Mint your NFT
              </button>
            ) : (
              <button className="btn btn-secondary mt-4 w-full">
                <span className="loading loading-spinner loading-sm text-white"></span>
              </button>
            )}
          </form>
        </div>
        <div className="text-center mt-4">{status}</div>
      </div>
      <ToastContainer draggable position="top-center" />
    </>
  );
};
export default Admin;
