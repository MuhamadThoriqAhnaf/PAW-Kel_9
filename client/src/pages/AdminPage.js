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

export default function AdminPage() {
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "covers/");
  const [refreshSignal, setRefreshSignal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    var accessToken = localStorage.getItem("accessToken")
    if(accessToken==null){
      navigate("/login")
    }
  })

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

  useEffect(() => {
    axios.get("http://localhost:5000/api/book").then((response) => {
      setData(response.data.data);
      console.log("data", response.data.data);
    });
  }, [refreshSignal]);

  function isPinjam (pinjam) {
    if (pinjam != null) {
      return true;
    }
    else
      return false;
  }

  return (
    <>
      <Navbar2 />
      <section class="flex font-rubik px-20 mt-8 justify-start items-center">
        <h1 class="text-2xl mr-4">Koleksi Buku</h1>
        <AddForm
          refresh={() => {
            setRefreshSignal((s) => !s);
          }}
        />
      </section>
      <hr class="mx-20 my-3 h-px bg-black border-0"></hr>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mx-20">
        {data.map((data) => {
          return (
            <div class="border border-black p-2 rounded">
              <div class="relative">
                {isPinjam(data.pinjam) ? (
                  <div class="absolute font-rubik text-sm bg-pink border border-black text-white top-2 left-2 px-4 py-1 shadow-md rounded-md">Dipinjam</div>
                ) : (
                  <div class="absolute font-rubik text-sm bg-green border border-black text-white top-2 left-2 px-4 py-1 shadow-md rounded-md">Tersedia</div>
                )}
                <img
                  src={data.imageurl}
                  class="aspect-[9/16] h-96 w-full object-cover rounded"
                />
              </div>
              <div class="font-rubik text-lg p-2">
                <p class="font-medium">{data.judul}</p>
                <p>{data.penulis}</p>
                <p>{data.terbit}</p>
              </div>
              <div class="flex items-center justify-between">
                <UpdateForm data={data} setRefreshSignal={setRefreshSignal} />
                <DeleteForm data={data} setRefreshSignal={setRefreshSignal}/>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
