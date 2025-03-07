"use client";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const SearchBar = () => {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  useEffect(() => {
    if (!search) {
      setProducts([]);
      return;
    }

    setLoading(true);
    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && name match $search] | order(name asc) {
            _id,
            name,
            price,
            image,
            quantity 
        }`;
        const params = { search: `${search}*` };
        const data = await client.fetch(query, params);
        setProducts(data);
      } catch (error) {
        console.log("Error while searching for products:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchProduct, 300);
    return () => clearTimeout(debounceTimer);
  }, [search]);

  return (
    <Dialog open={showSearch} onOpenChange={setShowSearch}>
      <DialogTrigger onClick={() => setShowSearch(true)}>
        <Search className="w-5 h-5 hover:text-darkColor hoverEffect" />
      </DialogTrigger>

      <DialogContent className="max-w-5xl h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="mb-1">Product Searchbar</DialogTitle>
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder="Search your product ..."
              className="flex-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <X
                className="w-4 h-4 absolute top-2.5 right-11 hoverEffect hover:ring-1 hover:text-red-600 cursor-pointer"
                onClick={() => setSearch("")}
              />
            )}
            <button
              type="submit"
              className={`absolute top-0 right-0 w-9 h-9 flex justify-center items-center text-black rounded-br-lg rounded-tr-lg hoverEffect ${
                search && "bg-black text-white"
              }`}
            >
              <Search />
            </button>
          </form>
        </DialogHeader>

        <section className="w-full min-h-[30vh] max-h-[80vh] overflow-y-scroll border border-gray-300 shadow-md rounded-md p-2">
          {loading ? (
            <p className="text-xl text-yellow-600 text-left font-medium px-2 py-3 flex items-center gap-2">
              <Loader2 className="animate-spin" /> Searching in progress...
            </p>
          ) : search ? (
            products.length > 0 ? (
              products.map((product) => (
                <Link href={`/product-detail/${product._id}`}>
                  <div
                    key={product._id}
                    onClick={() => {
                      setShowSearch(false);
                      setSearch("");
                    }}
                    className="flex items-center gap-2 p-1 border-b h-[160px]"
                  >
                    <div className="w-20 md:w-28 h-full flex-shrink-0">
                      {product.image && (
                        <Image
                          src={urlFor(product.image).url()}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="w-full h-full"
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-center flex-grow px-4 py-2">
                      <p
                        onClick={() => setShowSearch(false)}
                        className="font-semibold text-sm md:text-lg text-gray-800 hover:underline"
                      >
                        {product.name}
                      </p>
                      <p>Price: ${product.price}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-xl text-red-600 flex flex-col items-center justify-center font-medium mt-1 h-full">
                No matches found for "{search}".{" "}
                <p>Please try something else</p>
              </div>
            )
          ) : (
            <p className="text-xl text-green-600 text-center font-medium flex flex-col sm:flex-row justify-center items-center h-full ">
            <Search className="w-5 h-5 sm:mr-2 sm:mb-0 mb-4" />
            Explore amazing products on Avion
          </p>
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
};
