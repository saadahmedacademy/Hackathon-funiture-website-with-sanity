'use client';
import useCartStore from '@/store'
import React from 'react'
import { LuShoppingCart } from 'react-icons/lu';

export const ShoppingCartIcon = ({ SignIn }: { SignIn?: boolean }) => {
  const { items } = useCartStore();

  return (
    <div className="group relative">
      <LuShoppingCart className="text-xl md:text-2xl" />
      {SignIn && (
        <span className="absolute -top-1.5 -right-1.5 bg-black text-white w-5 h-5 text-xs rounded-full flex items-center justify-center">
          {items.length || 0}
        </span>
      )}
    </div>
  );
};
