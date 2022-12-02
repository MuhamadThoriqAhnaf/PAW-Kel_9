import React from "react";
import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddForm({ refresh }) {
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [terbit, setTerbit] = useState("");
  const [sinopsis, setSinopsis] = useState("");

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [showTambah, setShowTambah] = React.useState(false);

  const navigate = useNavigate();

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

    axios
      .post("http://localhost:5000/api/book", data)
      .then(function (response) {
        console.log(response);
        console.log("test axios response = " + response);

        toast.success("Berhasil menambahkan buku!");
        refresh();
        setShowTambah(false).then(window.location.reload(false));
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
        onClick={() => setShowTambah(true)}
      >
        {" "}
        Tambah
      </button>
      {showTambah ? (
        <>
          <div class="justify-center font-rubik items-center flex fixed inset-0 z-50">
            <div class="text-sm sm:text-xl bg-white w-100 p-8 sm:p-10 rounded-xl border border-black">
              <div class="flex items-center justify-between mb-2">
                <p class="font-bold flex items-center">Tambah Buku</p>
                <button
                  class="font-thin text-xl px-2 border border-black rounded  hover:bg-black transition-colors"
                  onClick={() => setShowTambah(false)}
                >
                  x
                </button>
              </div>
              <hr class="mb-4 h-px bg-black border-0"></hr>
              <form class="mb-8 grid grid-flow-row gap-4 w-[500px]" onSubmit={submitForm}>
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
              </form>
              <div class="flex justify-center">
                <button
                  class="bg-green border border-black break-words text-white font-medium text-sm sm:text-xl px-4 py-1 rounded hover:bg-black transition-colors"
                  onClick={submitForm}
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

export default AddForm;
