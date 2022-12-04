import React from "react";
import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import "flowbite";
import { refresh } from "aos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateForm({ data: initialData, setRefreshSignal }) {
  const [judul, setJudul] = useState(initialData?.judul);
  const [penulis, setPenulis] = useState(initialData?.penulis);
  const [terbit, setTerbit] = useState(initialData?.terbit);
  const [sinopsis, setSinopsis] = useState(initialData?.sinopsis);
  const [pinjam, setPinjam] = useState(initialData?.pinjam);
  const [pengembalian, setPengembalian] = useState(initialData?.pengembalian);

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [showUpdate, setShowUpdate] = React.useState(false);

  const data = {
    judul: judul,
    penulis: penulis,
    terbit: terbit,
    sinopsis: sinopsis,
    pinjam: pinjam,
    pengembalian: pengembalian,
  };

  const uploadImage = () => {
    return new Promise((resolve, reject) => {
      if (imageUpload == null) return;
      const imageRef = ref(storage, `covers/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);
          resolve(url);
        });
      });
    });
  };

  async function Update(e) {
    e.preventDefault();
    const imageurl = await uploadImage();
    data.imageurl = imageurl;

    const res = axios.put(
      `http://localhost:5000/api/book/${initialData._id}`,
      data
    );

    console.log(res);
    setRefreshSignal((s) => !s);

    toast.success("Berhasil memperbarui buku!");
    setShowUpdate(false).then(window.location.reload(true));
  }

  function isPinjam(pinjam) {
    if (pinjam != null) {
      return true;
    } else return false;
  }

  return (
    <div>
      <button
        className="bg-purple border border-black text-white font-rubik font-medium text-sm  md:px-4 px-3 py-1 rounded hover:bg-black transition-colors focus:bg-white focus:text-black"
        type="button"
        onClick={() => setShowUpdate(true)}
      >
        {" "}
        Perbarui
      </button>
      {showUpdate ? (
        <>
          <div class="justify-center font-rubik items-center flex fixed inset-0 z-50">
            <div class="text-sm sm:text-xl bg-white w-100 p-8 sm:p-10 rounded-xl border border-black">
              <div class="flex items-center justify-between mb-2">
                <p class="font-bold flex items-center">Perbarui Buku</p>
                <button
                  class="font-thin text-xl px-2 border border-black rounded"
                  onClick={() => setShowUpdate(false)}
                >
                  x
                </button>
              </div>
              <hr class="mb-4 h-px bg-black border-0"></hr>
              <form class="mb-8 grid grid-flow-row gap-4">
                <div>
                  <label for="judul">Judul</label>
                  <input
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    type="text"
                    id="judul"
                    class="w-full p-2 rounded bg-[#D9E5D6] border border-black"
                  ></input>
                  <br></br>
                </div>
                <div>
                  <label for="penulis">Penulis</label>
                  <input
                    value={penulis}
                    onChange={(e) => setPenulis(e.target.value)}
                    type="text"
                    id="penulis"
                    class="w-full p-2 rounded bg-[#D9E5D6] border border-black"
                  ></input>
                  <br></br>
                </div>
                <div>
                  <label for="terbit">Terbit</label>
                  <input
                    value={terbit}
                    onChange={(e) => setTerbit(e.target.value)}
                    type="text"
                    id="terbit"
                    class="w-full p-2 rounded bg-[#D9E5D6] border border-black"
                  ></input>
                  <br></br>
                </div>
                <div>
                  <label for="file">Gambar Sampul</label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    class="flex rounded-md border border-black bg-tosca text-sm w-full"
                    onChange={(e) => {
                      setImageUpload(e.target.files[0]);
                    }}
                  ></input>
                </div>
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
                <div class="items-center">
                  {isPinjam(data.pinjam) ? (
                    <>
                      <input
                        checked
                        id="dipinjam"
                        type="checkbox"
                        class="peer w-6 h-6 rounded  focus:ring-purple text-purple"
                        onClick={() => setPinjam(null) + setPengembalian(null)}
                      ></input>
                      <label for="dipinjam" class="ml-2">
                        Buku sedang dipinjam
                      </label>
                    </>
                  ) : (
                    <>
                      <input
                        id="dipinjam"
                        type="checkbox"
                        class="peer w-6 h-6 rounded  focus:ring-purple text-purple"
                      ></input>
                      <label for="dipinjam" class="ml-2">
                        Buku sedang dipinjam
                      </label>
                    </>
                  )}

                  <div
                    date-rangepicker
                    class="flex items-center justify-between invisible peer-checked:visible mt-2"
                  >
                    <div class="relative">
                      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="pinjam"
                        class="text-sm rounded-md border-black focus:ring-purple block w-full pl-10 p-2.5"
                        placeholder="Tanggal pinjam"
                        value={pinjam}
                        onChange={(e) => setPinjam(e.target.value)}
                      ></input>
                    </div>
                    <span class="mx-4 text-gray-500">sampai</span>
                    <div class="relative">
                      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="pengembalian"
                        class="text-sm rounded-md border-black focus:ring-purple block w-full pl-10 p-2.5"
                        placeholder="Tanggal pengembalian"
                        value={pengembalian}
                        onChange={(e) => setPengembalian(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
              </form>
              <div class="flex justify-center">
                <button
                  class="bg-purple border border-black break-words text-white font-medium text-sm sm:text-xl px-4 py-1 rounded hover:bg-black transition-colors"
                  onClick={(e) => Update(e)}
                >
                  Perbarui
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
