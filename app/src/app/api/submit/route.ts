import { NextResponse } from "next/server";
import {
  uploadToPinataFile,
  uploadToPinataJson,
} from "../../utils/UploadToPinata";

export async function POST(req: Request) {
  const date = new Date();
  const options: any = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const curr_date = date.toLocaleDateString("en-US", options);
  try {
    const data = await req.formData();
    const file = data.get("memberImage");
    if (!file) {
      return new Response("No file found", { status: 400 });
    }
    const ImageURI = await uploadToPinataFile(file as File);
    const NFTJSONObject = JSON.stringify({
      name: data.get("memberName"),
      description: "NFT Club Member",
      image: "https://gateway.pinata.cloud/ipfs/" + ImageURI,
      attributes: [
        {
          trait_type: "Role",
          value: data.get("memberRole"),
        },
        {
          trait_type: "Batch",
          value: data.get("memberBatch"),
        },
        {
          trait_type: "Issue Date",
          value: curr_date,
        },
      ],
    });
    const NFTUri = await uploadToPinataJson(NFTJSONObject);
    if (NFTUri === undefined) {
      return NextResponse.json({ ImageURI });
    }
    return NextResponse.json({ ImageURI, NFTUri });
  } catch (e) {
    console.error("hi", e);
  }
}
