import { Card } from "@/components/ui/card";
import { requiredUser } from "@/hooks/requiredUser";
import { client } from "@/sanity/lib/client";
import { auth } from "@clerk/nextjs/server";
import { FileX } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const OrdersPage = async () => {
  await requiredUser();
  const { userId } = await auth() || {}; // Ensure it's not undefined

  if (!userId) {
    console.log("No user found in Clerk auth");
     return redirect("/");
  }

  const getMyOrders = async (userId: string) => {
    const MY_ORDERS_QUERY = `
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
      products[] {
        product-> { orderNumber, customerName, customerEmail }
      }
    }
  `;
  
    try {
      const orders = await client.fetch(MY_ORDERS_QUERY, { userId });
      return orders || []; 
    } catch (error) {
      console.log("Error while fetching orders:", error);
      return [];
    }
  };

  const orders = await getMyOrders(userId);
  console.log("orders", orders);

  return (
   <main className="container mx-auto py-10 px-4 ">

   { !orders.length ? (
      <Card>
        <p className="">Here is your order history</p>
      </Card>
    ):(
      <div className="flex flex-col items-center justify-center py-5 md:py-10 px-4">
        <FileX  className="w-24 h-24 text-gray-400 text-xl font-medium mb-4"/>
        <h2 className="text-2xl font-semibold text-gray-600">No order is available</h2>
        <p className="text-gray-600 text-center mb-2">You haven&apose;t placed any orders yet.
        Let's check out our products and place an order.
        </p>
        <Link href={"/productlisting"}>
        <button className="py-1.5 px-4 rounded-md  bg-[#2A254B] text-white">Shop Now</button>
        </Link>
      </div>
    )
  }
   </main> 
  );
};


export default OrdersPage;
