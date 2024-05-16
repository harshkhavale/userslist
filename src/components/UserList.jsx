import React from "react";
import placeholder from "../assets/placeholder.png";
const UserList = ({ users, onUserClick, selectedUser }) => {
  return (
    <ul className="list-none grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
      {users.map((user) => (
        <li
          key={user.id}
          className={`p-4 cursor-pointer flex items-center rounded-lg border ${
            selectedUser && selectedUser.id === user.id
              ? "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
          onClick={() => onUserClick(user)}
        >
          <img
            src={user.avatar || placeholder}
            alt={user.profile.username}
            className="w-12 h-12 rounded-full mr-4"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholder;
            }}
          />{" "}
          <div>
            <p className="font-semibold">{user.profile.username}</p>
            <p className="text-sm text-gray-600">
              {user.profile.firstName} {user.profile.lastName}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
