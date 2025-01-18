import Image from "next/image";
import React from "react";

export const HeroBlock = () => {
  return (
    <main className="md:container w-full md:mx-auto md:py-5 h-auto md:h-[500px] flex">
      {/* Left Section */}
      <section className="flex flex-col items-center md:items-start justify-center py-7 px-4 lg:py-0 md:px-14 bg-[#2A254B] text-white w-full">
        {/* Text and Button */}
        <div className="flex flex-col items-center md:items-start gap-5 justify-center mb-6 h-full">
          <p className="text-2xl md:text-3xl pr-4 font-sans text-start leading-relaxed">
            The furniture brand for the future
            <br className="hidden md:block" />
            with timeless designs
          </p>
          <button className="md:block hidden bg-[#F9F9F926] py-3 px-10 md:py-4 md:px-6 hover:bg-[#ffffff26] transition-colors">
            View collection
          </button>
        </div>

        <div className="pb-7 max-w-full md:max-w-[602px]">
          <p className="text-start text-lg md:text-xl font-sans leading-relaxed">
            A new era in eco-friendly furniture with Avelon, the French luxury
            retail brand with tasteful colors and a beautiful way to display
            things digitally using modern web technologies.
          </p>
        </div>

        <button className="md:hidden block bg-[#F9F9F926] w-[93%] py-3 px-10 md:py-4 md:px-6 hover:bg-[#ffffff26] transition-colors">
          View collection
        </button>
      </section>

      {/* Right Section */}
      <div className="md:w-1/2">
          <Image
            src="/mainChair.svg"
            alt="chair image"
            width={500}
            height={100}
            className="hidden md:block w-full h-full object-cover"
          />
          </div>
    </main>
  );
};
