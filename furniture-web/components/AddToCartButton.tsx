"use client";
import { Minus, Plus } from 'lucide-react';
import React, { useState } from 'react'

interface props {
    product: CeramicsItems
}
export const AddToCartButton = ({ product }: props) => {

    const [itemCounts, setItemCount] = useState(0);
    return (
        itemCounts ? (
            <main className='w-full text-sm'>
          <section className='flex justify-between items-center'>
            <span className='text-xm text-mutedforeground'>Quantity: </span>
             <div className="flex items-center text-base gap-1 py-1">
                <button className="QuantityButton">
                    <Minus className="w-4 h-4" />
                </button>
                <span className="text-base font-semibold w-3">{itemCounts}</span>
                <button className="QuantityButton">
                    <Plus className="w-4 h-4" />
                </button>
             </div>
          </section>

          <div className='flex justify-between items-center border border-grey-300 p-1 w-full'>
            <span>Subtotal: </span>
            <span>{product.price * itemCounts}</span>
          </div>
          </main>
        ) : (
          <button
             onClick={() => setItemCount(itemCounts + 1)}
            className={`px-6 py-3 w-full border border-gray-300 rounded-lg transition-all ${product.quantity === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
            disabled={!product.quantity || product.quantity <= 0}
          >
            {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        )
      )
};

