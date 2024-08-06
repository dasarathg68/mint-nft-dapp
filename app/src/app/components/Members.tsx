import React from "react";

const Members = ({ members }) => {
  if (!members || members.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4 text-lg">
        No data available
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        All NFT Holders
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-2 bg-gray-700">S. No.</th>
            <th className="text-left p-2 bg-gray-700">Name</th>
            <th className="text-left p-2 bg-gray-700">Role</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index} className="border-b last:border-none">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{member.name}</td>
              <td className="p-2 italic text-center">
                {
                  member.attributes.find((attr) => attr.trait_type === "Role")
                    .value
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Members;
