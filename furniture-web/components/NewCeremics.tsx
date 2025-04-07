"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import CategoryTapBar, { TapData } from "./CategoryTapBar";
import { urlFor } from "@/sanity/lib/image";
import { Loader2, PackageOpen } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";
import { CeramicsItems } from "@/typings";

const query = `*[_type == "category" && name == $name]{
  name,
  "products": categoryItems[]->{
    _id,
    name,
    price,
    image { asset->{ _id, url } },
    quantity,
    discount,
  }
}`;

export const NewCeramics = () => {
  const [selectedTap, setSelectedTap] = useState<string>(
    TapData[0]?.title || ""
  );
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
      <main className="container mx-auto w-full flex flex-col gap-6 py-16 px-4">
        {/* Heading */}
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          New Ceramics
        </p>

        {/* Grid / Loader / Empty */}
        <div className={`w-full min-h-[200px] ${loading || !ceramics.length
          ? "flex items-center justify-center"
          : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12"
          }`}
        >
          {loading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-10 h-10 text-gray-600 animate-spin" />
              <span className="text-lg font-semibold text-gray-600 mt-2">
                Loading Products...
              </span>
            </div>
          ) : ceramics.length ? (
            ceramics.map((product) => (
              <div
                key={product._id}
                className="flex flex-col gap-3 items-start text-gray-700 min-w-0"
              >
                {/* Image */}
                <Link href={`/product-detail/${product._id}`} className="w-full">
                  <div className="w-full aspect-[4/5] relative overflow-hidden rounded-md shadow-sm">
                    <Image
                      src={`${urlFor(product.image)}`}
                      alt={product.name}
                      fill
                      className="object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* Info */}
                <p className="text-base sm:text-lg font-medium truncate w-full">
                  {product.name}
                </p>
                <p className="text-base font-semibold w-full">
                  Price: ${product.price}
                </p>

                {/* Button */}
                <AddToCartButton product={product} />
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center gap-2 w-full">
              <PackageOpen className="w-10 h-10 text-gray-500" />
              <p className="text-xl font-semibold text-gray-600 mt-2">
                No Product is available now
              </p>
            </div>
          )}
        </div>

        {/* View Collection */}
        <div className="pt-8 mx-auto">
          <Link href={`/productlisting`}>
            <button className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
              View collection
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};
