import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { SearchBar } from "./SearchBar";

export const Navbar = async () => {

  const user  = await currentUser();
  return (
    <header className="flex flex-col w-full bg-white">
      {/* Top Navigation Bar */}
      <nav className="h-1/2 border-b w-full flex items-center justify-between px-4 py-2 gap-2">
        <span className="md:flex hidden" aria-label="Search">
          <SearchBar />
        </span>

        <Link href={"/"}>
          <h1 className="text-[24px] text-[#22202E]" aria-label="Logo">Avion</h1>
        </Link>

        <div className="flex items-center gap-3">
          <span className="md:hidden" aria-label="Search">
            <SearchBar />
          </span>

          <Link href={"/about-us"} aria-label="User Account">
            <IoPersonCircleOutline className="text-xl" />
          </Link>

          <ClerkLoaded>
            <SignedIn>
              <Link href={"/shopping-carts"} aria-label="Shopping Cart">
                <LuShoppingCart className="text-xl" />
              </Link>

              <UserButton />
            </SignedIn>

            {!user && (
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
