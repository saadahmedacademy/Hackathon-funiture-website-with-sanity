import Image from "next/image";
import React from "react";
import { NewCeremics } from "@/components/NewCeremics";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SignUp } from "@/components/SignUp";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60; // seconds

export async function generateStaticParams() {
  const query = `*[_type=='product']{
    _id
  }`;
  const slugs = await client.fetch(query);
  return slugs.map((item: { _id: string }) => ({
    id: item._id,
  }));
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Handle missing ID or invalid data fetching
  if (!id) {
    return <p className="text-2xl text-center my-auto">Loading...</p>;
  }

  let fetchData = null;
  try {
    const query = `*[_type == "product" && _id == "${id}"]  {
      name, price, _id, image, dimensions, features, description
    }[0]`;
    fetchData = await client.fetch(query);
  } catch (error) {
    console.error("Error fetching product data:", error);
  }

  if (!fetchData) {
    return <p>Item not found</p>;
  }

  return (
    <>
      <main className="w-full flex flex-col md:flex-row md:py-5 md:mx-auto h-auto">
        {/* Image Section */}
        <section className="w-full md:w-1/2 h-[400px] md:h-full">
          <Image
            src={`${urlFor(fetchData.image)}`}
            alt={fetchData.name}
            width={500}
            height={600}
            className="w-full h-full object-cover object-center"
            priority
          />
        </section>

        {/* Details Section */}
        <section className="flex flex-col items-center justify-center gap-6 py-7 px-6 md:px-14 text-gray-800 w-full md:w-1/2">
          {/* Title and Price */}
          <div className="w-full flex flex-col gap-1 text-left">
            <p className="text-2xl md:text-3xl text-black">{fetchData.name}</p>
            <p className="text-xl font-semibold">Price : {fetchData.price}$</p>
          </div>

          {/* Description */}
          <div className="w-full flex flex-col gap-2">
            <p className="text-lg font-medium">Description</p>
            <p className="text-sm md:text-base leading-relaxed">
              {fetchData.description}
            </p>
            <ul className="list-disc pl-5 text-sm md:text-base">
              {fetchData.features.map((feature: any) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Dimensions */}
          <div className="w-full flex justify-start flex-col gap-2">
            <p className="text-lg font-medium">Dimensions</p>
            <div className="grid grid-cols-2 gap-2 text-sm md:text-base">
              <p className="font-medium">Height</p>
              <p>{fetchData.dimensions.height}</p>
              <p className="font-medium">Width</p>
              <p>{fetchData.dimensions.width}</p>
              <p className="font-medium">Depth</p>
              <p>{fetchData.dimensions.depth}</p>
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
      <NewCeremics />
      <FeaturesSection />
      <SignUp />
    </>
  );
};

export default Page;
