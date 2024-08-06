import React from "react";

const UserNFT = ({ data }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-600 text-xl">
        No Data Available
      </div>
    );
  }

  return (
    <div className="max-w-md  rounded-lg shadow-lg border ">
      <h2 className=" text-center text-2xl py-3 font-semibold">
        Your Membership NFT
      </h2>
      <div className="p-5">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-auto border-b"
        />
        <div className="py-4">
          <p className="mt-2 mb-4 text-lg text-gray-700">
            <strong>Name:</strong> {data.name}
          </p>
          <ul className="space-y-2">
            {data.attributes.map((attribute: any, attrIndex: number) => (
              <li
                key={attrIndex}
                className="bg-gray-100 p-3 rounded-lg flex items-center justify-between"
              >
                <strong className="text-blue-600">
                  {attribute.trait_type}:
                </strong>{" "}
                {attribute.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserNFT;
