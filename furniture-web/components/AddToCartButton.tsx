"use client";

import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
  product: CeramicsItems;
}

export const AddToCartButton = ({ product }: Props) => {
  const [itemCount, setItemCount] = useState(0);

  // Reset count if product changes
  useEffect(() => {
    setItemCount(0);
  }, [product]);

  return itemCount > 0 ? (
    <main className="w-full text-sm">
      <section className="flex justify-between items-center">
        <span className="text-xm text-mutedforeground">Quantity:</span>
        <div className="flex items-center text-base gap-2 py-1">
          <button
            onClick={() => setItemCount((prev) => Math.max(prev - 1, 0))}
            className="QuantityButton border border-gray-300 p-1 rounded-md"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-base font-semibold w-5 text-center">
            {itemCount}
          </span>
          <button
            onClick={() => setItemCount((prev) => prev + 1)}
            disabled={itemCount >= product.quantity}
            className={`QuantityButton border border-gray-300 p-1 rounded-md ${
              itemCount >= product.quantity ? "opacity-50 cursor-not-allowed" : ""
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
      onClick={() => setItemCount(1)}
      className={`px-6 py-3 w-full border border-gray-300 rounded-lg transition-all ${
        product.quantity === 0
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
      }`}
      disabled={product.quantity === 0}
    >
      {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
    </button>
  );
};
