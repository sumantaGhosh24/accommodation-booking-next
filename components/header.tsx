"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {signOut} from "next-auth/react";
import {Menu, X} from "lucide-react";

import {ModeToggle} from "./mode-toggle";
import {Button} from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";

const Header = ({user}: {user: any}) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white shadow shadow-black dark:bg-black dark:text-white dark:shadow-white">
      <div className="mx-auto max-w-screen-xl items-center px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:block md:py-5">
          <Link href="/">
            <Image
              src="https://placehold.co/600x400.png"
              alt="logo"
              height={20}
              width={20}
              className="h-10 w-10 rounded"
            />
          </Link>
          <div className="md:hidden">
            <button
              className="text-primary rounded-md p-2 outline-none"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div
          className={`mt-8 flex-1 justify-end pb-3 md:mt-0 md:block md:pb-0 ${
            open ? "block" : "hidden"
          }`}
        >
          <NavigationMenu className="mx-auto">
            <NavigationMenuList className="flex-col gap-2 md:flex-row">
              {user ? (
                <>
                  {[
                    {id: 1, name: "Home", url: "/"},
                    {id: 2, name: "My Reviews", url: "/review/my"},
                    {id: 3, name: "My Bookings", url: "/booking/my"},
                  ].map((item) => (
                    <NavigationMenuItem key={item.id}>
                      <Link href={item.url} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                  {user.role === "admin" && (
                    <>
                      <NavigationMenu>
                        <NavigationMenuList>
                          <NavigationMenuItem>
                            <NavigationMenuTrigger>
                              Manage
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              {[
                                {
                                  id: 1,
                                  name: "Manage Categories",
                                  url: "/category",
                                },
                                {id: 2, name: "Manage Users", url: "/users"},
                                {id: 3, name: "Manage Hotels", url: "/hotel"},
                                {id: 4, name: "Manage Reviews", url: "/review"},
                                {
                                  id: 5,
                                  name: "Manage Bookings",
                                  url: "/booking",
                                },
                              ].map((item) => (
                                <NavigationMenuItem
                                  key={item.id}
                                  className="my-3"
                                >
                                  <Link href={item.url} legacyBehavior passHref>
                                    <NavigationMenuLink
                                      className={navigationMenuTriggerStyle()}
                                    >
                                      {item.name}
                                    </NavigationMenuLink>
                                  </Link>
                                </NavigationMenuItem>
                              ))}
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        </NavigationMenuList>
                      </NavigationMenu>
                    </>
                  )}
                  <NavigationMenuItem>
                    <Link href={`/profile`} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <Avatar className="mr-2">
                          <AvatarImage src={user.image.url} />
                          <AvatarFallback>
                            {user.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <Button
                    variant="secondary"
                    onClick={() => signOut()}
                    className={navigationMenuTriggerStyle()}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Link href="/register" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Register
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/login" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Login
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
              <ModeToggle />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};

export default Header;
