import { Repeat } from 'lucide-react';
import React from 'react';

interface Props {
  selectedTap: string;
  onTapSelect: (tap: string) => void;
}

export const TapData = [
  { title: "Tableware" },
  { title: "Plant Pots" },
  { title: "Ceramics" },
  { title: "Tables" },
  { title: "Chairs" },
  { title: "Crockory" },
  { title: "Cutlery" },
];

const CategoryTapBar = ({ selectedTap, onTapSelect }: Props) => {
  return (
    <div className="flex justify-center items-center w-full p-1 h-1/2">
      <div className="flex flex-wrap justify-center gap-2 navtags">
        {TapData.map((tap, index) => (
          <button
            key={index}
            onClick={() => onTapSelect(tap.title)}
            className={`border rounded-full font-semibold border-black px-4 py-1.5 md:px-6
              hover:bg-black hover:text-white cursor-pointer transition duration-300 ease-in-out ${
                selectedTap === tap.title && "bg-black text-white"
              }`}
          >
            {tap.title}
          </button>
        ))}
        
        <button
  aria-label="Reset selection"
  onClick={() => onTapSelect(TapData[0].title)} // Reset to default
  className="border rounded-full border-black p-2
     hover:bg-black hover:text-white cursor-pointer transition duration-300 ease-in-out"
>
  <Repeat className="w-5 h-5" />
</button>

      </div>
    </div>
  );
};

export default CategoryTapBar;
