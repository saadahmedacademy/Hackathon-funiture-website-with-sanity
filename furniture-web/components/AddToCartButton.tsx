"use client";

import { cn } from "@/lib/utils";
import useCartStore from "@/store";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  product: CeramicsItems;
  className?: string;
}

export const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, removeItem, getItemCount } = useCartStore();
  const itemCount = getItemCount(product?._id);

  // State to control showing Add to Cart button or Quantity panel
  const [showButton, setShowButton] = useState(true);

  // Function to reset the state back to "Add to Cart"
  const resetToAddButton = () => setShowButton(true);

  const handleAddProduct = () => {
    addItem(product);
    toast.success(`${product?.name.substring(0, 12)}... added successfully`);
    resetToAddButton(); // Switch back to Add to Cart button
  };

  const handleRemoveProduct = () => {
    removeItem(product?._id);
    toast.success(`${product?.name.substring(0, 12)}... removed successfully`);
    resetToAddButton(); // Switch back to Add to Cart button
  };

  return showButton ? (
    <button
      onClick={() => setShowButton(false)} // Switch to quantity panel on click
      className={cn(
        `px-6 py-3 w-full border border-gray-300 rounded-lg transition-all 
        ${product.quantity === 0 ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
        : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"}`
      )}
      disabled={product.quantity === 0}
    >
{product.quantity === 0 
  ? "Out of Stock" 
  : `Add to Cart ${itemCount > 0 ? `(${itemCount})` : ""}`}
    </button>
  ) : (
    <main className="w-full text-sm">
      <section className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Quantity:</span>
        <div className="flex items-center text-base gap-2 py-1">
          <button
            onClick={handleRemoveProduct}
            className="border border-gray-300 p-1 rounded-md disabled:opacity-50"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-base font-semibold w-5 text-center">{itemCount}</span>
          <button
            onClick={handleAddProduct}
            className="border border-gray-300 p-1 rounded-md disabled:opacity-50"
            aria-label="Increase quantity"
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
  );
};
