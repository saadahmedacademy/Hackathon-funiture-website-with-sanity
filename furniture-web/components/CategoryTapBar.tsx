import { Repeat } from 'lucide-react';
import React from 'react'

interface Props {
  seletedTap:string;
  onTapSelect : (tap:string) => void;
}
const CategoryTapBar = ({ seletedTap, onTapSelect }: Props) => {
  return (
    <div className="flex justify-center items-center w-full py-4 h-1/2">
        <div className="flex flex-wrap justify-center gap-2 navtags">
          {[
            "Plant pots",
            "Ceramics",
            "Tables",
            "Chairs",
            "Crockery",
            "Tableware",
            "Cutlery",
          ].map((tap, index) => (
            <button key={index} className="border rounded-full font-semibold border-black px-4 py-1.5 md:px-6
              hover:bg-black hover:text-white cursor-pointer transition duration-300 ease-in-out">
              {tap}
            </button>
          ))}
          <button>
            <Repeat className='md:block hidden' />
          </button>
        </div>
      </div>
  )
}

export default CategoryTapBar
