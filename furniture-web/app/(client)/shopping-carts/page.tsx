"use client";
import GlobalLoading from "@/components/GlobalLoading";
import { urlFor } from "@/sanity/lib/image";
import useCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Page = () => {
   
  const [isClient, setIsClient] = useState(false);
  const user = useUser();
  const { isSignedIn } = useAuth();

  const {
    items,
    getSubTotalPrice,
    getItemCount,
    removeCartItem,
    addItem,
    removeItem,
  } = useCartStore();


  useEffect(() => {
    setIsClient(true);
  },[]);

  // if product page is loading 
  if(!isClient){
    return <GlobalLoading/>
  }

  return (
    isSignedIn ? (
    <div className="w-full bg-[#F9F9F9] text-[#2A254B] min-h-screen">
    <main className="md:container mx-auto flex flex-col px-6 py-10 gap-6">
      <section className="w-full">
        <h1 className="text-3xl font-semibold">Your Shopping Cart</h1>
      </section>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Your cart is empty.
        </p>
      ) : (
        <>
          {/* Table layout for larger screens */}
          <div className="hidden sm:block">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-md pb-2">Product</th>
                  <th className="text-md pb-2">Quantity</th>
                  <th className="text-md pb-2">Total</th>
                  <th className="text-md pb-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.Product._id} className="border-b">
                    <td className="flex gap-4 items-center py-4">
                      <Image
                        src={urlFor(item.Product.image).url()}
                        alt={`Image of ${item.Product.name}`}
                        width={100}
                        height={100}
                        className="object-cover rounded-md"
                      />
                      <div>
                        <p className="text-lg font-semibold">
                          {item.Product.name}
                        </p>
                        
                        <p className="text-md font-medium">
                          ${item.Product.price.toFixed(2)}
                        </p>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="text-md flex items-center gap-1">
                        <p>Quantity:</p>
                        <div className="flex items-center text-base gap-2 py-1">
                          <button
                            onClick={() => removeItem(item.Product._id)}
                            className="border border-gray-300 p-1 rounded-md disabled:opacity-50"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-base font-semibold w-5 text-center">
                            {getItemCount(item.Product._id)}
                          </span>
                          <button
                            onClick={() => {
                              addItem(item.Product);
                              toast.success(
                                `${item.Product.name.substring(0, 12)}... added successfully`
                              );
                            }}
                            className="border border-gray-300 p-1 rounded-md disabled:opacity-50"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="text-center font-semibold">
                      ${(
                        item.Product.price * getItemCount(item.Product._id)
                      ).toFixed(2)}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => removeCartItem(item.Product._id)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for smaller screens */}
          <div className="block sm:hidden space-y-4">
            {items.map((item) => (
              <div
                key={item.Product._id}
                className="flex flex-col gap-4 p-4 bg-white rounded-md shadow-md"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={urlFor(item.Product.image).url()}
                    alt={`Image of ${item.Product.name}`}
                    width={80}
                    height={80}
                    className="object-cover rounded-md"
                  />
                  <div>
                    <p className="text-lg font-semibold">
                      {item.Product.name}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-md flex items-center gap-1">
                    <p>Quantity:</p>
                    <div className="flex items-center text-base gap-2 py-1">
                      <button
                        onClick={() => removeItem(item.Product._id)}
                        className="border border-gray-300 p-1 rounded-md disabled:opacity-50"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-base font-semibold w-5 text-center">
                        {getItemCount(item.Product._id)}
                      </span>
                      <button
                        onClick={() => {
                          addItem(item.Product);
                          toast.success(
                            `${item.Product.name.substring(0, 12)}... added successfully`
                          );
                        }}
                        className="border border-gray-300 p-1 rounded-md disabled:opacity-50"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-md font-medium">
                    $
                    {(
                      item.Product.price * getItemCount(item.Product._id)
                    ).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeCartItem(item.Product._id)}
                  className="text-red-500 hover:underline self-end"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <section className="w-full flex justify-end">
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3">
                <p className="text-xl font-semibold">Subtotal</p>
                <p className="text-xl font-bold">
                  ${getSubTotalPrice().toFixed(2)}
                </p>
              </div>

              <p className="text-gray-500 text-end text-sm">
                Taxes and shipping are calculated at checkout.
              </p>

              <button className="bg-[#2A254B] text-white w-full md:w-[200px] py-3 px-6 rounded-md hover:bg-white hover:text-[#2A254B] border border-[#2A254B] transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </section>
        </>
      )}
    </main>
  </div>
   ) : (<p>Cart is empty</p>)
  );
};

export default Page;
