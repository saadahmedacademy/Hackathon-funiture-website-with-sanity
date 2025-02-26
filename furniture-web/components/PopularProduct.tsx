import Image from "next/image";
import React from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { AddToCartButton } from "./AddToCartButton";

export const PopularProduct = async () => {
  const query = `*[_type == "product"][6..9] {
   name, price, _id ,image
   }`;

  const fatchData = await client.fetch(query);

  return (
    <main className="md:container md:mx-auto w-full flex flex-col gap-6 py-16 px-4">
      {/* Section Heading */}
      <p className="text-2xl md:text-3xl font-sans font-semibold text-gray-800">
        Our popular products
      </p>

      {/* Responsive Scrollable Layout */}
      <div className="w-full flex justify-start items-center gap-4  overflow-x-auto scroll-smooth scrollbar-hide popular-product">
        {fatchData.map((product: CeramicsItems) => (
          <div
            key={product._id}
            className="flex flex-col gap-4 items-start text-gray-600 shrink-0 snap-start "
          >
            {/* Product Image */}
            <Link href={`/product-detail/${product._id}`}>
              <div className="h-[375px] w-[305px]">
                <Image
                  src={`${urlFor(product.image)}`}
                  alt={product.name}
                  width={305}
                  height={375}
                  className="w-full h-full rounded-md object-cover object-center hover:scale-105 transition-transform"
                />
              </div>
            </Link>

            {/* Product Title */}
            <p className="text-lg font-medium">{product.name}</p>

            {/* Product Price */}
            <p className="text-lg font-semibold">Price: ${product.price}</p>

            {/* Add to cart buttton */}
            <AddToCartButton product={product} />
          </div>
        ))}
      </div>

      {/* View Collection Button */}
      <div className="pt-8 mx-auto">
        <Link href={`/productlisting`}>
          <button className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            View collection
          </button>
        </Link>
      </div>
    </main>
  );
};
