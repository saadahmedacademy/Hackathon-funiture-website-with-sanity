import Image from "next/image";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export default async function Page() {

    const query = `*[_type == "product"]{
    name, price, _id ,image
    }`;
    
   const fatchData = await client.fetch(query);

  return (
    <main className="w-full">
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
          <h1 className="md:text-3xl text-2xl font-semibold text-white">All Products</h1>
        </div>
      </section>

      <section className="container mx-auto md:flex hidden justify-between items-center py-6 px-2 ">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <p className="text-xl">Category</p>
            <IoMdArrowDropdown />
          </div>

          <div className="flex items-center gap-2">
            <p className="text-xl">Product type</p>
            <IoMdArrowDropdown />
          </div>

          <div className="flex items-center gap-2">
            <p className="text-xl">Price</p>
            <IoMdArrowDropdown />
          </div>

          <div className="flex items-center gap-2">
            <p className="text-xl">Brand</p>
            <IoMdArrowDropdown />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-xl">Sorting by:</p>
          <div className="flex items-center gap-2">
            <p className="text-xl">Date added</p>
            <IoMdArrowDropdown />
          </div>
        </div>
      </section>

      <section className="w-full flex md:hidden justify-center items-center gap-4 py-4 ">
        <button
          className="flex items-center gap-3 px-5 py-2 bg-[#F3F4F6] border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
          aria-label="Open Filters"
        >
          <p className="text-xl">Filters</p>
          <IoMdArrowDropdown />
        </button>

        <button
          className="flex items-center gap-3 px-5 py-2 bg-[#F3F4F6] border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
          aria-label="Open Filters"
        >
          <p className="text-xl">Sorting</p>
          <IoMdArrowDropdown />
        </button>
      </section>

      <section className="sm:container mx-auto w-full md:px-0 px-2 py-4">
        <div className="w-full grid grid-cols-2 md:grid-rows-3 grid-rows-4 md:grid-cols-4 gap-y-16 gap-6">
          {fatchData.map((ceramic : CeramicsItems) => (
            <Link href={`/product-detail/${ceramic._id}`} key={ceramic._id}>
            <div
              key={ceramic._id}
              className="flex flex-col gap-4 items-start text-gray-600 h-[460px]"
            >
                <div className="h-[378px] w-[305px]">
              {/* Ceramic Image */}
              <Image
                src={`${urlFor(ceramic.image)}`}
                alt={ceramic.name}
                width={305}
                height={375}
                className="rounded-lg shadow-sm h-full"
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
      </section>

      <div className="py-8 flex justify-center">
        <button className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
          View collection
        </button>
      </div>
    </main>
  );
}
