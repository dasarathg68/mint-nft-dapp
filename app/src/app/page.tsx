"use client";
import { useRouter } from "next/navigation";

function App() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-row gap-4 mt-20">
        <button
          className="btn btn-primary btn-md min-w-32"
          onClick={() => {
            router.push("/member");
          }}
        >
          View Member NFT
        </button>
        <button
          className="btn btn-secondary btn-md min-w-32"
          onClick={() => {
            router.push("/admin");
          }}
        >
          Mint NFTs
        </button>
        <button
          className="btn btn-accent btn-md min-w-32"
          onClick={() => {
            router.push("/listNFTs");
          }}
        >
          View All NFTs
        </button>
      </div>
    </div>
  );
}

export default App;
