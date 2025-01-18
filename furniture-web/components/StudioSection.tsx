import Image from "next/image";
import React from "react";

export const StudioSection = () => {
  return (
    <main className="w-full md:mx-auto md:py-5 flex flex-col md:flex-row">
      {/* Left Section */}
      <section className="flex flex-col items-center md:items-start justify-center py-7 px-6 md:px-14 bg-white text-gray-800 md:w-1/2 w-full h-auto md:h-[600px]">
        {/* Text Content */}
        <div className="flex flex-col gap-5 mb-6">
          <p className="text-xl font-sans text-black leading-relaxed">
            From a studio in London to a global brand with over 400 outlets
          </p>
          <p className="text-xl font-sans leading-relaxed">
            When we started Avion, the idea was simple: make high-quality
            furniture affordable and available for the mass market.
          </p>
          <p className="text-xl font-sans leading-relaxed">
            Handmade, and lovingly crafted furniture and homeware is what we
            live, breathe, and design, making our Chelsea boutique the hub for
            the London interior design community.
          </p>
        </div>

        {/* Button */}
        <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
          View Collection
        </button>
      </section>

      {/* Right Section */}
      <div className="md:w-1/2 w-full h-[300px] md:h-[600px]">
        <Image
          src="/studioImage.svg"
          alt="A stylish chair displayed in a modern studio setup"
          width={500}
          height={600}
          className="w-full h-full object-cover object-center"
          priority
        />
      </div>
    </main>
  );
};
