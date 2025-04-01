'use server';
import { CartItem } from "@/store";
import Stripe from "stripe";
import { urlFor } from "@/sanity/lib/image";
// Define the metadata structure for orders
export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
}

interface CartItems {
  Product: CartItem["Product"];
  quantity: number;
}


// To get the api version
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined!");
}

 const stripeApiVersion = new Stripe(process.env.STRIPE_SECRET_KEY , {
  apiVersion: "2025-02-24.acacia", 
});


export async function createCheckoutSession(
  items: CartItems[],
  metadata: Metadata
) {
  try {
    // Fetch existing customer by email
    const customers = await stripeApiVersion.customers.list({
      email: metadata?.customerEmail,
      limit: 1,
    });

    // Assign customer ID if found
    const customerId = customers.data.length > 0 ? customers.data[0].id : "";

    // Construct the checkout session payload
    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata?.orderNumber,
        customerName: metadata?.customerName,
        customerEmail: metadata?.customerEmail,
        clerkUserId: metadata?.clerkUserId,
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: { enabled: true },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "USD",
          unit_amount: Math.round((item.Product.price || 0) * 100),
          product_data: {
            name: item.Product.name || "Unnamed Product",
            description: item.Product.description || "No description available.",
            metadata: { id: item.Product._id },
            // Correct
            images: Array.isArray(item.Product.image)
              ? item.Product.image.map((img:any | string) =>
                  typeof img === "string" ? img : urlFor(img).url()
                )
              : item.Product.image
                ? [urlFor(item.Product.image).url()] // Note: This needs to be an array
                : [], // Empty array instead of null
          },
        },
        quantity: item.quantity > 0 ? item.quantity : 1, // Ensure quantity is at least 1
      })),
    };

    // Attach customer ID or email
    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }

    // Create the Stripe Checkout session
    const session =
      await stripeApiVersion.checkout.sessions.create(sessionPayload);

    return session.url;
  } catch (error) {
    console.error("Error occurred while creating checkout session:", error);
    throw error;
  }
}
