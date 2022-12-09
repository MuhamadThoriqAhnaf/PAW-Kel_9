import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import ornamen from "../assets/ornamen.png"
import ornamen1 from "../assets/Vector.png"
import ornamen2 from "../assets/Frame.png"
import Sinopsis from "../components/sinopsis";
import Landingpage from "../components/landingpage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import axios from "axios";

export default function Booklist() {
  const [refreshSignal, setRefreshSignal] = useState(false);

  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);

  const bookDipinjam = data.filter((o) => {return o.pinjam != null});
  const bookTersedia = data.filter((o) => {return o.pinjam == null});

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

  function isPinjam (pinjam) {
    if (pinjam != null) {
      return true;
    }
    else
      return false;
  }

  return (
    <>
      <Navbar />
      <Landingpage/>
      <ToastContainer />
      <section id="ListBuku" class="grid grid-col-1 md:flex md:justify-between gap-2 place-content-between font-rubik md:px-20 px-5 mt-8 items-center">
        <h1 class="text-md sm:text-lg mt-4 mr-4">Koleksi Buku</h1>
        
        <div class="flex justify-end gap-2 text-xs md:text-sm z-10">
          <div class="flex font-rubik gap-2 justify-end items-center">
            <button type="button" autoFocus id="radio-tersedia" class="flex items-baseline border focus:bg-black focus:text-white rounded-md gap-1 p-2 text-black" onClick={() => setDataFiltered(data)}>
                {data.length}
                <span class="hidden md:block text-xs"> semua</span>
            </button>

            <button type="button" id="radio-tersedia" class="flex items-baseline border focus:bg-green focus:text-white rounded-md gap-1 p-2 text-green" onClick={() => setDataFiltered(bookTersedia)}>
                {bookTersedia.length}
                <span class="hidden md:block text-xs"> tersedia</span>
            </button>

            <button type="button" id="radio-tersedia" class="flex items-baseline border focus:bg-pink focus:text-white rounded-md gap-1 p-2 text-pink" onClick={() => setDataFiltered(bookDipinjam)}>
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

      <img src={ornamen} alt='' className='absolute z-0 -left-72 top-[1100px] w-1/4 max-w-[512px]'></img>
      <img src={ornamen} alt='' className='absolute z-0 top-[110px] w-1/2 max-w-[200px]'></img>
      <img src={ornamen1} alt='' className='absolute right-12 z-0 top-[110px] w-1/2 max-w-[100px]'></img>
      <img src={ornamen2} alt='' className='absolute right-10 z-0 top-[110px] w-1/4 max-w-[100px]'></img>

      <hr class="mx-20 my-3 h-px bg-black border-0 z-1"></hr>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:mx-20 mx-2">
        {dataFiltered.map((data) => {
          return (          
            <div class="bg-white border border-black p-2 rounded "data-aos=" fade-up" data-aos-duration="1000" data-aos-delay="5000" >
              <div class="relative transform transition duration-300 scale-100 hover:scale-105">
                {isPinjam(data.pinjam) ? (
                  <div class="absolute font-rubik text-sm bg-pink border border-black text-white top-2 left-2 px-4 py-1 shadow-md rounded-md">Dipinjam</div>
                ) : (
                  <div class="absolute font-rubik text-sm bg-green border border-black text-white top-2 left-2 px-4 py-1 shadow-md rounded-md">Tersedia</div>
                )}
                <img
                  src={data.imageurl}
                  class="aspect-[7/10] object-cover w-full rounded"
                />
              </div>
              <div class="font-rubik text-xs sm:text-sm md:text-md p-2">
                <p class="font-medium">{data.judul}</p>
                <p>{data.penulis}</p>
                <p>{data.terbit}</p>
              </div>
              <div class="flex items-center justify-between">
                <Sinopsis data={data} setRefreshSignal={setRefreshSignal}/>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
