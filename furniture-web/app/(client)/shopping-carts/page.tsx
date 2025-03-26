"use client";
import GlobalLoading from "@/components/GlobalLoading";
import { NoCartAccess } from "@/components/NoCartAcess";
import { urlFor } from "@/sanity/lib/image";
import useCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { Heart, Minus, Plus, ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  createCheckoutSession,
  Metadata,
} from "@/action/createCheckoutSession";

const Page = () => {

  const [loading, setLoading] = useState<boolean>(false); 
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  const {
    items,
    getSubTotalPrice,
    getItemCount,
    removeCartItem,
    addItem,
    removeItem,
    resetCart,
    getGroupedItems,
  } = useCartStore();


  // To handle the checkout
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Guest",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "no-email@example.com",
        clerkUserId: user!.id ,
      };
      
      const checkoutUrl = await createCheckoutSession(getGroupedItems(), metadata);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
        return;
      }
      
    } catch (error) {
      console.error("Error creating checkout session:", error);
       alert("Failed to start checkout. Please try again.");
    }finally{
      setLoading(false);
    }

  };

  if(loading){
    return <GlobalLoading />
  }
 
  return isSignedIn ? (
    <div className="w-full bg-[#F9F9F9] text-[#2A254B] min-h-screen">
      <main className="md:container mx-auto flex flex-col px-6 py-10 gap-6">
        <section className="w-full">
          <h1 className="text-3xl font-semibold flex items-center gap-1.5">
            <ShoppingBag className="text-lg" /> Your Shopping Cart
          </h1>
        </section>

        {items.length === 0 ? (
          <div className="w-full min-h-[70vh] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="py-10 w-[90%] max-w-md flex flex-col items-center gap-4 shadow-lg rounded-lg bg-white"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Image
                  src="/popularProduct/emptyCard.webp" // Add an empty cart illustration
                  alt="Empty Cart"
                  width={150}
                  height={150}
                  className="opacity-80"
                />
              </motion.div>
              <p className="text-center text-lg font-semibold text-gray-700">
                Your cart is empty!
              </p>
              <p className="text-center text-sm text-gray-500 md:px-0 px-2">
                Looks like you haven’t added anything to your cart yet.
              </p>
              <Link href={"/productlisting"}>
                <button className="bg-[#2A254B] text-white px-6 py-2 rounded-md hover:bg-[#40396E] transition-colors">
                  Shop Now
                </button>
              </Link>
            </motion.div>
          </div>
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
                  {items.map((item, index) => (
                    <tr key={item.Product._id || index} className="border-b">
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
                              onClick={() => {
                                removeItem(item.Product._id);
                                toast.success(
                                  `${item.Product.name.substring(0, 12)}... removed successfully`
                                );
                              }}
                              className={`border border-gray-300 p-1 text-black rounded-md disabled:opacity-50 
                             ${getItemCount(item.Product._id) <= 1 ? "border-gray-200 bg-gray-400 cursor-not-allowed" : "bg-white"}`}
                              aria-label="Decrease quantity"
                              disabled={getItemCount(item.Product._id) <= 1}
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
                      <td className="text-center font-semibold mr-3">
                        $
                        {(
                          item.Product.price * getItemCount(item.Product._id)
                        ).toFixed(2)}
                      </td>
                      <td className="text-center md:mr-2">
                        <TooltipProvider>
                          <div className="flex items-center gap-1.5">
                            {/* For remove the card */}
                            <Tooltip>
                              <TooltipTrigger className="">
                                <Trash
                                  className="text-lg hover:text-red-600 cursor-pointer"
                                  onClick={() => {
                                    toast.success(
                                      `Product Card removed successfully`
                                    );
                                    removeCartItem(item.Product._id);
                                  }}
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Remove Card</p>
                              </TooltipContent>
                            </Tooltip>

                            {/* Add to favourite */}
                            <Tooltip>
                              <TooltipTrigger className="">
                                <Heart className="text-lg hover:text-green-600 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Add to favourite</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipProvider>
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
                  <TooltipProvider>
                    <div className="flex items-center gap-1.5">
                      {/* For remove the card */}
                      <Tooltip>
                        <TooltipTrigger className="">
                          <Trash
                            className="text-lg hover:text-red-600 cursor-pointer"
                            onClick={() => {
                              if (!item.Product?._id) {
                                toast.error("Item not found!");
                                return;
                              }
                              toast.success(`Product Card removed successfully`);
                              removeCartItem(item.Product._id);
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remove Card</p>
                        </TooltipContent>
                      </Tooltip>

                      {/* Add to favourite */}
                      <Tooltip>
                        <TooltipTrigger className="">
                          <Heart className="text-lg hover:text-green-600 cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add to favourite</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </div>
              ))}
            </div>

            {/* Order Summary Section */}
            <section className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-2/3">
                <h2 className="text-xl font-semibold border-b pb-2">
                  Order Summary
                </h2>
                <div className="flex justify-between py-2">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ${getSubTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between py-2 border-t pt-2">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-semibold text-lg">
                    ${getSubTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout and Payment Options */}
              <div className="w-full h-full md:w-1/3 flex flex-col items-center gap-3">
                {/* PayPal Logo Button */}
                <span className=" py-2 rounded-md border border-black w-full bg-white hover:bg-transparent flex justify-center items-center cursor-pointer">
                  <Image
                    src={"/PayPal.svg"}
                    width={60}
                    height={70}
                    alt="PayPal"
                    className="object-center w-auto h-[30px]"
                  />
                </span>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#2A254B] text-white py-3 rounded-md hover:bg-[#40396E] transition"
                >
                  Proceed to Checkout
                </button>

                <button
                  className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
                  onClick={() => {
                    if (
                      window.confirm("Do you really want to reset your cart?")
                    ) {
                      resetCart();
                      toast.success("Cart reset successfully!");
                    }
                  }}
                >
                  Reset Cart
                </button>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  ) : (
    <NoCartAccess />
  );
};

export default Page;
