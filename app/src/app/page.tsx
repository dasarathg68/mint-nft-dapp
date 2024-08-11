"use client";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect } from "react";

function App() {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  useEffect(() => {}, []);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-4 mt-20">
        {isConnected ? (
          <>
            <div className="flex flex-col gap-4 mb-4">
              <h2 className="text-2xl font-bold mb-2">Admin Actions</h2>
              <div className="flex flex-row gap-4">
                <button
                  className="btn btn-secondary btn-md min-w-32"
                  onClick={() => {
                    router.push("/admin");
                  }}
                >
                  Mint NFTs
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold mb-2">Member Actions</h2>
              <div className="flex flex-row gap-4">
                <button
                  className="btn btn-accent btn-md min-w-32"
                  onClick={() => {
                    router.push("/listNFTs");
                  }}
                >
                  View All NFTs
                </button>
                <button
                  className="btn btn-primary btn-md min-w-32"
                  onClick={() => {
                    router.push("/member");
                  }}
                >
                  View Member NFT
                </button>
              </div>
            </div>
          </>
        ) : (
          <div>
            <ConnectButton />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
