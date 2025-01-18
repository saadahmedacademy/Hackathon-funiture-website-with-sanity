import Image from "next/image";
import React from "react";
import popularProduct from "@/jsondata/popularProduct.json";

export const PopularProduct = () => {
  return (
    <main className="md:container md:mx-auto w-full flex flex-col gap-6 py-16 px-4">
      {/* Section Heading */}
      <p className="text-2xl md:text-3xl font-sans font-semibold text-gray-800">
        Our popular products
      </p>

      {/* Responsive Scrollable Layout */}
      <div className="w-full flex justify-start items-center gap-4  overflow-x-auto scroll-smooth scrollbar-hide popular-product">
        {popularProduct.map((product) => (
          <div
            key={product.id}
            className="flex flex-col gap-4 items-start text-gray-600 shrink-0 snap-start"
          >
            {/* Product Image */}
            <div className="h-[375px]">
            <Image
              src={`${product.img}`}
              alt={product.title}
              width={305}
              height={375}
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform"

            />
              </div>
            {/* Product Title */}
            <p className="text-lg font-medium">{product.title}</p>

            {/* Product Price */}
            <p className="text-lg font-semibold">{product.price}</p>
          </div>
        ))}
      </div>

      {/* View Collection Button */}
      <div className="pt-8 mx-auto">
        <button className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
          View collection
        </button>
      </div>
    </main>
  );
};

