import { Metadata } from "@/action/createCheckoutSession";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined!");
}

const stripeApiVersion = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headerList = await headers();
  const sig = headerList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 }
    );
  }

  const stripeWebhook = process.env.STRIPE_WEBHOOK_KEY;

  if (!stripeWebhook) {
    console.log("Missing stripe webhook key");
    return NextResponse.json(
      { error: "Missing stripe webhook key" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripeApiVersion.webhooks.constructEvent(body, sig, stripeWebhook);
    console.log("Verified Stripe Event:", event);
  } catch (error) {
    console.error("Error verifying webhook signature:", error);
    return NextResponse.json(
      { error: `Webhook Error: ${error}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    console.log("Checkout Session Completed Event:", event);
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const invoiceId = session.invoice as string | undefined;
      const invoice = invoiceId
        ? await stripeApiVersion.invoices.retrieve(invoiceId)
        : null;
      
      await createOrderInSanity(session, invoice);
    } catch (error) {
      console.error("Error while creating order in Sanity:", error);
      return NextResponse.json(
        { error: "Error while creating order in Sanity" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

async function createOrderInSanity(
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null
) {
  const {
    id,
    amount_total,
    currency,
    metadata = {},
    total_details,
    payment_intent,
  } = session;

  const { customerName, customerEmail, orderNumber, clerkUserId } =
    metadata as unknown as Metadata;

  const lineItemsWithProduct =
    await stripeApiVersion.checkout.sessions.listLineItems(id, {
      expand: ["data.price.product"],
    });

  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id || "",
    },
    quantity: item?.quantity || 1,
  }));

   const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customerEmail,
    customerEmail,
    currency,
    amountDiscount: total_details ? total_details.amount_discount / 100 : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    orderStatus: "paid",
    orderDate: new Date().toISOString(),
    invoice: invoice
      ? {
          id: invoice.id,
          invoice_number: invoice.number,
          invoice_url: invoice.hosted_invoice_url,
        }
      : null,
    clerkUserId,
  });

  return order;
}
