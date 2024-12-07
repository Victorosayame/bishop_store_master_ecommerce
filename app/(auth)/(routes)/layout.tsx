import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bishop Store",
  description: "Bishop Ecommerce Store",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider  afterSignOutUrl="/sign-in">
      <html lang="en">
      <body>
      <div className="flex items-center justify-center h-full">
          {children}
      </div>
      </body>
      </html>
      </ClerkProvider>
  )
}
