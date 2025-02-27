'use client';
import useCartStore from '@/store'
import React from 'react'
import { LuShoppingCart } from 'react-icons/lu';

export const ShoppingCartIcon = () => {
  const { items } = useCartStore();

  return (
    <div  className='group relative '>
     <LuShoppingCart className="text-xl md:text-2xl" />
     <span className="absolute -top-1.5 -right-1.5 bg-black text-white w-3 h-3 p-2 text-sm rounded-full flex items-center justify-center">
        {items ? items.length : 0 }
        </span>          
    </div>
  );
};

