import Link from "next/link";
import React from "react";
import { IoPersonCircleOutline, IoSearch } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";

export const Navbar = () => {
  return (
    <header className="flex flex-col w-full bg-white">
      {/* Top Navigation Bar */}
      <nav className="h-1/2 border-b w-full flex items-center justify-between px-4 py-2 gap-2">
        {/* Search Icon (Visible on larger screens) */}
        <Link href={"/productlisting"} className="md:flex hidden" aria-label="Search">
          <IoSearch className="text-xl" />
        </Link>

        {/* Logo */}
        <Link href={"/"}>
        <h1 className="text-[24px] text-[#22202E]" aria-label="Logo">Avion</h1>
        </Link>    

        {/* Icons Section */}
        <div className="flex items-center gap-3">
          {/* Search Icon (Visible on mobile) */}
          <Link href={"/productlisting"} className="md:hidden" aria-label="Search">
            <IoSearch className="text-xl" />
          </Link>

          {/* User Icon */}
          <Link href={"/about-us"} aria-label="User Account">
            <IoPersonCircleOutline className="text-xl" />
          </Link>

          {/* Shopping Cart Icon */}
          <Link href={"/shopping-carts"} aria-label="Shopping Cart">
            <LuShoppingCart className="text-xl" />
          </Link>
        </div>
      </nav>

      {/* Category Navigation Tags (Hidden on mobile) */}
      <div className="md:flex hidden justify-center items-center w-full py-4 h-1/2">
        <div className="flex justify-center gap-2 navtags">
          {/* Navigation Tags */}
          {[
            "Plant pots",
            "Ceramics",
            "Tables",
            "Chairs",
            "Crockery",
            "Tableware",
            "Cutlery",
          ].map((tag, index) => (
            <p
              key={index}
              className="hover:underline hover:text-gray-600 cursor-pointer"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
    </header>
  );
};
