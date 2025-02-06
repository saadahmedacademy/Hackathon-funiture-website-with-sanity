"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import CategoryTapBar from "./CategoryTapBar";


export const NewCeramics = () => {
  const [selectedTap, setSelectedTap] = useState("");
  const [ceramics, setCeramics] = useState<CeramicsItems[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "product"][2..5] { name, price, _id, image }`;
        const data: CeramicsItems[] = await client.fetch(query);
        setCeramics(data);
      } catch (error) {
        console.error("Error fetching ceramics:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <CategoryTapBar selectedTap={selectedTap} onTapSelect={setSelectedTap} />
      <main className="md:container md:mx-auto w-full flex flex-col gap-6 py-16 px-4">
        {/* Section Heading */}
        <p className="text-2xl md:text-3xl font-sans font-semibold text-gray-800">
          New Ceramics
        </p>

        {/* Responsive Grid Layout */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 pb-12">
          {ceramics.map((ceramic: any) => (
            <Link href={`/product-detail/${ceramic._id}`} key={ceramic._id}>
              <div className="flex flex-col gap-4 items-start text-gray-600 h-[375px] ">
                {/* Ceramic Image */}
                <div className="relative w-full h-[350px]">
                  <Image
                    src={`${urlFor(ceramic.image).url()}`}
                    alt={`Image of ${ceramic.name}`}
                    layout="fill"
                    className="rounded-lg shadow-sm h-full "
                    loading="lazy"
                  />
                </div>

                {/* Ceramic Title */}
                <p className="text-lg font-medium">{ceramic.name}</p>

                {/* Ceramic Price */}
                <p className="text-lg font-semibold">{ceramic.price}</p>
              </div>
            </Link>
          ))}
        </div>


        {/* View Collection Button */}
        <div className="pt-10 mx-auto">
          <Link href={`/productlisting`}>
            <button className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-200 hover:text-gray-800 transition-all">
              View collection
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};


