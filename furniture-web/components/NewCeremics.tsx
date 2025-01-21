import Image from "next/image";
import React from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const NewCeremics = async () => {
  
  const query = `*[_type == "product"][2..5] {
  name, price, _id ,image, title
  }`;
  
  const fatchData = await client.fetch(query);

  return (
    <main className="md:container md:mx-auto w-full flex flex-col gap-6 py-16 px-4">
      {/* Section Heading */}
      <p className="text-2xl md:text-3xl font-sans font-semibold text-gray-800">
        New ceramics
      </p>

      {/* Responsive Grid Layout */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 pb-12">
        {fatchData.map((ceramic : any) => (
          <Link href={`/product-detail/${ceramic._id}`} key={ceramic._id}>
            <div className="flex flex-col gap-4 items-start text-gray-600 h-[375px]">
              {/* Ceramic Image */}
              <Image
                src={`${urlFor(ceramic.image)}`}
                alt={`Image of ${ceramic.name}`}
                width={305}
                height={375}
                className="rounded-lg shadow-sm h-full"
                loading="lazy"
              />

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
        <button className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-200 hover:text-gray-800 transition-all">
          View collection
        </button>
      </div>
    </main>
  );
};
