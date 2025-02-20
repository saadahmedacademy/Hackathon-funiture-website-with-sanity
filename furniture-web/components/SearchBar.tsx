'use client';
import { Search, X } from "lucide-react";
import React, { useCallback, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from "./ui/input";
import { client } from "@/sanity/lib/client";

export const SearchBar = () => {
    const [search , setSearch] = useState<string>('');
    const [products , setProducts] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showSearch , setShowSearch] = useState<boolean>(false);

    const fetchProduct = useCallback(async ()=> {
        
        if(!search) {
            setProducts([]);
            return;
        }
        setLoading(true);
        try {
            const quary = `*[_type == "product" && name match $search] | order(name asc)`;
            const params = { search: `${search}*` };
            const data = await client.fetch(quary , params);
            setProducts(data);
            console.log(`Searcg product data :\n ${products}`)

        } catch (error) {
            console.log("Any error accured while searching the product\n" ,error);
        }
        finally {
            setLoading(false);
        }
    },[])


  return (
   <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>

    <DialogTrigger onClick={() => setShowSearch(!showSearch)}>
        <Search className="w-5 h-5 hover:text-darkColor hoverEffect"  />
    </DialogTrigger>

    <DialogContent className="max-w-5xl h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
            <DialogTitle className="mb-1">Product Searchbar</DialogTitle>

            <form className="relative">
                <Input placeholder="Search your product ..." className="flex-1" 
                 value={search} onChange={(e) => setSearch(e.target.value)}/>
                {search && <X className="w-4 h-4 absolute top-2.5 right-11 hoverEffect hover:ring-1 hover:text-red-600" onClick={() => setSearch('')}/>}
                 <button  
                 type="submit"
                 className={`absolute top-0 right-0 w-9 h-9 flex justify-center items-center
                 text-black rounded-br-lg rounded-tr-lg hoverEffect ${search && "bg-black text-white"}`}>
                    <Search className="" />
                 </button>
            </form>
        </DialogHeader>

        <section className="w-full h-full overflow-y-scroll border 
        border-gray-300 rounded-md">
            <p className="">Searching is on progress</p>
        </section>
    </DialogContent>
   </Dialog>
  )
}

