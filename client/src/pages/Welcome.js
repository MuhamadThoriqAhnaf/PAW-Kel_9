import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import Navbar from "../components/navbar";
import Aos from "aos";
import "aos/dist/aos.css";
import ornamen from "../assets/ornamen.png";
import ornamen1 from "../assets/Vector.png";
import ornamen2 from "../assets/Frame.png";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import Sinopsis from "../components/sinopsis";
import Landingpage from "../components/landingpage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Booklist() {
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "covers/");
  const [refreshSignal, setRefreshSignal] = useState(false);
  const [ShowSinopsis, setShowSinopsis] = React.useState(false);
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  useEffect(() => {
    Aos.init({ duration: 2000 });
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
      <Navbar />
      <Landingpage />
      <ToastContainer />
      <section class="flex font-rubik md:px-20 px-5 mt-8 justify-between items-center" id="ListBuku">
        <h1 class="flex text-2xl mr-4">Koleksi Buku</h1>
        <input
          placeholder="Cari Buku..."
          class="placeholder:italic 
          placeholder:text-slate-400 block bg-white md:w-full w-200 border
           border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none
            focus:border-black focus:ring-black focus:ring-1 mt-2  sm:text-sm border-10 h-[34px] w-[120px] md:w-[300px]"
          onChange={handleChange}
        ></input>
      </section>
      {/* <section
        className="h-full lg:h-[100vh] py-[100px] lg:py-0 bg-putih items-center flex-col flex justify-center mx"
        name="how-it-works"
      ></section> */}
      <img
        src={ornamen}
        alt=""
        className="absolute z-0 -left-72 top-[1100px] w-1/4 max-w-[512px]"
      ></img>
      <img
        src={ornamen}
        alt=""
        className="absolute z-0 top-[110px] w-1/2 max-w-[200px]"
      ></img>
      <img
        src={ornamen1}
        alt=""
        className="absolute right-12 z-0 top-[110px] w-1/2 max-w-[100px]"
      ></img>
      <img
        src={ornamen2}
        alt=""
        className="absolute right-10 z-0 top-[110px] w-1/4 max-w-[100px]"
      ></img>
            <img
        src={ornamen1}
        alt=""
        className="absolute right-1 z-0 top-[1110px] w-1/2 max-w-[100px]"
      ></img>
            <img
        src={ornamen2}
        alt=""
        className="absolute right-1 z-0 top-[1100px] w-1/4 max-w-[100px]"
      ></img>
        <img
        src={ornamen1}
        alt=""
        className="absolute right-12 z-0 top-[1500px] w-1/2 max-w-[100px]"
      ></img>
      <hr class="mx-20 my-3 h-px bg-black border-0 z-1"></hr>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:mx-20 mx-2">
        {dataFiltered.map((data) => {
          return (
            <div
              class="bg-white border border-black p-2 rounded "
              data-aos=" fade-up"
              data-aos-duration="1000"
              data-aos-delay="5000"
            >
              <div class="relative transform transition duration-300 scale-100 hover:scale-105">
                {isPinjam(data.pinjam) ? (
                  <div class="absolute font-rubik text-sm bg-pink border border-black text-white top-2 left-2 px-4 py-1 shadow-md rounded-md">
                    Dipinjam
                  </div>
                ) : (
                  <div class="absolute font-rubik text-sm bg-green border border-black text-white top-2 left-2 px-4 py-1 shadow-md rounded-md">
                    Tersedia
                  </div>
                )}
                <img
                  src={data.imageurl}
                  class="aspect-[7/10] object-cover w-full rounded "
                />
              </div>
              <div class="font-rubik text-lg p-2">
                <p class="font-medium">{data.judul}</p>
                <p>{data.penulis}</p>
                <p>{data.terbit}</p>
              </div>
              <div class="flex items-center justify-between">
                <Sinopsis data={data} setRefreshSignal={setRefreshSignal} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
