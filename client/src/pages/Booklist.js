import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import useFetch from "../hooks/useFetch";
import axios from "axios";

export default function Booklist() {
  // const { data, loading, error } = useFetch("http://localhost:5000/api/book");
  // console.log(data)
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/book/getbook").then((response) => {
      setData(response.data.data);
      console.log(response.data.data);
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 gap-x-12 px-10 py-4">
        {data.map((data) => {
          return (
            <div className="border border-black w-full p-4">
              <h1>tanya sonia lanjutannya</h1>
              <h1>tanya sonia lanjutannya</h1>
              <h1>tanya sonia lanjutannya</h1>
              <h1>tanya sonia lanjutannya</h1>
              <h1>tanya sonia lanjutannya</h1>
              <h1>tanya sonia lanjutannya</h1>
              <h1>tanya sonia lanjutannya</h1>
              <h1>tanya sonia lanjutannya</h1>
              <h1>tanya sonia lanjutannya</h1>
              <h1>tanya sonia lanjutannya</h1>
              <h1>tanya sonia lanjutannya</h1>
              <h1>tanya sonia lanjutannya</h1>
              <h1>tanya sonia lanjutannya</h1>
              <h1>tanya sonia lanjutannya</h1>
              <p>{data.judul}</p>
              <p>{data.penulis}</p>
              <p>{data.terbit}</p>
              <div className="flex gap-4">
                <button className="bg-purple-500 py-2 px-3">Perbarui</button>
                <button className="bg-red-500 py-2 px-3">Hapus</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
