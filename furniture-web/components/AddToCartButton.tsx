"use client";

import { cn } from "@/lib/utils";
import useCartStore from "@/store";
import { Minus, Plus } from "lucide-react";
import { title } from "process";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  product: CeramicsItems;
  className?: string;
}

export const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, removeItem, getItemCount } = useCartStore();
  const itemCount = getItemCount(product?._id);

  // To show the notification for add the item
  const handleAddProduct = () => {
    addItem(product);
    toast.success(`${product?.name.substring(0, 12)} ... added successfully`);
  };

  const handleRemoveProduct = () => {
    removeItem(product?._id);
    if (itemCount > 1) {
      toast("Quantity decreased successfully");
    } else {
      toast.success(
        `${product?.name.substring(0, 12)} ... removed successfully`
      );
    }
  };

  return itemCount > 0 ? (
    <main className="w-full text-sm">
      <section className="flex justify-between items-center">
        <span className="text-xm text-mutedforeground">Quantity:</span>
        <div className="flex items-center text-base gap-2 py-1">
          <button
            onClick={handleRemoveProduct}
            disabled={itemCount === 0 || product.quantity <= 0}
            className="QuantityButton border border-gray-300 p-1 rounded-md"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-base font-semibold w-5 text-center">
            {itemCount}
          </span>
          <button
            onClick={handleAddProduct}
            disabled={itemCount >= product.quantity}
            className={`QuantityButton border border-gray-300 p-1 rounded-md ${
              itemCount >= product.quantity
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </section>

      <div className="flex justify-between items-center border border-gray-300 p-2 w-full mt-2">
        <span>Subtotal:</span>
        <span>${(product.price * itemCount).toFixed(2)}</span>
      </div>
    </main>
  ) : (
    <button
      onClick={handleAddProduct}
      className={cn(
        `px-6 py-3 w-full border border-gray-300 rounded-lg transition-all ${
          product.quantity === 0
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
        }`
      )}
      disabled={product.quantity === 0}
    >
      {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
    </button>
  );
};
