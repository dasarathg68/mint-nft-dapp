"use client";
import "../css/Admin.css";
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
      <div className="admin-page">
        <form className="admin-form" onSubmit={handleSubmit}>
          <label htmlFor="memberName" className="admin-label">
            Name:
            <input type="text" name="memberName" className="admin-input" />
          </label>
          <label htmlFor="memberImage" className="admin-label">
            Image:
            <input type="file" name="memberImage" className="admin-input" />
          </label>
          <label htmlFor="memberRole" className="admin-label">
            Role:
            <select name="memberRole" className="admin-input">
              <option value="member">Admin</option>
              <option value="vice-president">Vice President</option>
              <option value="mentor">Mentor</option>
            </select>
          </label>
          <label htmlFor="memberBatch" className="admin-label">
            Role:
            <select name="memberBatch" className="admin-input">
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </label>
          <label htmlFor="address" className="admin-label">
            Address:
            <input type="text" name="address" className="admin-input" />
          </label>
          <button type="submit" className="admin-button">
            Mint your NFT
          </button>
        </form>
      </div>
      <div className="status">{status}</div>
    </>
  );
};
export default Admin;
