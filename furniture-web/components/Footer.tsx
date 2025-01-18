import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaSkype, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <>
      <footer className="w-full h-auto bg-[#2A254B] flex flex-col text-white">
        <main className="container mx-auto border-b py-8 flex md:flex-row flex-col">
          <div className="w-full md:w-[50%] px-6 grid grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold">Menu</h2>
              <ul>
                <li>New arrivals</li>
                <li>Best sellers</li>
                <li>Recently viewed</li>
                <li>Popular this week</li>
                <li>All products</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-semibold">Categories</h2>
              <ul>
                <li>Crockery</li>
                <li>Furniture</li>
                <li>Homeware</li>
                <li>Plant pots</li>
                <li>Chairs</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-semibold">Our company</h2>
              <ul>
                <li>About us</li>
                <li>Vacancies</li>
                <li>Contact us</li>
                <li>Privacy</li>
                <li>Returns policy</li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-[50%] px-6 py-6 flex flex-col justify-start">
            <p className="mb-4 font-semibold">Join our mailing list</p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="bg-[#FFFFFF26] w-[50%] md:w-[300px] h-[48px] py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2A254B] transition"
              />
              <button
                type="submit"
                className="h-[48px] w-[116px] px-4  text-center bg-white text-black hover:bg-[#1E1A39] transition"
              >
                Sign Up
              </button>
            </div>
          </div>
        </main>

        <div className="container mx-auto p-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-lg">© 2022 Avion LTD</p>
          <div className="flex items-center gap-3">
            <FaLinkedin aria-label="LinkedIn" />
            <FaFacebook aria-label="Facebook" />
            <FaInstagram aria-label="Instagram" />
            <FaSkype aria-label="Skype" />
            <FaTwitter aria-label="Twitter" />
            <FaPinterest aria-label="Pinterest" />
          </div>
        </div>
      </footer>
    </>
  );
};
