import OrderComponents from "@/components/OrderComponents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requiredUser } from "@/hooks/requiredUser";
import { client } from "@/sanity/lib/client";
import { OrderSchemaType } from "@/typings";
import { auth } from "@clerk/nextjs/server";
import { FileX } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const OrdersPage = async () => {
  await requiredUser();
  const { userId } = (await auth()) || {}; // Ensure it's not undefined

  if (!userId) {
    console.log("No user found in Clerk auth");
    return redirect("/");
  }

  const getMyOrders = async (userId: string) => {
    const MY_ORDERS_QUERY = `
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
      orderNumber,
      orderDate,
      customerName,
      customerEmail,
      currency,
      totalPrice,
      invoice { invoice_number, invoice_url },
      orderStatus,
      products[] { 
        product-> { 
          name, 
          price, 
          image { asset->{ _id, url } },
        },
        quantity
      }
    }
  `;
    
  

    try {
      const orders : OrderSchemaType[] = await client.fetch(MY_ORDERS_QUERY, { userId });
      return orders || [];
    } catch (error) {
      console.log("Error while fetching orders:", error);
      return [];
    }
  };

  const orders : OrderSchemaType[] = await getMyOrders(userId);

  return (
    <main className="container mx-auto py-10 px-4 ">
      {orders.length ? (
        <>
          <Card className="w-full ">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-semibold">
                Order List
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ScrollArea className="w-full ">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {[
                        "Order Number",
                        "Date",
                        "Customer",
                        "Email",
                        "Total",
                        "Invoice No",
                        "Status",
                      ].map((heading) => (
                        <TableHead
                          key={heading}
                          className={`w-auto ${heading === "Date" ? "hidden md:table-cell" : heading === "Email" ? "hidden md:table-cell" : heading === "Invoice No" && "hidden sm:table-cell" }`}
                        >
                          {heading}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <OrderComponents orders={orders}/>
                    <ScrollBar orientation="horizontal"/>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-5 md:py-10 px-4">
          <FileX className="w-24 h-24 text-gray-400 text-xl font-medium mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600">
            No order is available
          </h2>
          <p className="text-gray-600 text-center mb-2">
            You haven&apose;t placed any orders yet. Let's check out our
            products and place an order.
          </p>
          <Link href={"/productlisting"}>
            <button className="py-1.5 px-4 rounded-md  bg-[#2A254B] text-white">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </main>
  );
};

export default OrdersPage;
