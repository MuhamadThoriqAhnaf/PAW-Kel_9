import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddForm from "../components/add-form";
import UpdateForm from "../components/update-form";
import Navbar2 from "../components/navbar2";
import DeleteForm from "../components/delete-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function AdminPage() {
  const [refreshSignal, setRefreshSignal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    var accessToken = localStorage.getItem("accessToken");
    if (accessToken == null) {
      navigate("/login");
    }
  });

  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [search, setSearch] = useState();
  const [showUpdate, setShowUpdate] = React.useState(false);

  const bookDipinjam = data.filter((o) => {
    return o.pinjam != null;
  });
  const bookTersedia = data.filter((o) => {
    return o.pinjam == null;
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/book").then((response) => {
      setData(response.data.data);
      console.log("data", response.data.data);
    });
  }, [refreshSignal]);

  useEffect(() => {
    if (!search) {
      setDataFiltered(data);
      return;
    }

    const filterData = data.filter((o) => {
      return o.judul.toLowerCase().includes(search);
    });
    setDataFiltered(filterData);
  }, [data, search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
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
      <section class="grid grid-col-1 md:flex md:justify-between gap-2 place-content-between font-rubik md:px-20 px-5 mt-8  items-center">
        <div class="flex">
          <h1 class="text-md sm:text-lg mr-4">Koleksi Buku</h1>

          <AddForm setRefreshSignal={setRefreshSignal}/>
        </div>

        <div class="flex justify-end gap-2 text-xs md:text-sm">
          <div class="flex font-rubik gap-2 justify-end items-center">
            <button
              type="button"
              autoFocus
              id="radio-tersedia"
              class="flex items-baseline border focus:bg-black focus:text-white rounded-md gap-1 p-2 text-black"
              onClick={() => setDataFiltered(data)}
            >
              {data.length}
              <span class="hidden md:block text-xs"> semua</span>
            </button>

            <button
              type="button"
              id="radio-tersedia"
              class="flex items-baseline border focus:bg-green focus:text-white rounded-md gap-1 p-2 text-green"
              onClick={() => setDataFiltered(bookTersedia)}
            >
              {bookTersedia.length}
              <span class="hidden md:block text-xs"> tersedia</span>
            </button>

            <button
              type="button"
              id="radio-tersedia"
              class="flex items-baseline border focus:bg-pink focus:text-white rounded-md gap-1 p-2 text-pink"
              onClick={() => setDataFiltered(bookDipinjam)}
            >
              {bookDipinjam.length}
              <span class="hidden md:block text-xs"> dipinjam</span>
            </button>
          </div>

          <input
            placeholder="Cari Buku..."
            className="placeholder:italic 
          placeholder:text-slate-400 block bg-white md:w-full w-200 border
            rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none
          focus:border-black focus:ring-black focus:ring-1 sm:text-sm border-10 w-full"
            onChange={handleChange}
          ></input>
        </div>
      </section>

      <hr class="mx-2 md:mx-20 my-2 h-px bg-black border-0"></hr>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:mx-20 mx-2">
        {dataFiltered.map((dataLutfi) => {
          return (
            <div class="border border-black p-2 rounded grid grid-col-2 ">
              <div class="relative transform transition duration-300 scale-100 hover:scale-105">
                {isPinjam(dataLutfi.pinjam) ? (
                  <div class="absolute font-rubik text-xs bg-pink border border-black text-white top-2 left-2 px-4 py-1 shadow-md rounded-md">
                    Dipinjam
                  </div>
                ) : (
                  <div class="absolute font-rubik text-xs bg-green border border-black text-white top-2 left-2 px-4 py-1 shadow-md rounded-md">
                    Tersedia
                  </div>
                )}
                <img
                  src={dataLutfi.imageurl}
                  class="aspect-[7/10] w-full object-cover rounded"
                />

                <div class="font-rubik text-xs sm:text-sm md:text-md p-2">
                  <p class="font-medium">{dataLutfi.judul}</p>
                  <p>{dataLutfi.penulis}</p>
                  <p>{dataLutfi.terbit}</p>
                </div>
              </div>

              <div class="flex items-end justify-between">
                <button
                  className="bg-purple border border-black text-white font-rubik font-medium text-xs sm:text-sm md:text-md  md:px-4 px-2 py-1 rounded hover:bg-black transition-colors focus:bg-white focus:text-black"
                  type="button"
                  onClick={() => setShowUpdate(dataLutfi)}
                >
                  Perbarui
                </button>
                <DeleteForm
                  data={dataLutfi}
                  setRefreshSignal={setRefreshSignal}
                />
              </div>
            </div>
          );
        })}
        <UpdateForm
          setRefreshSignal={setRefreshSignal}
          {...{ showUpdate, setShowUpdate }}
        />
      </div>
    </>
  );
}
