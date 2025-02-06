"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Page = () => {
  interface Product {
    id: string;
    title: string;
    heading: string;
    price: string;
    img: string;
  }

  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    setProductList([
      {
        id: "1",
        title: "Graystone vase",
        heading: "A timeless ceramic vase with a tri-color grey glaze",
        price: "£85",
        img: "/popularProduct/product3.svg",
      },
      {
        id: "2",
        title: "Basic white vase",
        heading: "Beautiful and simple, this is one for the classics",
        price: "£125",
        img: "/popularProduct/product4.svg",
      },
    ]);
  }, []);

  return (
    <div className="w-full bg-[#F9F9F9] text-[#2A254B]">
      <main className="md:container mx-auto flex flex-col px-6 py-10 gap-4">
        <section className="w-full">
          <h1 className="text-3xl">Your shopping cart</h1>
        </section>

        <section className="w-full flex flex-col py-6 gap-3">
          <div className="hidden sm:block">
            {/* Table for larger screens */}
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="text-md">Product</th>
                  <th className="text-md">Quantity</th>
                  <th className="text-md sm:hidden md:table-cell">Total</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="flex gap-2 items-center">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={109}
                        height={134}
                        className="object-center object-cover"
                      />
                      <div className="px-4 py-2">
                        <p className="text-xl">{item.title}</p>
                        <p className="text-md">{item.heading}</p>
                        <p className="text-md">{item.price}</p>
                      </div>
                    </td>
                    <td className="text-center">1</td>
                    <td className="text-center hidden sm:table-cell">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card view for smaller screens */}
          <div className="block sm:hidden">
            {productList.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 p-4 bg-white rounded-md shadow-md"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="object-center object-cover rounded-md"
                  />
                  <div>
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.heading}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-md font-medium">Quantity: 1</p>
                  <p className="text-md font-medium">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="md:container w-full pr-2 mx-auto flex justify-end item-center">
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-3">
              <p className="text-xl">Subtotal</p>
              <p className="text-xl">£210</p>
            </div>

            <p className="text-gray-500 text-end">Taxes and shipping are calculated at checkout</p>

            <button className=" bg-[#2A254B] text-white md:w-[172px] w-[93%] py-3 px-10 md:py-4 md:px-6 hover:bg-white hover:text-[#2A254B] transition-colors">
              View collection
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
