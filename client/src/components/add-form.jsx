import React from 'react'
import { useState, useEffect } from 'react';
import { storage } from '../firebase';
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage';

export default function AddForm() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [showModal, setShowModal] = React.useState(false);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `covers/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
      }) 
    });
  }

  return (
    <>
      <button
        className="bg-[#0B3C49] border border-black w text-white font-rubik font-medium px-4 py-1 rounded hover:bg-black transition-colors focus:bg-white focus:text-black"
        type="button"
        onClick={() => setShowModal(true)}
      > Tambah
      </button>
      {showModal ? (
        <>
            <div
            class="justify-center font-rubik items-center flex fixed inset-0 z-50"
            >
                <div class="text-sm sm:text-xl bg-white w-100 p-8 sm:p-10 rounded-xl border border-black">
                        <div class="flex items-center justify-between mb-2">
                            <p class="font-bold flex items-center">Tambah Buku</p>
                            <button class="font-thin text-xl px-2 border border-black rounded" onClick={() => setShowModal(false)}>x</button>
                        </div>
                        <hr class="mb-4 h-px bg-black border-0"></hr>
                        <form class ="mb-8 grid grid-flow-row gap-4">
                            <div>
                                <label for="judul">Judul</label>
                                <input type="text" id="judul" name="judul" class="w-full p-2 rounded bg-[#D9E5D6] border border-black"></input><br></br>
                            </div>
                            <div>
                                <label for="penulis">Penulis</label>
                                <input type="text" id="penulis" name="penulis" class="w-full p-2 rounded bg-[#D9E5D6] border border-black"></input><br></br>
                            </div>
                            <div>
                                <label for="terbit">Tahun Terbit</label>
                                <input type="text" id="terbit" name="terbit" class="w-full p-2 rounded bg-[#D9E5D6] border border-black"></input><br></br>
                            </div>
                            <div>
                                <label for="file">Gambar Sampul</label>
                                <input type="file" id="file" name="file" onChange={(event) => {setImageUpload(event.target.files[0])}}></input>
                            </div>
                            <div>
                                <label for="deskripsi" class="">Deskripsi</label>
                                <textarea type="paragraph" id="deskripsi" name="deskripsi" rows="4" class="w-full p-2 rounded bg-[#D9E5D6] border border-black"></textarea><br></br>
                            </div>
                        </form>
                        <div class="flex justify-center">
                            <button 
                            type="submit"
                            class="bg-green border border-black break-words text-white font-medium text-sm sm:text-xl px-4 py-1 rounded hover:bg-black transition-colors"
                            onClick={() => setShowModal(false) + uploadImage}
                            >Tambah
                            </button>
                        </div>
                    </div>
              </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

