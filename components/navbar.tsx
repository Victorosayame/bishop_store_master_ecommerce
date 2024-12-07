"use client";

import useCart from "@/hooks/use-cart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserIcon, Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const { user } = useUser();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");

  const cart = useCart();

  const router = useRouter()

  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-10 py-2 pl-10 pr-5 flex justify-between items-center bg-white gap-2 max-sm:px-2">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={130} height={100} />
      </Link>

      <div className="flex gap-4 text-body-bold max-lg:hidden">
        <Link href="/" className={`hover:text-blue-500 ${pathname === "/" && "text-blue-500"}`}>
          Home
        </Link>
        <Link
          href={user ? "wishlist" : "/sign-in"}
          className={`hover:text-blue-500 ${pathname === "/wishlist" && "text-blue-500"}`}
        >
          Wishlist
        </Link>
        <Link
          href={user ? "orders" : "/sign-in"}
          className={`hover:text-blue-500 ${pathname === "/orders" && "text-blue-500"}`}
        >
          Orders
        </Link>
      </div>

      <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
        <input
          className="outline-none max-sm:max-w-[120px]"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button disabled={query === ""} onClick={() => router.push(`/search/${query}`)}>
        <Search className="cursor-pointer h-4 w-4 hover:text-blue-500" />
        </button>
      </div>

      <div className="flex gap-3 items-center relative">
        <Link
          href="/cart"
          className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
        >
          <ShoppingCart />
          <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
        </Link>

        <Menu
          className="cursor-pointer lg:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />

        {dropdownMenu && (
          <div className="absolute flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold top-12 right-5 lg:hidden">
            <Link href="/" className="hover:text-blue-500">
              Home
            </Link>
            <Link
              href={user ? "wishlist" : "/sign-in"}
              className="hover:text-blue-500"
            >
              Wishlist
            </Link>
            <Link
              href={user ? "orders" : "/sign-in"}
              className="hover:text-blue-500"
            >
              Orders
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
            >
              <ShoppingCart />
              <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
            </Link>
          </div>
        )}

        {user ? (
          <UserButton />
        ) : (
          <Link href="/sign-in">
            <CircleUserIcon />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
