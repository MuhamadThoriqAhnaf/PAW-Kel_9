import React from 'react'
import { useState, useEffect } from 'react';
import { storage } from '../firebase';
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage';
import Navbar from '../components/navbar';
import AddForm from '../components/add-form';

export default function AdminPage() {
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "covers/")

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url])
        })
      })
    })
  }, [])

  return (
    <>
    <Navbar/>
    <section class="flex font-rubik px-8 mt-8 justify-start items-center">
      <h1 class="text-2xl mr-4">Koleksi Buku</h1>
      <AddForm/>
    </section>
    <hr class="mx-8 my-3 h-px bg-black border-0"></hr>
    <div class='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mx-8'>
      {imageList.map((url) => {
        return <div class="border border-black p-2 rounded">
                  <img src={url} class="h-112 w-80 rounded object-cover"/>
                  <div class="font-rubik text-lg p-2">
                    <p class="font-medium">Judul</p>
                    <p >Penulis</p>
                    <p>Tahun</p>
                  </div>
                  <div class="flex items-center justify-between">
                    <button class="bg-purple border border-black text-white font-medium text-sm md:text-lg w-1/2 p-2 mr-1 rounded hover:bg-black transition-colors">
                      Perbarui
                    </button>
                    <button class="bg-pink border border-black text-white font-medium text-sm md:text-lg w-1/2 p-2 rounded hover:bg-black transition-colors">
                      Hapus
                    </button>
                  </div>
              </div>
      })}
    </div>
    </>
  )
}