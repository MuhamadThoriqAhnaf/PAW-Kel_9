import React from "react";
import { useState, useEffect } from "react";

export default function Sinopsis({data: initialData, setRefreshSignal}){

  const [sinopsis, setSinopsis] = useState(initialData?.sinopsis);
  const [showSinopsis, setShowSinopsis] = React.useState(false);

  useEffect(() => setSinopsis(initialData?.sinopsis))

  const data = {
    sinopsis: sinopsis,
  };

  return (
    <div>
      <button
        className="bg-green border border-black w text-white font-rubik font-medium px-4 py-1 rounded hover:bg-black transition-colors focus:bg-white focus:text-black"
        type="button"
        onClick={() => setShowSinopsis(true)}
      >
        {" "}
        Lihat Sinopsis
      </button>
      {showSinopsis ? (
        <>
          <div class="justify-center flex font-rubik items-center fixed inset-0 z-50">
            <div class="text-sm md:text-md bg-white w-100 p-8 sm:p-10 rounded-xl border border-black">
              <div class="flex items-center justify-between mb-2">
                <p class="font-bold flex items-center">Sinopsis</p>
                
                <button
                  class="font-thin text-xl px-2 border border-black rounded"
                  type="button"
                  onClick={() => setShowSinopsis(false)}
                >
                  x
                </button>
              </div>
              
              <hr class="mb-4 h-px bg-black border-0"></hr>
              
              <form class="w-[300px] sm:w-[500px] md:w-[750px]">
                <div>
                  <p
                    class="cursor-default w-full p-2 rounded border-0 text-justify"
                  >{data.sinopsis}</p>
                  <br></br>
                </div>
              </form>
            </div>
          </div>

          <div className=" opacity-25 fixed inset-0 z-40 bg-black">
          </div>
        </>
      ) : null}
    </div>
  );
}

