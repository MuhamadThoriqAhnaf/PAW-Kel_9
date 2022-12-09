import React from "react";
import { useState, } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function AddForm({setRefreshSignal}) {
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [terbit, setTerbit] = useState("");
  const [sinopsis, setSinopsis] = useState("");

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [showTambah, setShowTambah] = React.useState(false);

  const data = {
    judul: judul,
    penulis: penulis,
    terbit: terbit,
    sinopsis: sinopsis,
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

  async function submitForm(e) {
    e.preventDefault();
    const imageurl = await uploadImage();
    console.log("imageurl", imageurl);

    data.imageurl = imageurl;

    console.log("data sebelum post", data);

    await axios
      .post("http://localhost:5000/api/book", data)
      .catch(function (error) {
        console.log(error);
      });
      
      setRefreshSignal((s) => !s);
      
      toast.success("Berhasil menambahkan buku!");
      setShowTambah(false)
  }

  return (
    <div>
      <button
        className="bg-green border border-black text-white font-rubik font-medium px-4 py-1 text-xs sm:text-sm md:text-md rounded hover:bg-black transition-colors focus:bg-white focus:text-black"
        type="button"
        onClick={() => setShowTambah(true)}
      >
        {" "}
        Tambah
      </button>
      {showTambah ? (
        <>
          <div class="justify-center font-rubik text-xs sm:text-sm items-center flex fixed inset-0 z-50">
            <div class="bg-white w-100 p-4 md:p-6 rounded-xl border border-black overflow-y-auto h-screen md:h-fit">
              <div class="flex items-center justify-between mb-2">
                <p class="font-bold flex items-center">Tambah Buku</p>
                <button
                  class="font-thin text-md sm:text-xl px-2 border border-black rounded  hover:bg-black transition-colors"
                  onClick={() => setShowTambah(false)}
                >
                  x
                </button>
              </div>

              <hr class="mb-4 h-px bg-black border-0"></hr>

              <form class="mb-8 grid grid-flow-row gap-4 w-[280px] sm:w-[480px] md:w-[730px] flex-grow" onSubmit={submitForm}>
                <div>
                  <label for="judul">Judul</label>
                  <input
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    type="text"
                    id="judul"
                    class="w-full p-2 rounded bg-tosca border border-black"
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
                    class="w-full p-2 rounded bg-tosca border border-black"
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
                    class="w-full p-2 rounded bg-tosca border border-black"
                  ></input>
                  <br></br>
                </div>

                <div>
                  <label for="file">Gambar Sampul</label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/png, image/jpg, image/jpeg" 
                    class="flex rounded-md border border-black bg-tosca w-full"
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
                    class="w-full p-2 rounded bg-tosca border border-black"
                  ></textarea>
                  <br></br>
                </div>

              </form>

              <div class="flex justify-center">
                <button
                  class="bg-green border border-black break-words text-white font-medium text-xs sm:text-sm md:text-md px-4 py-1 rounded hover:bg-black transition-colors"
                  onClick={(e) => submitForm(e)}
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
          
          <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
