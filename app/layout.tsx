import type {Metadata} from "next";
import {ReactNode} from "react";
import {Roboto} from "next/font/google";
import {Toaster} from "react-hot-toast";
import Script from "next/script";

import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import AuthProvider from "@/components/auth-provider";
import Header from "@/components/header";
import getServerUser from "@/actions/getServerUser";

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

export default async function RootLayout({children}: {children: ReactNode}) {
  const user = await getServerUser();

  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Header user={user ? JSON.parse(JSON.stringify(user)) : null} />
            <main className="bg-background text-foreground">{children}</main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </html>
  );
}
