import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import useFetch from "../hooks/useFetch";
import axios from "axios";

export default function Booklist() {
  // const { data, loading, error } = useFetch("http://localhost:5000/api/book");
  // console.log(data)
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/book").then((response) => {
      setData(response.data.data);
      console.log(response.data.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="md:my-[20px]">
        <a href="/login" className="px-[10px] md:px-[140px] ">
          Login
        </a>
      </div>
      <section class="flex font-rubik px-8 mt-8 justify-start items-center">
        <h1 class="text-2xl mr-4">Koleksi Buku</h1>
      </section>
      <hr class="mx-8 my-3 h-px bg-black border-0"></hr>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mx-8">
        {data.map((data) => {
          return (
            <div class="border border-black p-2 rounded">
              <img src={data.url} class="h-112 w-50 rounded object-cover" />
              <div class="font-rubik text-lg p-2">
                <p class="font-medium">{data.judul}</p>
                <p>{data.penulis}</p>
                <p>{data.terbit}</p>
              </div>
              <div class="flex items-center justify-between"></div>
            </div>
          );
        })}
      </div>
    </>
  );
}
