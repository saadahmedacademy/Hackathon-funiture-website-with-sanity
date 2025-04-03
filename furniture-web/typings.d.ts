import exp from "constants";
import { ShoppingBasketIcon } from "lucide-react";


export type OrderStatus = "paid" | "shipped" | "delivered" | "cancelled";

// Represents the data returned by the query (Order)
export interface OrderSchemaType {
  orderNumber: string;
  orderDate: string; // ISO String or Date
  customerName: string;
  customerEmail: string;
  currency: string;
  totalPrice: number;
  invoice: {
    invoice_number: string;
    invoice_url: string;
  };
  orderStatus: string;
  products: {
    product: {
      name: string;
      price: number;
      quantity: number;
      image: {
        asset: {
          _id: string;
          url: string;
        };
      };
    };
    quantity: number;
  }[];
}

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
