import React from "react";

export default function Navbar() {
  return (
    <div className="rounded-b-3xl flex px-10 md:px-20 md:py-[16px] items-center justify-between bg-tosca h-[80px]">
      <a class="flex">
        <img src="logo-black.svg " class="h-8 sm:h-9 md:h-10 flex-auto"></img>
        
        <span class="ml-2 mt-2 font-bold font-rubik text-md sm:text-lg md:text-xl flex-auto">
          MyLibrary
        </span>
      </a>
      
      <a href="/login">
        <button
          type="button"
          class="bg-green border border-black text-white font-medium text-xs sm:text-sm md:text-md font-rubik px-4 py-2 rounded hover:bg-black transition-colors"
        >
          Login
        </button>
      </a>
    </div>
  );
}
