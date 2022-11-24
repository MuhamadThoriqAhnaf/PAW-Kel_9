import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import Navbar from "../components/navbar";
import Aos from "aos";
import "aos/dist/aos.css";
import ornamen from "../assets/ornamen.png"
import ornamen1 from "../assets/Vector.png"
import ornamen2 from "../assets/Frame.png"
import useFetch from "../hooks/useFetch";
import axios from "axios";

export default function Booklist() {
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "covers/");
  const [refreshSignal] = useState(false);

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
      return o.judul.toLowerCase().includes(e.target.value);
    });
    setDataFiltered(filterData);
  };

  return (
    <>
      <Navbar />

      <section class="flex font-rubik px-8 mt-8 justify-start items-center">
        <div class="flex">
          <h1 class="text-2xl mr-4">Koleksi Buku</h1>
          <input
            placeholder="Cari Buku..."
            className="placeholder:italic 
        placeholder:text-slate-400 block bg-white md:w-full w-200 border
         border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none
          focus:border-black focus:ring-black focus:ring-1 sm:text-sm border-10 h-[34px] md:w-[300px]"
            onChange={handleChange}
          ></input>
        </div>
      </section>
      <img src={ornamen} alt='' className='absolute z-0 -left-72 top-[1100px] w-1/4 max-w-[512px]'></img>
      <img src={ornamen} alt='' className='absolute z-0 top-[110px] w-1/2 max-w-[200px]'></img>
      <img src={ornamen1} alt='' className='absolute -right-2 z-0 top-[110px] w-1/2 max-w-[100px]'></img>
      <img src={ornamen2} alt='' className='absolute -right-2 z-0 top-[110px] w-1/4 max-w-[100px]'></img>


      <hr class="mx-8 my-3 h-px bg-black border-0 z-1"></hr>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 z-1 gap-4 mx-8" >
        {dataFiltered.map((data) => {
          return (
            <div class="border border-black z-10 p-2 rounded "data-aos=" fade-up" data-aos-duration="1000" data-aos-delay="5000" >
              <img
                src={data.imageurl}
                class="aspect-[9/16] h-96 w-full object-cover rounded z-10 " 
              />
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
