'use client';
import { Search } from "lucide-react";
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

export const SearchBar = () => {
    const [search , setSearch] = useState<string>('');
    const [products , setProducts] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showSearch , setShowSearch] = useState<boolean>(false);
  return (
   <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>

    <DialogTrigger onClick={() => setShowSearch(!showSearch)}>
        <Search className="w-5 h-5 hover:text-darkColor hoverEffect"  />
    </DialogTrigger>

    <DialogContent>
        <DialogHeader>
            <DialogTitle>Search Product</DialogTitle>
        </DialogHeader>
    </DialogContent>
   </Dialog>
  )
}

