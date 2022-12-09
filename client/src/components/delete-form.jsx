import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "flowbite";
import axios from "axios";

export default function DeleteForm({ data: initialData, setRefreshSignal, }) {
  useEffect(() => {
    setJudul(initialData?.judul)
    setPenulis(initialData?.penulis)
})

  const [judul, setJudul] = useState(initialData?.judul);
  const [penulis, setPenulis] = useState(initialData?.penulis);

  const [showUpdate, setShowUpdate] = React.useState(false);
  
  const data = {
    judul: judul,
    penulis: penulis,
  };

  async function Delete(e) {
    e.preventDefault();
    const res = await axios.delete(
      `http://localhost:5000/api/book/${initialData._id}`
    );
    setRefreshSignal((s) => !s);
    console.log(res);
    
    toast.success("Berhasil menghapus buku!");
    setShowUpdate(false).then(window.location.reload(true));
  }
  
  return (
    <div>
      <button
        className="text-pink font-rubik font-medium text-xs sm:text-sm md:text-md md:px-4 px-0 py-1 rounded hover:bg-pink hover:text-white hover:border hover:border-black transition-colors focus:bg-white focus:text-black"
        type="button"
        onClick={() => setShowUpdate(true)}
      >
        {" "}
        Delete
      </button>
      {showUpdate ? (
        <>
          <div class="justify-center font-rubik items-center flex fixed inset-0 z-50">
            <div class="text-xs sm:text-sm md:text-md bg-white w-100 p-4 sm:p-6 rounded-xl border border-black">
              <div class="flex items-center justify-between mb-2">
                <p class="font-bold flex items-center">Hapus Buku</p>
                
                <button
                  class="font-thin text-xl px-2 border border-black rounded"
                  onClick={() => setShowUpdate(false)}
                >
                  x
                </button>
              </div>

              <hr class="mb-4 h-px bg-black border-0"></hr>
              
              <form class="mb-8 grid grid-flow-row gap-4">
                <div> {" "}
                  Yakin menghapus {data.judul} oleh {data.penulis}?</div>
              </form>

              <div class="flex justify-center">
                <button
                  class="bg-pink border border-black break-words text-white font-medium text-xs sm:text-sm md:text-md px-4 py-1 rounded hover:bg-black transition-colors"
                  onClick={(e) => Delete(e) + setShowUpdate(false)}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
