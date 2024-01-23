"use client";
import React, { useCallback, useEffect, useState } from "react";
import CommonInput from "../components/CommonInput";
import CommonButton from "../components/CommonButton";
import CustomLoader from "../components/CustomLoader";
import UserCard from "../components/UserCard";
import CommonPagination from "../components/CommonPagination";
import { debounceFunction } from "../utils/debounce";

const URL = "https://api.github.com/users";
const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsersList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}`);
      const data = await response.json();
      setUserList(data);
      setFilteredUserList(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsersList();
  }, [fetchUsersList]);

  const onChange = (event: any) => {
    const { value } = event.target;
    setSearchValue(value);
    setLoading(true);
    debounceFunction(async () => {
      const filteredUsers = userList.filter((user) =>
        user.login.toLowerCase().includes(value.toLowerCase())
      );
      setCurrentPage(1);
      setFilteredUserList(filteredUsers);
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setCurrentPage(1);
    setSearchValue("");
    setFilteredUserList(userList);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    scrollTo(0, 0);
  };

  const getTotalPages = () =>
    Math.ceil(filteredUserList.length / ITEMS_PER_PAGE);

  const getPaginatedList = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredUserList.slice(startIndex, endIndex);
  };

  return (
    <div className="flex flex-col items-center justify-start p-5 min-h-screen">
      <div className="w-full">
        <CommonInput
          name="search"
          placeHolder="Search for users"
          value={searchValue}
          onChange={onChange}
        />
        <div className="flex justify-center mt-3">
          <CommonButton label="Reset" onClick={handleReset} />
        </div>
        <div className="flex flex-col items-center w-full mt-4">
          {loading ? (
            <CustomLoader />
          ) : (
            <>
              {filteredUserList.length > 0 ? (
                <div className="flex flex-wrap justify-center">
                  {getPaginatedList().map((item, index) => (
                    <UserCard key={index} user={item} />
                  ))}
                </div>
              ) : (
                <p
                  className={`text-center text-lg text-gray-600 mt-4 ${
                    searchValue.length > 0 ? "" : "hidden"
                  } `}
                >
                  No data found 😟
                </p>
              )}
              {filteredUserList.length > ITEMS_PER_PAGE && (
                <CommonPagination
                  currentPage={currentPage}
                  totalPages={getTotalPages()}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
