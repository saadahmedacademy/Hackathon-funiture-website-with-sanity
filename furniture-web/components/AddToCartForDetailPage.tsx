"use client"; // This makes it a Client Component

import React from "react";
import useCartStore from "@/store"; // Zustand store

const AddToCartForDetailPage = ({ item }: { item: any }) => {
  const { addItem } = useCartStore();

  return (
    <button
      onClick={() => addItem(item)}
      className="px-6 py-2 lg:w-[170px] w-[90%] rounded-md bg-blue-600 text-white text-sm md:text-base"
    >
      Add To Cart
    </button>
  );
};

export default AddToCartForDetailPage;
