"use client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import CommonInput from "../components/CommonInput";
import CommonButton from "../components/CommonButton";
import CustomLoader from "../components/CustomLoader";
import UserCard from "../components/UserCard";
import CommonPagination from "../components/CommonPagination";
import { debounceFunction } from "../utils/debounce";
import { getUsersList } from "@/app/action";

interface User {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  html_url: string;
  repos_url: string;
}

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [userList, setUserList] = useState<User[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsersList = useCallback(async () => {
    setLoading(true);
    const data = await getUsersList();
    setUserList(data);
    setFilteredUserList(data);
    setLoading(false);
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

  const getTotalPages = useMemo(
    () => Math.ceil(filteredUserList.length / ITEMS_PER_PAGE),
    [filteredUserList.length]
  );

  const getPaginatedList = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredUserList.slice(startIndex, endIndex);
  }, [currentPage, filteredUserList]);

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
                  {getPaginatedList.map((item, index) => (
                    <UserCard key={index} user={item} />
                  ))}
                </div>
              ) : (
                <p
                  className={`text-center text-lg text-purple-600 mt-4 ${
                    searchValue.length > 0 ? "" : "hidden"
                  } `}
                >
                  No data found 😟
                </p>
              )}
              {filteredUserList.length > ITEMS_PER_PAGE && (
                <CommonPagination
                  currentPage={currentPage}
                  totalPages={getTotalPages}
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
