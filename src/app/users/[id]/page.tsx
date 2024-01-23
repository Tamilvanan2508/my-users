"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import CustomLoader from "@/components/CustomLoader";

interface UserDetailsProps {
  params: { id: string };
}

interface UserDetails {
  login: string;
  name: string;
  location: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  followers: string;
  following: string;
  public_repos: string;
  public_gists: string;
}

const URL = "https://api.github.com/users";

const UserDetails: React.FC<UserDetailsProps> = ({ params }) => {
  const { id } = params || {};
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = useCallback(async () => {
    if (id) {
      setLoading(true);
      try {
        const response = await fetch(`${URL}/${id}`);
        const data = await response.json();
        setUserDetails(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="bg-purple-800 min-h-screen p-8">
      <div className="container mx-auto mt-8">
        {loading ? (
          <CustomLoader />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center">
            <Image
              src={userDetails?.avatar_url ?? "/default-avatar.png"}
              alt={userDetails?.avatar_url ?? "Default Avatar"}
              width={200}
              height={200}
              className="w-32 h-32 rounded-full mb-4 border-4 border-white shadow-md"
            />
            <h1 className="text-3xl font-bold text-gray-800">
              {userDetails?.name}
            </h1>
            <p className="text-gray-600">@{userDetails?.login}</p>
            {userDetails?.location && (
              <p className="text-gray-500">Location: {userDetails?.location}</p>
            )}
            <p className="mt-4 text-gray-700">{userDetails?.bio}</p>
            <p className="mt-2 text-gray-500">
              Followers: {userDetails?.followers} | Following:{" "}
              {userDetails?.following} | Repositories:{" "}
              {userDetails?.public_repos}
            </p>
            <p className="text-gray-500">Gists: {userDetails?.public_gists}</p>
            <div className="mt-4">
              <a
                href={userDetails?.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:underline"
              >
                Visit GitHub Profile
              </a>
            </div>
            <div className="flex flex-col items-center text-center mt-4">
              <a
                href="#"
                onClick={handleGoBack}
                className="text-purple-500 hover:underline flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
