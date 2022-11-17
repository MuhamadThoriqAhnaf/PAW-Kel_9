import React from 'react'
import { useState, useEffect } from 'react';
import { storage } from '../firebase';
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage';

export default function AdminPage() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  
  const imageListRef = ref(storage, "covers/")
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `covers/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
      }) 
    });
  }

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
    <div className='App'>
      <input type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
      <button onClick={uploadImage}>Upload Image</button>
      {imageList.map((url) => {
        return <img src={url}/>
      })}
    </div>
  )
}