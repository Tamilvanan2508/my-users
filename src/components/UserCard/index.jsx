import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserCard = ({ user }) => {
  const router = useRouter();

  const handleNavigation = (userName) => {
    router.push(`/users/${userName}`);
  };

  return (
    <div className="p-1 flex flex-wrap items-center justify-center">
      <div className="flex-shrink-0 m-6 relative overflow-hidden bg-purple-500 rounded-lg max-w-xs shadow-lg">
        <svg
          className="absolute bottom-0 left-0 mb-8"
          viewBox="0 0 375 283"
          fill="none"
        >
          <rect
            x="159.52"
            y="175"
            width="152"
            height="152"
            rx="8"
            transform="rotate(-45 159.52 175)"
            fill="white"
          />
          <rect
            y="107.48"
            width="152"
            height="152"
            rx="8"
            transform="rotate(-45 0 107.48)"
            fill="white"
          />
        </svg>
        <div className="relative pt-10 px-10 flex items-center justify-center">
          <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"></div>
          <Image
            src={user?.avatar_url}
            alt={user?.avatar_url}
            placeholder="blur"
            blurDataURL={user?.avatar_url}
            quality="100"
            loading="lazy"
            width={150}
            height={150}
            className="max-w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="relative text-white px-6 pb-6 mt-6">
          <span className="block opacity-75 -mb-1">@{user?.login}</span>
          <div
            className="flex justify-between mt-3 cursor-pointer"
            onClick={() => handleNavigation(user?.login)}
          >
            <span className="block bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
              View more
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
