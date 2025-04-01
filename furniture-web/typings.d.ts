import { ShoppingBasketIcon } from "lucide-react";

export type Invoice = {
  id: string;
  invoice_number: string | undefined;
  invoice_url: string;
};

export type ProductItem = {
  product: {
    _ref: string; // Reference to the product document
    _type: "reference";
  };
  quantity: number;
};

export type OrderStatus = "paid" | "shipped" | "delivered" | "cancelled";

export type OrderSchemaType = {
  _id: string;
  orderNumber: string;
  invoice: Invoice;
  stripeCheckoutSessionId?: string;
  stripeCustomerId: string;
  clerkUserId: string;
  customerName: string;
  customerEmail: string;
  stripePaymentIntentId: string;
  products: ProductItem[];
  totalPrice: number;
  currency: string;
  amountDiscount: number;
  orderDate: string; // ISO string format
  orderStatus: OrderStatus;
};

// Preview helper function
export const getOrderPreview = (order: Order) => {
  const orderIdSnippet = `${order.orderNumber.slice(0, 5)}...${order.orderNumber.slice(-5)}`;
  return {
    title: `${order.customerName} (${orderIdSnippet})`,
    subtitle: `${order.totalPrice} ${order.currency}, ${order.customerEmail}`,
    media: ShoppingBasketIcon,
  };
};



type CeramicsItems = {
  name: string;
  price: number;
  quantity: number;
  discount: number;
  description: string;
  _id: string;
  image: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
};

interface ProductDetail {
  _id: string;
  name: string;
  price: number;
  image: string;
  dimensions: string;
  features: string[];
  description: string;
  quantity: number;
  discount: number;
}
