import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const test = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          username: e.target[0].value,
          password: e.target[1].value,
        }
      );
      navigate("/adminPage");
    } catch (e) {
      if (e.response) alert(e.response?.data?.message);
      else alert("something went wrong");
    }
  };

  return (
    <main class="bg-login-phone sm:bg-login bg-cover bg-center font-rubik flex items-center justify-center h-screen">
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
          <a class="flex items-center justify-center">
            <button
              href="/adminpage"
              type="submit"
              class="bg-[#0B3C49] border border-black w-1/4 text-white font-medium py-2 rounded hover:bg-black transition-colors"
            >
              Masuk
            </button>
          </a>
          <a href="/list" className="">
            Booklist
          </a>
        </div>
      </form>
    </main>
  );
}
