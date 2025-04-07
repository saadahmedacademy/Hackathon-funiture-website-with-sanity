"use client";

import { cn } from "@/lib/utils";
import useCartStore from "@/store";
import { CeramicsItems } from "@/typings";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  product: CeramicsItems;
  className?: string;
}

export const AddToCartButton = ({ product }: Props) => {
  const { addItem, removeItem, getItemCount } = useCartStore();
  const itemCount = getItemCount(product?._id);

  // Automatically show quantity panel if item is already in cart
  const [showButton, setShowButton] = useState(itemCount === 0);

  const handleAddProduct = () => {
    addItem(product);
    toast.success(`${product?.name.substring(0, 12)}... added successfully`);
  };

  const handleRemoveProduct = () => {
    removeItem(product?._id);
    toast.success(`${product?.name.substring(0, 12)}... removed successfully`);
  };

  return showButton ? (
    <button
      onClick={() => {
        handleAddProduct();
        setShowButton(false);
      }}
      className={cn(
        `px-6 py-3 w-full border border-gray-300 rounded-lg transition-all duration-300 
        ${
          product.quantity === 0
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
        }`
      )}
      disabled={product.quantity === 0}
    >
      {product.quantity === 0
        ? "Out of Stock"
        : `Add to Cart ${itemCount > 0 ? `(${itemCount})` : ""}`}
    </button>
  ) : (
    <main className="w-full text-sm transition-all duration-300">
      <section className="grid grid-cols-1 sm:flex sm:justify-between sm:items-center gap-2 w-full">

      <div className="flex flex-wrap items-center justify-between gap-3 w-full">
  <span className="text-sm text-muted-foreground">Quantity:</span>
  <button className="p-2 rounded-full border ml-auto sm:ml-0" onClick={() => setShowButton(true)}>
    Done
  </button>
</div>

        <div className="flex items-center text-base gap-2 py-2">
          <button
            onClick={handleRemoveProduct}
            aria-label="Decrease quantity"
            className={cn(
              `border border-gray-300 p-1 text-black rounded-md disabled:opacity-50 
              ${itemCount <= 1 ? "border-gray-200 bg-gray-400 cursor-not-allowed" : "bg-white"}`
            )}
            disabled={itemCount === 0}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-base font-semibold w-5 text-center">
            {itemCount}
          </span>
          <button
            onClick={handleAddProduct}
            className="border border-gray-300 p-1 rounded-md disabled:opacity-50 hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </section>

      <div className="flex justify-between items-center border border-gray-300 bg-gray-50 p-2 w-full mt-3 rounded-md">
        <span className="text-gray-600 font-medium">Subtotal:</span>
        <span className="text-black font-semibold">
          ${(product.price * itemCount).toFixed(2)}
        </span>
      </div>
    </main>
  );
};
