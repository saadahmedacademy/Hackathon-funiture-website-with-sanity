"use client"; // This makes it a Client Component

import React from "react";
import useCartStore from "@/store"; // Zustand store
import { CeramicsItems } from "@/typings";
import Link from "next/link";

const AddToCartForDetailPage = ({ item }: { item: CeramicsItems }) => {
  const { addItem } = useCartStore();

  return (
   <Link href={"/shopping-carts"}
   onClick={() => addItem(item)}
   className="px-6 py-2 lg:w-[170px] w-[90%] flex justify-center items-center rounded-md bg-blue-600 text-white text-sm md:text-base">     
      Add To Cart
    </Link>
  );
};

export default AddToCartForDetailPage;
