"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import newCeramic from "@/jsondata/newCeramic.json";
import { NewCeremics } from "@/components/NewCeremics";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SignUp } from "@/components/SignUp";

const Page = () => {
  const { id } = useParams();

  if (!id) {
    return <p>Loading...</p>;
  }

  const clickItem = newCeramic.find((item) => item.id === id);

  if (!clickItem) {
    return <p>Item not found</p>;
  }

  return (
    <>
    <main className="w-full flex flex-col md:flex-row md:py-5 md:mx-auto h-auto">
      {/* Image Section */}
      <section className="w-full md:w-1/2 h-[300px] md:h-full">
        <Image
          src={`${clickItem.img}`}
          alt={clickItem.title}
          width={500}
          height={600}
          className="w-full h-full object-cover object-center"
          priority
        />
      </section>

      {/* Details Section */}
      <section className=" flex flex-col items-center justify-center gap-6 py-7 px-6 md:px-14 text-gray-800 w-full md:w-1/2">
        {/* Title and Price */}
        <div className="w-full flex flex-col gap-1 text-left">
          <p className="text-2xl md:text-3xl text-black">{clickItem.title}</p>
          <p className="text-xl font-semibold">{clickItem.price}</p>
        </div>

        {/* Description */}
        <div className="w-full flex flex-col gap-2">
          <p className="text-lg font-medium">Description</p>
          <p className="text-sm md:text-base leading-relaxed">
            A timeless design, with premium materials features as one of our
            most popular and iconic pieces. The dandy chair is perfect for any
            stylish living space with beech legs and lambskin leather
            upholstery.
          </p>
          <ul className="list-disc pl-5 text-sm md:text-base">
            <li>Premium material</li>
            <li>Handmade upholstery</li>
            <li>Quality timeless classic</li>
          </ul>
        </div>

        {/* Dimensions */}
        <div className="w-full flex justify-start flex-col gap-2">
          <p className="text-lg font-medium">Dimensions</p>
          <div className="grid grid-cols-2 gap-2 text-sm md:text-base">
            <p className="font-medium">Height</p>
            <p>110cm</p>
            <p className="font-medium">Width</p>
            <p>75cm</p>
            <p className="font-medium">Depth</p>
            <p>50cm</p>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Amount */}
          <div className="md:w-0 w-full flex items-center gap-2 md:flex-row flex-col">
            <p className="text-sm md:text-base font-medium">Amount</p>
            <button className="px-6 py-2 md:w-[170px] w-[90%] bg-gray-200 text-sm md:text-base">
              1
            </button>
          </div>

          {/* View Collection Button */}
          <button className="px-6 py-3 md:w-[170px] w-[90%] text-white bg-[#2A254B]">
            View collection
          </button>
        </div>
      </section>
    </main>
      <NewCeremics/>
      <FeaturesSection/>
      <SignUp />
      </>
  );
};

export default Page;
