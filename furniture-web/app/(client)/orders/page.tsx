import { requiredUser } from "@/hooks/requiredUser";
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

const OrdersPage = async () => {
  await requiredUser();

  const getMyOrders = async (userId: string) => {
    if (!userId) {
      throw new Error("User id not found");
    }

    const MY_ORDERS_QUERY =
      defineQuery(`*[_type == "order && clerkUserId == $userId] | order(orderDate desc){
      ...products[]{
      ...product->
      }
      }`);

      try {
        const orders = await client.fetch(MY_ORDERS_QUERY, { userId });
         
        return orders?.data || []
        
      } catch (error) {
        console.log(`Error while fatching orders \n ${error}`)
        return []
      }
  };

  return <div>Give Order</div>;
};

export default OrdersPage;
