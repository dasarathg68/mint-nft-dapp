const PINATA_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMzliOWY4OC1kMjg3LTRhYmMtYmZiYS0yMmI4MmU4ODUzNzkiLCJlbWFpbCI6ImRhc2FyYXRoZzY4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI0ODJiNzUxNmZjMjI2YWZhYWE3NSIsInNjb3BlZEtleVNlY3JldCI6IjVhYWQwNDUyZThjNGM4MTBmYThlNGVjZTRmZTE3ZmU3Y2ZkZGQ2ZjQ4NjJjNjY0N2I5MzY1ZGZkNTZiNmY0NjgiLCJleHAiOjE3NTQzNjU5ODF9.1qr0B9TN0nOr-MxNX8iJaYlUzMbd_5goAW8UKr4bhms";
export const uploadToPinataJson = async (formData: any) => {
  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    }
  );
  const data = await response.json();
  const { IpfsHash } = data;
  const url = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
  return IpfsHash;
};
export const uploadToPinataFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("pinataMetadata", JSON.stringify({ name: "NFT image" }));
  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    }
  );
  const data = await response.json();
  const { IpfsHash } = data;
  const url = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
  return IpfsHash;
};
