import React from "react";
import { Link } from "react-scroll";


export default function Landingpage() {
    
  
    return (
      <>
        <div className="z-10 h-full md:h-[100vh] bg-hijau-muda px-[50px] py-[50px] md:px-[100px] xl:px-[200px] xl:pb-[100px] flex flex-col-reverse md:grid md:grid-cols-2 md:gap-[100px] lg:gap-[200px] items-center">
          <div className="text-center text-hitam md:text-justify justify-center">
            <p className="text-3xl leading-normal font-bold lg:text-4xl lg:leading-normal">
              Temukan Buku Pilihan <br /> Sesuai Kebutuhan Anda!
            </p>
            <p className="my-5 lg:leading-normal">
              MyLibrary membantu Anda untuk mencari buku yang nantinya akan anda pilih jika anda ingin meminjamnya
            </p>
            <Link to="ListBuku" smooth={true}>
              <button className="py-3 mt-3 px-[50px] lg:px-[75px] bg-blue-600 text-white rounded-xl">
                Lihat List Buku
              </button>
            </Link>
          </div>
          <img
            data-aos="fade-left"
            src="Buku.png"
            className="p-5 pt-0 md:p-0 xl:pt-30 xl:pb-10 xl:pr-0"
            alt=""
          ></img>
        </div>
      </>
    );
  }
  
