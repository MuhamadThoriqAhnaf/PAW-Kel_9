import React from "react";
import { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateForm({ data: initialData, setRefreshSignal }) {
  const [judul, setJudul] = useState(initialData?.judul);
  const [penulis, setPenulis] = useState(initialData?.penulis);
  const [terbit, setTerbit] = useState(initialData?.terbit);
  const [sinopsis, setSinopsis] = useState(initialData?.sinopsis);

  const { id } = useParams();

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [showUpdate, setShowUpdate] = React.useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/book/${initialData._id}`)
      .then((res) => {
        setJudul(res.data.judul);
        setPenulis(res.data.penulis);
        setTerbit(res.data.terbit);
        setSinopsis(res.data.sinopsis);
      });
  }, []);

  const data = {
    judul: judul,
    penulis: penulis,
    terbit: terbit,
    sinopsis: sinopsis,
  };

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `covers/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };

  async function Update(e) {
    e.preventDefault();
    const data = await axios.put(`http://localhost:5000/api/book/${id}`, data);
    console.log(data);
    setRefreshSignal((s) => !s);
  }
  return (
    <div>
      <button
        className="bg-purple border border-black text-white font-rubik font-medium text-sm sm:text-md px-4 py-1 rounded hover:bg-black transition-colors focus:bg-white focus:text-black"
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
              </form>
              <div class="flex justify-center">
                <button
                  class="bg-purple border border-black break-words text-white font-medium text-sm sm:text-xl px-4 py-1 rounded hover:bg-black transition-colors"
                  onClick={() => Update() + uploadImage + setShowUpdate(false)}
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
