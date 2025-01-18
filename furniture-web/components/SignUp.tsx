import React from "react";

export const SignUp = () => {
  return (
    <div className="w-full h-auto flex bg-[#F9F9F9] py-24">
      <main className="md:container md:mx-auto w-full flex flex-col items-center justify-center gap-12 px-6 py-12 border bg-white rounded-lg shadow-sm">
        {/* Heading Section */}
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <h1 className="text-2xl text-gray-800">
            Join the club and get the benefits
          </h1>
          <p className="text-lg text-gray-600 md:w-[470px] w-full">
            Sign up for our newsletter and receive exclusive offers on new
            ranges, sales, pop-up stores, and more.
          </p>
        </div>

        {/* Input Section */}
        <div className="flex items-center w-full md:w-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="bg-[#F9F9F9] h-[56px] w-[65%] md:w-[346px] py-2 px-4  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2A254B] transition"
          />
          <button className="w-[118px] h-[56px] py- text-center bg-[#2A254B] text-white  hover:bg-[#1E1A39] transition">
            Sign Up
          </button>
        </div>
      </main>
    </div>
  );
};
