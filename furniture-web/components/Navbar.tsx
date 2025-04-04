'use client';

import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { SearchBar } from "./SearchBar";
import { ShoppingCartIcon } from "./ShoppingCartIcon";
import { ShoppingBag } from "lucide-react";

export const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="flex flex-col w-full bg-white sticky top-0 z-50">
      {/* Top Navigation Bar */}
      <nav className="h-1/2 border-b w-full flex items-center justify-between px-4 py-2 gap-2">
        <span className="md:flex hidden" aria-label="Search">
          <SearchBar />
        </span>

        <Link href={"/"}>
          <h1 className="text-[24px] text-[#22202E]" aria-label="Logo">
            Avion
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          <span
            className="md:hidden h-full flex items-center"
            aria-label="Search"
          >
            <SearchBar />
          </span>

          <Link href={"/about-us"} aria-label="User Account">
            <IoPersonCircleOutline className="text-xl md:text-2xl" />
          </Link>

          <Link href={"/shopping-carts"} aria-label="Shopping Cart">
            <ShoppingCartIcon SignIn={isSignedIn} />
          </Link>

          <Link href={"/orders"} aria-label="Shopping Cart">
            <ShoppingBag />
          </Link>

          <ClerkLoaded>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="px-2 py-1 bg-black rounded-md text-white loginButton">
                  Login
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </nav>
    </header>
  );
};
