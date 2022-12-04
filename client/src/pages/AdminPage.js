import React from "react";
import { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import Navbar from "../components/navbar";
import AddForm from "../components/add-form";
import UpdateForm from "../components/update-form";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import Navbar2 from "../components/navbar2";
import DeleteForm from "../components/delete-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPage() {
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "covers/");
  const [refreshSignal, setRefreshSignal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    var accessToken = localStorage.getItem("accessToken");
    if (accessToken == null) {
      navigate("/login");
    }
  });

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/book").then((response) => {
      setData(response.data.data);
      setDataFiltered(response.data.data);
      console.log("data", response.data.data);
    });
  }, [refreshSignal]);

  const handleChange = (e) => {
    const filterData = data.filter((o) => {
      return o.judul.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setDataFiltered(filterData);
  };

  function isPinjam(pinjam) {
    if (pinjam != null) {
      return true;
    } else return false;
  }

  return (
    <>
      <Navbar2 />
      <ToastContainer />
      <section class="flex font-rubik md:px-20 px-5 mt-8 justify-between items-center">
        <div class="flex">
          <h1 class="text-lg mr-4">Koleksi Buku</h1>
          <AddForm
            refresh={() => {
              setRefreshSignal((s) => !s);
            }}
          />
        </div>
        <input
          placeholder="Cari Buku..."
          className="placeholder:italic 
        placeholder:text-slate-400 block bg-white md:w-full w-200 border
         border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none
          focus:border-black focus:ring-black focus:ring-1 sm:text-sm border-10 h-[34px] w-[120px] md:w-[300px]"
          onChange={handleChange}
        ></input>
      </section>
      <hr class="mx-20 my-3 h-px bg-black border-0"></hr>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:mx-20 mx-2 ">
        {dataFiltered.map((data) => {
          return (
            <div class="border border-black p-2 rounded">
              <div class="relative transform transition duration-300 scale-100 hover:scale-105">
                {isPinjam(data.pinjam) ? (
                  <div class="absolute font-rubik text-xs bg-pink border border-black text-white top-2 left-2 px-4 py-1 shadow-md rounded-md">
                    Dipinjam
                  </div>
                ) : (
                  <div class="absolute font-rubik text-xs bg-green border border-black text-white top-2 left-2 px-4 py-1 shadow-md rounded-md">
                    Tersedia
                  </div>
                )}
                <img
                  src={data.imageurl}
                  class="aspect-[7/10] w-full object-cover rounded"
                />
              </div>
              <div class="font-rubik text-md p-2">
                <p class="font-medium">{data.judul}</p>
                <p>{data.penulis}</p>
                <p>{data.terbit}</p>
              </div>
              <div class="flex items-end justify-between">
                <UpdateForm data={data} setRefreshSignal={setRefreshSignal} />
                <DeleteForm data={data} setRefreshSignal={setRefreshSignal} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
