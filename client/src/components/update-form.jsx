import React from "react";
import { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "flowbite";
import axios from "axios";

export default function UpdateForm({
  setRefreshSignal,
  showUpdate: initialData,
  setShowUpdate,
}) {
  useEffect(() => {
    setJudul(initialData?.judul);
    setPenulis(initialData?.penulis);
    setTerbit(initialData?.terbit);
    setSinopsis(initialData?.sinopsis);
    setPinjam(initialData?.pinjam);
    setPengembalian(initialData?.pengembalian);
    setImageurl(initialData?.imageurl);
  }, [initialData]);

  const [judul, setJudul] = useState(initialData?.judul);
  const [penulis, setPenulis] = useState(initialData?.penulis);
  const [terbit, setTerbit] = useState(initialData?.terbit);
  const [sinopsis, setSinopsis] = useState(initialData?.sinopsis);
  const [pinjam, setPinjam] = useState(initialData?.pinjam);
  const [pengembalian, setPengembalian] = useState(initialData?.pengembalian);
  const [imageurl, setImageurl] = useState(initialData?.imageurl);

  const uploadImage = (e) => {
    return new Promise((resolve, reject) => {
      if (e == null) return;
      const imageRef = ref(storage, `covers/${e.name}`);
      uploadBytes(imageRef, e).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageurl(url);
          resolve(url);
        });
      });
    });
  };

  async function Update(e) {
    e.preventDefault();

    const data = {
      judul: judul,
      penulis: penulis,
      terbit: terbit,
      sinopsis: sinopsis,
      pinjam: pinjam,
      pengembalian: pengembalian,
      imageurl: imageurl,
    };

    const res = await axios.put(
      `http://localhost:5000/api/book/${initialData._id}`,
      data
    );

    console.log(res);
    setRefreshSignal((s) => !s);

    toast.success("Berhasil memperbarui buku!");
    setShowUpdate(false);
  }

  function isPinjam(pinjam) {
    if (pinjam != null) {
      return true;
    } else return false;
  }

  return (
    <div>
      {!!initialData ? (
        <>
          <div class="flex justify-center items-center font-rubik text-sm sm:text-md fixed inset-0 z-50">
            <div class="bg-white w-100 p-4 sm:p-6 rounded-xl border border-black overflow-y-auto h-screen sm:h-fit">
              <div>
                <div class="flex justify-between mb-2">
                  <p class="font-bold flex items-center">Perbarui Buku</p>
                  <button
                    class="font-thin text-sm sm:text-md px-2 border border-black rounded"
                    onClick={() => setShowUpdate(false)}
                  >
                    x
                  </button>
                </div>
              </div>
              <hr class="mb-4 h-px bg-black border-0"></hr>

              <div class="sm:flex gap-8">
                <div class="mb-2">
                  <label for="file">Gambar Sampul</label>
                  <div>
                    <img
                      src={imageurl}
                      class="w-[241px] aspect-[7/10] rounded border border-black object-cover"
                    ></img>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      accept="image/png, image/jpg, image/jpeg"
                      class="flex rounded-md pr-2 border border-black bg-tosca text-xs mt-4 w-[241px]"
                      onChange={(e) => {
                        uploadImage(e.target.files[0]);
                      }}
                      onClick={(e) => {
                        e.target.value = "";
                      }}
                    ></input>
                  </div>
                </div>

                <form class="grid grid-flow-row gap-2">
                  <div>
                    <label for="judul">Judul</label>
                    <input
                      value={judul}
                      onChange={(e) => setJudul(e.target.value)}
                      type="text"
                      id="judul"
                      class="text-sm sm:text-md w-full p-2 rounded bg-tosca border border-black"
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
                      class="text-sm sm:text-md w-full p-2 rounded bg-tosca border border-black"
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
                      class="text-sm sm:text-md w-full p-2 rounded bg-tosca border border-black"
                    ></input>
                    <br></br>
                  </div>
                  <div>
                    <label for="deskripsi">Deskripsi</label>
                    <textarea
                      value={sinopsis}
                      onChange={(e) => setSinopsis(e.target.value)}
                      type="text"
                      id="deskripsi"
                      rows="5"
                      class="text-sm sm:text-md w-full p-2 rounded bg-tosca border border-black"
                    ></textarea>
                    <br></br>
                  </div>
                  <div class="items-center">
                    {isPinjam(pinjam) ? (
                      <>
                        <input
                          checked
                          id="dipinjam"
                          type="checkbox"
                          class="text-sm sm:text-md peer w-6 h-6 rounded  focus:ring-purple text-purple"
                          onClick={() =>
                            setPinjam(null) + setPengembalian(null)
                          }
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
                          class="text-sm sm:text-md peer w-6 h-6 rounded  focus:ring-purple text-purple"
                        ></input>
                        <label for="dipinjam" class="ml-2">
                          Buku sedang dipinjam
                        </label>
                      </>
                    )}

                    <div
                      date-rangepicker
                      class="mb-4 text-sm sm:text-md flex items-center justify-between invisible peer-checked:visible mt-2"
                    >
                      <div class="flex">
                        <input
                          type="date"
                          id="pinjam"
                          class="text-sm sm:text-md rounded-md border-black focus:ring-purple w-full p-2"
                          placeholder="Tanggal pinjam"
                          onfocus="(this.type='date')"
                          value={pinjam}
                          onChange={(e) => setPinjam(e.target.value)}
                        ></input>
                      </div>
                      <span class="mx-4 text-gray-500">sampai</span>
                      <div class="flex">
                        <input
                          type="date"
                          id="pengembalian"
                          class="text-sm sm:text-md rounded-md border-black focus:ring-purple w-full p-2"
                          placeholder="Tanggal pengembalian"
                          value={pengembalian}
                          onChange={(e) => setPengembalian(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div class="flex justify-end">
                <button
                  class="bg-purple border border-black break-words text-white font-medium text-sm sm:text-md px-4 py-1 rounded hover:bg-black transition-colors"
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
