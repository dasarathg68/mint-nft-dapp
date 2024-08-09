import React from "react";
interface MembersProps {
  members: any[];
}
const Members: React.FC<MembersProps> = ({ members }) => {
  if (!members || members.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4 text-lg">
        No data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-1/2 shadow-2xl">
      <table className="table w-full border-collapse shadow">
        {/* Table Head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Role</th>
            <th className="text-right p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index} className="border-b last:border-none ">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td className="p-2">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={member.image} alt={`${member.name}'s avatar`} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{member.name}</div>
                    <div className="text-sm opacity-50">{member.location}</div>
                  </div>
                </div>
              </td>
              <td className="p-2">
                <span className="badge badge-secondary badge-sm rounded-lg italic text-center">
                  {
                    member.attributes.find(
                      (attr: any) => attr.trait_type === "Role"
                    ).value
                  }
                </span>
              </td>
              <th className="p-2 text-right">
                <button className="btn btn-ghost btn-xs">
                  {member.description}
                </button>
              </th>
            </tr>
          ))}
        </tbody>
        {/* Table Footer */}
      </table>
    </div>
  );
};

export default Members;
