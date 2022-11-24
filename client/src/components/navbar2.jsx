import React from "react";
import axios from "axios";

const signout = async (id) => {
  await axios.post(`http://localhost:5000/api/auth/signout`)
  {
    localStorage.removeItem("accessToken");
  };
};

export default function Navbar2() {
  return (
    <div className="rounded-b-3xl flex px-[10px] md:px-[140px] md:py-[16px] items-center justify-between bg-[#D9E5D6] h-[80px]">
      <a href="/" class="flex">
        <img src="logo-black.svg " class="h-10 flex-auto"></img>
        <span class=" ml-2 mt-2 font-bold font-rubik text-xl flex-auto">
          MyLibrary
        </span>
      </a>
      <a href="/">
        <button
          type="button" 
          onClick={() => signout()}
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Logout
        </button>
      </a>
    </div>
  );
}
