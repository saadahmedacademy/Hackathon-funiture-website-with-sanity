import stripe from "@/lib/stripe";
import { CartItem } from "@/store";

// Define the types of parameters
export interface MetaData {
    orderNumber : string,
    customerName :string,
    customerEmail : string,
    clerkUserId : string | undefined
}


export async function createCheckoutSession(items:CartItem[], metaData:MetaData) {
 const customer = await stripe.customers.list({
    email:metaData?.customerEmail,
    limit: 1,
 })
}