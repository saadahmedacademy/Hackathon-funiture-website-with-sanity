import { ShoppingBasketIcon } from "lucide-react";
import { defineField, defineType, defineArrayMember } from "sanity";

export const orderTypes = defineType({
  name: "order",
  title: "Order Status",
  type: "document",
  icon: ShoppingBasketIcon,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "invoice",
      title: "Invoice",
      type: "object",
      fields: [
        { name: "id", type: "string" },
        { name: "invoice_number", type: "string" },
        { name: "invoice_url", type: "url" },
      ],
    }),
    defineField({
      name: "stripeCheckoutSessionId",
      title: "Stripe Checkout Session ID",
      type: "string",
    }),
    defineField({
      name: "stripeCustomerId",
      title: "Stripe Customer ID",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clerkUserId",
      title: "Clerk User ID",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "products",
      title: "Bought Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product Bought",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              title: "Quantity Purchased",
              type: "number",
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              image: "product.image",
              price: "product.price",
            },
            prepare(select) {
              return {
                title: `${select.product} x ${select.quantity}`,
                subtitle: `${select.price * select.quantity}`,
                media: select.image,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "amountDiscount",
      title: "Amount Discount",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "orderStatus",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    }),
  ],
  preview: {
   select :{
    name: 'customerName',
    amount: 'totalPrice',
    currency:'currency',
    orderId : 'orderNumber',
    email: 'customerEmail',
   },
   prepare(select){
    const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`
    return {
      title: `${select.name} (${orderIdSnippet})`,
      subtitle: `${select.amount} ${select.currency}, ${select.email}`,
      media:ShoppingBasketIcon
    }
   }
  }
});
