import type {Metadata} from "next";
import React from "react";
import {Roboto} from "next/font/google";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Accommodation Booking",
    default: "Accommodation Booking",
  },
  description: "Book your favorite accommodation booking",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
