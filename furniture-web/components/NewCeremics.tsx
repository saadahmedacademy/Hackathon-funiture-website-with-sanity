"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import CategoryTapBar, { TapData } from "./CategoryTapBar";
import { urlFor } from "@/sanity/lib/image";
import { Loader2, PackageOpen } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";

const query = `*[_type == "category" && name == $name]{
  name,
  "products": categoryItems[]->{
    _id,
    name,
    price,
    image,
    quantity,
    discount,
  }
}`;


export const NewCeramics = () => {
  const [selectedTap, setSelectedTap] = useState<string>(TapData[0]?.title || "");
  const [ceramics, setCeramics] = useState<CeramicsItems[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await client.fetch(query, { name: selectedTap });
      setCeramics(data.length ? data[0].products : []);
    } catch (error) {
      console.error("Error fetching ceramics:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedTap]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <CategoryTapBar selectedTap={selectedTap} onTapSelect={setSelectedTap} />
      <main className="md:container md:mx-auto w-full flex flex-col gap-6 py-16  px-4">
        {/* Section Heading */}
        <p className="text-2xl md:text-3xl font-sans font-semibold text-gray-800">
          New Ceramics
        </p>

        {/* Responsive Grid Layout */}
        <div className={`w-full min-h-[200px] ${loading || !ceramics.length ? "flex items-center justify-center" : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 pb-12"}`}>
          {loading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-10 h-10 text-gray-600 animate-spin" />
              <span className="text-lg font-semibold text-gray-600 mt-2">Loading Products...</span>
            </div>
          ) : ceramics.length ? (
            ceramics.map((ceramic) => (

              <div
                key={ceramic._id}
                className="flex flex-col gap-4 items-start text-gray-600 h-[380px] transition duration-300 ease-in-out cursor-pointer"
              >
                {/* Ceramic Image */}
                <Link href={`/product-detail/${ceramic._id}`} >
                  <div className="relative w-full h-[370px]">
                    <Image
                       src={`${urlFor(ceramic.image)}`}
                      alt={`Image of ${ceramic.name}`}
                      fill
                      className="rounded-lg shadow-sm h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </Link>

                {/* Ceramic Title */}
                <p className="text-lg font-medium">{ceramic.name}</p>

                {/* Ceramic Price */}
                <p className="text-lg font-semibold">Price: ${ceramic.price}</p>

                {/* Add to Cart Button 
                   */}
                <AddToCartButton product={ceramic} />
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center gap-2 w-full">
              <PackageOpen className="w-10 h-10 text-gray-500" />
              <p className="text-xl font-semibold text-gray-600 mt-2">No Product is available now</p>
            </div>
          )}
        </div>
      </main>

        {/* View Collection Button */}
        <div className="flex justify-center items-center pt-24">
          <Link href={`/productlisting`}>
            <button className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-200 hover:text-gray-800 transition-all">
              View collection
            </button>
          </Link>
        </div>
    </>
  );
};
