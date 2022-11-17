import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import useFetch from '../hooks/useFetch';
import axios from "axios"

export default function Booklist() {
  // const { data, loading, error } = useFetch("http://localhost:5000/api/book");
  // console.log(data)
  const [data, setData] = useState({})
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/book").then((response) => {
      setData(response.data);
      console.log(data)
    })
  }, []);
  return (
    <Navbar/>
    

  )
}
