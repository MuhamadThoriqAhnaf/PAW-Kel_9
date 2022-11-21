import React from "react";
import { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import Navbar from "../components/navbar";
import AddForm from "../components/add-form";
import UpdateForm from "../components/update-form";
import useFetch from "../hooks/useFetch";
import axios from "axios";

export default function AdminPage() {
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "covers/");
  const [refreshSignal, setRefreshSignal] = useState(false);

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

  const onDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/book/${id}`);
    setRefreshSignal((s) => !s);
  };

  return (
    <>
      <Navbar />
      <section class="flex font-rubik px-8 mt-8 justify-start items-center">
        <h1 class="text-2xl mr-4">Koleksi Buku</h1>
        <AddForm />
      </section>
      <hr class="mx-8 my-3 h-px bg-black border-0"></hr>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mx-8">
        {data.map((data) => {
          return (
            <div class="border border-black p-2 rounded">
              <img
                src={data.imageurl}
                class="aspect-[9/16] object-cover rounded object-cover"
              />
              <div class="font-rubik text-lg p-2">
                <p class="font-medium">{data.judul}</p>
                <p>{data.penulis}</p>
                <p>{data.terbit}</p>
              </div>
              <div class="flex items-center justify-between">
                <UpdateForm data={data} setRefreshSignal={setRefreshSignal} />
                <button
                  onClick={() => onDelete(data._id)}
                  class="bg-pink border border-black text-white font-rubik font-medium text-sm sm:text-md px-4 py-1 rounded hover:bg-black transition-colors focus:bg-white focus:text-black"
                >
                  Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
