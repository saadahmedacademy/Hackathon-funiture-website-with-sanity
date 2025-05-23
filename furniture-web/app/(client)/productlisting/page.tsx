import Image from "next/image";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { AddToCartButton } from "@/components/AddToCartButton";
import { CeramicsItems } from "@/typings";

export default async function Page() {
  const query = `*[_type == "product"]{
    name, price, _id ,image
  }`;

  const fetchData = await client.fetch(query);

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="w-full h-[209px] relative">
        <Image
          src="/productList.svg"
          alt="Banner showcasing all products"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          quality={75}
          priority
        />

        <div className="lg:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
          <h1 className="md:text-3xl text-2xl font-semibold text-white">
            All Products
          </h1>
        </div>
      </section>

      {/* Filters & Sorting (Hidden on Small Screens) */}
      <section className="container mx-auto md:flex hidden justify-between items-center py-6 px-2">
        <div className="flex items-center gap-3">
          {["Category", "Product type", "Price", "Brand"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <p className="text-xl">{item}</p>
              <IoMdArrowDropdown />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <p className="text-xl">Sorting by:</p>
          <div className="flex items-center gap-2">
            <p className="text-xl">Date added</p>
            <IoMdArrowDropdown />
          </div>
        </div>
      </section>

      {/* Mobile Filters & Sorting */}
      <section className="w-full flex md:hidden justify-center items-center gap-4 py-4 flex-wrap">
        {["Filters", "Sorting"].map((item) => (
          <button
            key={item}
            className="flex items-center gap-3 px-5 py-2 bg-[#F3F4F6] border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
            aria-label={`Open ${item}`}
          >
            <p className="text-xl">{item}</p>
            <IoMdArrowDropdown />
          </button>
        ))}
      </section>

      {/* Product Grid */}
      <section className="sm:container mx-auto w-full md:px-0 px-2 py-4">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fetchData.map((ceramic: CeramicsItems) => (
            <main key={ceramic._id} className="flex flex-col space-y-2">
              <div className="flex flex-col px-1 gap-4 items-start text-gray-600 h-auto sm:h-[460px]">
                {/* Product Image */}
                <div className="w-full sm:w-[305px] h-[300px] sm:h-[378px]">
                  <Image
                    src={`${urlFor(ceramic.image)}`}
                    alt={ceramic.name}
                    width={305}
                    height={375}
                    className="rounded-lg shadow-sm w-full h-full "
                  />
                </div>

                {/* Product Details */}
                <Link href={`/product-detail/${ceramic._id}`} key={ceramic._id}>
                  <p className="text-lg font-medium hover:underline">{ceramic.name}</p>
                </Link>
                <p className="text-lg font-semibold">{ceramic.price}$</p>
              </div>
              <AddToCartButton product={ceramic} />
            </main>
          ))}
        </div>
      </section>

      {/* View Collection Button */}
      <div className="py-8 flex justify-center">
        <button className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
          View collection
        </button>
      </div>
    </main>
  );
}
