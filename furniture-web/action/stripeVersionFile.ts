'use server';
import Stripe from "stripe";

// To get the api version
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined!");
}

 const stripeApiVersion = new Stripe(process.env.STRIPE_SECRET_KEY , {
  apiVersion: "2025-02-24.acacia", 
});

export default stripeApiVersion