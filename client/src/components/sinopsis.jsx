import React from "react";
import { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Sinopsis({data, ShowSinopsis, setShowSinopsis, refresh}){
    const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [terbit, setTerbit] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  
  
    
  const navigate = useNavigate();

  const _data = {
    judul: judul,
    penulis: penulis,
    terbit: terbit,
    sinopsis: sinopsis,
  };

  async function submitForm(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/book", data)
      .then(function (response) {
        console.log(response);
        console.log("test axios response = " + response);

        alert("Berhasil menambahkan buku!");

        refresh();
        setShowSinopsis(false).then(window.location.reload(false));
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return (
    <div>
      <button
        className="bg-[#0B3C49] border border-black w text-white font-rubik font-medium px-4 py-1 rounded hover:bg-black transition-colors focus:bg-white focus:text-black"
        type="button"
        onClick={() => setShowSinopsis(true)}
      >
        {" "}
        Sinopsis
      </button>
      {setShowSinopsis ? (
        <>
          <div class="justify-center flex font-rubik items-center fixed inset-0 z-50">
            <div class="text-sm sm:text-xl bg-white w-100 p-8 sm:p-10 rounded-xl border border-black">
              <div class="flex items-center justify-between mb-2">
                <p class="font-bold flex items-center">Sinopsis </p>
                <button
                  class="font-thin text-xl px-2 border border-pink rounded"
                  type="button"
                  onClick={() => setShowSinopsis(false)}
                >
                  x
                </button>
              </div>
              <hr class="mb-4 h-px bg-black border-0"></hr>
              <form class="mb-8 grid grid-flow-row gap-4" onSubmit={submitForm}>

                <div>
                  <label for="deskripsi" class="">
                    Deskripsi
                  </label>
                  <textarea
                    value={sinopsis}
                    onChange={(e) => setSinopsis(e.target.value)}
                    type="text"
                    id="deskripsi"
                    rows="4"
                    class="w-full p-2 rounded bg-[#D9E5D6] border border-black"
                  ></textarea>
                  <br></br>
                </div>
              </form>
              <div class="flex justify-center">
                {/* <button
                  class="bg-green border border-black break-words text-white font-medium text-sm sm:text-xl px-4 py-1 rounded hover:bg-black transition-colors"
                  onClick={submitForm}
                >
                  Sinopsis
                </button> */}
              </div>
            </div>
          </div>
          <div class=" opacity-10 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );

}

