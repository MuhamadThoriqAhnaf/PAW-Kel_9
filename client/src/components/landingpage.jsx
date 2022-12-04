import React from "react";
import { Link } from "react-scroll";

export default function Landingpage() {
  return (
    <>
      <div className="z-10 h-full md:h-[100vh] bg-hijau-muda px-[50px] py-[50px] md:px-[100px] xl:px-[200px] xl:pb-[100px] flex flex-col-reverse md:grid md:grid-cols-2 md:gap-[100px] lg:gap-[200px] items-center">
        <div className=" text-hitam  justify-center">
          <p className="text-3xl leading-normal font-bold lg:text-4xl lg:leading-normal">
            Temukan Buku Pilihan <br /> Sesuai Kebutuhan Anda!
          </p>
          <p className="my-5 lg:leading-normal md:text-justify">
            MyLibrary membantu Anda untuk mencari buku yang ingin anda pinjam.
          </p>
          <Link to="ListBuku" smooth={true}>
            <button className="py-3 mt-3 px-[50px] lg:px-[75px] bg-blue-600 text-white rounded-xl transform transition duration-300 scale-100 hover:scale-110">
              Lihat List Buku
            </button>
          </Link>
        </div>
        <img
          data-aos="fade-left"
          src="Buku.png"
          className="p-5 pt-0 md:p-0 xl:pt-30 xl:pb-0 xl:pr-0"
          alt=""
        ></img>
      </div>
    </>
  );
}
