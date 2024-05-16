import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import Pagination from "./components/Pagination";
import { CircularProgress } from "@mui/material";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://602e7c2c4410730017c50b9d.mockapi.io/users"
        );
        setUsers(response.data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter((user) =>
    user.profile.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 lg:px-40">
      <h1 className="text-4xl font-bold mb-8 text-center md:text-left ">
        USER'S-LIST
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-lg w-full md:w-1/3"
        />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <CircularProgress />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredUsers.length > 0 ? (
            <>
              <UserList
                users={currentUsers}
                onUserClick={handleUserClick}
                selectedUser={selectedUser}
              />
              <Pagination
                usersPerPage={usersPerPage}
                totalUsers={filteredUsers.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          ) : (
            <p>No data to show</p>
          )}
        </div>
        <div
          className={`w-full md:w-2/3 md:ml-4 ${
            selectedUser ? "block" : "hidden"
          } md:block`}
        >
          <UserDetails user={selectedUser} />
        </div>
      </div>
    </div>
  );
};

export default App;
