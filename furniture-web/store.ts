import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CeramicsItems } from "./typings";

export interface CartItem {
  Product: CeramicsItems;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: CeramicsItems) => void;
  removeItem: (productId: string) => void;
  removeCartItem: (productId: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Store the Cart
      items: [],

      // Add a Product to the Cart
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.Product._id === product._id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.Product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              items: [...state.items, { Product: product, quantity: 1 }],
            };
          }
        }),

      // Remove 1 quantity of the product, or remove it completely if quantity is 1
      removeItem: (productId) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.Product._id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0), // Remove if quantity becomes 0
        }));
      },

      // Remove the entire product from the cart
      removeCartItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.Product._id !== productId),
        }));
      },

      // Reset the cart
      resetCart: () => {
        set({ items: [] });
      },

      // To get the total price of products
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + (item.Product.price ?? 0) * item.quantity,
          0
        ),

      getSubTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.Product.price ?? 0;
          const discount = ((item.Product.discount ?? 0) * price) / 100;
          const discountedPrice = price - discount; // ✅ Corrected subtraction
          return total + discountedPrice * item.quantity;
        }, 0);
      },

      // To get the items quantity
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.Product._id === productId);
        return item ? item?.quantity : 0;
      },

      // To get the group items
      getGroupedItems: () => get().items,
    }),
    { name: "cart-store" } // <-- This is now correctly placed
  )
);

export default useCartStore;
