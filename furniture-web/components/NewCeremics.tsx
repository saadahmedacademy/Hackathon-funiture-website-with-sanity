"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import CategoryTapBar, { TapData } from "./CategoryTapBar";
import { urlFor } from "@/sanity/lib/image";

const query = `*[_type == "category" && name == $name]{
  name,
  "products": categoryItems[]->{
    _id,
    name,
    price,
    image
  }
}`;


export const NewCeramics = () => {
  const [selectedTap, setSelectedTap] = useState<string>(TapData[0]?.title || "");
  const [ceramics, setCeramics] = useState<CeramicsItems[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Use useMemo to prevent unnecessary re-renders
  // const params = useMemo(() => ({ name: selectedTap }), [selectedTap]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await client.fetch(query, { name: selectedTap });
        setCeramics(data.length ? data[0].products : []);
      } catch (error) {
        console.error("Error fetching ceramics:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [selectedTap]); // Use selectedTap instead of params
  

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
          {loading ? <span className=" text-lg text-center"> Products is Loading... </span>
            : ceramics.map((ceramic: CeramicsItems) => (
              <Link href={`/product-detail/${ceramic._id}`} key={ceramic._id}>
                <div className="flex flex-col gap-4 items-start text-gray-600 h-[380px] ">
                  {/* Ceramic Image */}
                  <div className="relative w-full h-[370px]">
                    <Image
                    src={ceramic.image ? `${urlFor(ceramic.image)}` : "/placeholder.jpg"}
                      alt={`Image of ${ceramic.name}`}
                      layout="fill"
                      className="rounded-lg shadow-sm h-auto "
                      loading="lazy"
                    />
                  </div>

                  {/* Ceramic Title */}
                  <p className="text-lg font-medium">{ceramic.name}</p>

                  {/* Ceramic Price */}
                  <p className="text-lg font-semibold">Price: ${ceramic.price}</p>
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


