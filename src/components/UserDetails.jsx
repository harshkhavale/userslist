import React from "react";
import placeholder from "../assets/placeholder.png";

const UserDetails = ({ user }) => {
  if (!user) {
    return <p className="text-xl">Select a user to view details</p>;
  }

  const {
    avatar,
    Bio,
    jobTitle,
    profile: { username, firstName, lastName, email },
  } = user;

  return (
    <div className="bg-white rounded-lg shadow p-6 md:p-8 mt-4 md:mt-0">
      <div className="flex flex-col items-center md:items-start mb-4">
        <img
          src={avatar}
          alt={username}
          className="w-24 h-24 rounded-full mb-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholder;
          }}
        />
        <h2 className="text-2xl font-bold">{`${firstName} ${lastName}`}</h2>
        <p className="text-sm text-gray-600">{jobTitle}</p>
      </div>
      <div className="space-y-2">
        <p>
          <strong>Username:</strong> {username}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Bio:</strong> {Bio}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
