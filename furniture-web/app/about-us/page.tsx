import Image from "next/image";
import React from "react";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SignUp } from "@/components/SignUp";

const Button = ({
  text,
  className = "",
  ariaLabel,
  onClick,
}: {
  text: string;
  className?: string;
  ariaLabel: string;
  onClick?: () => void;
}) => (
  <button
    className={`px-6 py-3 rounded-lg transition-colors ${className}`}
    aria-label={ariaLabel}
    onClick={onClick}
  >
    {text}
  </button>
);

const LandingPage = () => {
  return (
    <div className="text-[#2A254B]">
      {/* Header Section */}
      <main className="md:container mx-auto w-full h-[277px] bg-white flex flex-col md:flex-row justify-center md:justify-around items-center md:px-10 px-6 py-8">
        <p className="max-w-xl text-2xl md:text-3xl font-sans text-left">
          A brand built on the love of craftsmanship, quality, and outstanding customer service.
        </p>
        <div className="md:w-0 w-full pt-8 mx-auto md:mx-0">
          <Button
            text="View collection"
            className="w-full md:w-[190px] bg-[#F9F9F9] hover:bg-gray-100"
            ariaLabel="View our collection"
          />
        </div>
      </main>

      {/* Story Section */}
      <main className="container mx-auto py-5 px-4 h-auto md:h-[590px] flex flex-col md:flex-row gap-2">
        <section className="flex flex-col md:items-start items-center justify-center py-7 px-4 md:px-14 bg-[#2A254B] text-white md:w-1/2 w-full">
          <div className="flex flex-col items-center md:items-start gap-5 justify-center mb-6 h-full">
            <p className="text-2xl md:text-3xl pr-4 font-sans text-start leading-relaxed">
              It started with a small idea
            </p>
            <p className="text-start text-lg md:text-xl font-sans leading-relaxed">
              A global brand with local beginnings, our story began in a small studio in South London in early 2014.
            </p>
          </div>
          <Button
            text="View collection"
            className="w-full md:w-[170px] bg-[#F9F9F926] hover:bg-[#ffffff26]"
            ariaLabel="View our collection"
          />
        </section>
        <section className="md:w-1/2">
          <Image
            src="/aboutus.svg"
            alt="chair image"
            width={500}
            height={100}
            className="w-full h-full object-cover object-center"
          />
        </section>
      </main>

      {/* Service Section */}
      <main className="w-full md:mx-auto md:py-5 flex flex-col md:flex-row">
        <section className="md:w-1/2 w-full h-[300px] md:h-[600px]">
          <Image
            src="/aboutus2.svg"
            alt="A stylish chair displayed in a modern studio setup"
            width={500}
            height={600}
            className="w-full h-full object-cover object-center"
            priority
          />
        </section>
        <section className="bg-[#F9F9F9] flex flex-col items-center md:items-start justify-center py-7 px-6 md:px-14 text-gray-800 md:w-1/2 w-full h-auto md:h-[600px]">
          <div className="flex flex-col gap-5 mb-6">
            <p className="text-xl font-sans text-black leading-relaxed">
              Our service isn’t just personal, it’s actually hyper personally exquisite.
            </p>
            <p className="text-xl font-sans leading-relaxed">
              When we started Avion, the idea was simple: make high-quality furniture affordable and available for the mass market.
            </p>
            <p className="text-xl font-sans leading-relaxed">
              Handmade, and lovingly crafted furniture and homeware is what we live, breathe, and design, making our Chelsea boutique the hub for the London interior design community.
            </p>
          </div>
          <Button
            text="Get in touch"
            className="w-full md:w-[170px] border border-gray-300 bg-white hover:bg-gray-100"
            ariaLabel="Get in touch"
          />
        </section>
      </main>

      {/* Features and Signup Section */}
      <FeaturesSection />
      <SignUp />
    </div>
  );
};

export default LandingPage;
