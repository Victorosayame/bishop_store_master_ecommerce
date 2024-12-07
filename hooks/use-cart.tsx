//use cart hook using zustand for the add to cart functionality

import { create } from "zustand";
import toast, { Toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (_id: string) => void;
  increaseQuantity: (_id: string) => void;
  decreaseQuantity: (_id: string) => void;
  clearCart: () => void;
}

const useCart = create(persist<CartStore>(
  (set, get) => ({
    cartItems: [],
    addItem: (data: CartItem) => {
      const { item, quantity, color, size } = data
      const currentItems = get().cartItems
      const existingItem = currentItems.find((cartItem) => cartItem.item._id === item._id)
      if (existingItem) {
        return toast("Item already in cart")
      }
      set({ cartItems: [...currentItems, { item, quantity, color, size }]})
      toast.success("Item added to cart")
    },
    removeItem: (_id: String) => {
     const newCartItems = get().cartItems.filter((cartItem) => cartItem.item._id !== _id)
     set({ cartItems: newCartItems })
     toast.success("Item removed from cart")     
    },
    increaseQuantity: (_id: String) => {
      const newCartItems = get().cartItems.map((cartItem) =>
        cartItem.item._id === _id
         ? { ...cartItem, quantity: cartItem.quantity + 1 }
         : cartItem
      );
      set({ cartItems: newCartItems });
      toast.success("Item quantity increased")
    },
    decreaseQuantity: (_id: String) => {
      const newCartItems = get().cartItems.map((cartItem) =>
        cartItem.item._id === _id
         ? { ...cartItem, quantity: cartItem.quantity - 1 }
         : cartItem
      );
      set({ cartItems: newCartItems });
      toast.success("Item quantity decreased");
    },
    clearCart: () => set({ cartItems: [] }),
  }),
  {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
  }
));

export default useCart;