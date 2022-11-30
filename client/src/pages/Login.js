import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();

  const test = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios
        .post("http://localhost:5000/api/auth/signin", {
          username: e.target[0].value,
          password: e.target[1].value,
        })
        .then(function (res) {
          console.log(res.data.accessToken);
          localStorage.setItem("accessToken", res.data.accessToken);
          toast.success("Selamat Datang Admin");
          setTimeout(() => {
            window.location.href = "/adminPage";
            //navigate("/adminPage");
          }, 2000);
        });
    } catch (ex) {
      if (ex.response) {
        console.log("error: " + ex.response?.data?.message);
        toast.error("error: " + ex.response?.data?.message);
      }
      //alert(ex.response?.data?.message);
      //else alert("Selamat datang admin");
    }
  };

  return (
    <main class="bg-login-phone sm:bg-login bg-cover bg-center font-rubik flex items-center justify-center h-screen">
      <ToastContainer />
      <form onSubmit={test}>
        <div class="flex items-center justify-center mb-4">
          <img src="logo-black.svg" class="h-10 fill-black"></img>
        </div>
        <div class="flex items-center justify-center mb-12">
          <h1 class="text-xl sm:text-3xl">
            Selamat datang di <span class="font-bold">MyLibrary</span>!
          </h1>
        </div>
        <div class="text-sm sm:text-xl bg-white w-100 p-8 sm:p-10 rounded-xl border border-black">
          <p class="font-bold flex items-center justify-center mb-6 sm:mb-8">
            Masuk dengan akun MyLibrary Anda
          </p>
          <label for="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            class="w-full p-2 rounded bg-[#D9E5D6] border border-black mb-4"
          ></input>
          <br></br>
          <label for="password">Passsword: </label>
          <input
            type="password"
            id="password"
            name="password"
            class="w-full p-2 rounded bg-[#D9E5D6] border border-black mb-6 sm:mb-8"
          ></input>
          <br></br>
          <div class="flex items-center justify-between">
            <a>
              <button
                href="/adminpage"
                type="submit"
                class="bg-[#0B3C49] border border-black text-white font-medium px-4 py-2 rounded hover:bg-black transition-colors"
              >
                Masuk
              </button>
            </a>
            <a href="/">
              <button
                type="button"
                class="border border-black text-black font-medium px-4 py-2 rounded hover:bg-pink hover:text-white transition-colors"
              >
                Kembali
              </button>
            </a>
          </div>
        </div>
      </form>
    </main>
  );
}
