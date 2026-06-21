import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Login & Signup - Nasif Bin Borhan",
  description: "Modern authentication page with login, signup, and OTP verification",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
