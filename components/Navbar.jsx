"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Bell, List, Menu, CheckSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Context, LogoutBtn } from "@components/Clients"; // Your context provider
import { useRouter } from "next/router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(Context); // Access user from context

  return (
    <nav className="bg-gray-800 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center justify-center space-x-2"
            >
              <CheckSquare className="h-6 w-6 text-green-500" />
              <span className="text-2xl font-bold text-center text-white">
                TodoMaster
              </span>
            </Link>
          </div>

          {/* Conditionally render content based on user._id */}
          {user?._id ? (
            <>
              {/* When logged in, display full navbar */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/tasklists"
                    className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Task List
                  </Link>
                  <Link
                    href="/kanban"
                    className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Kanban Board
                  </Link>
                  {/* Add Logout button beside Kanban Board */}
                  <LogoutBtn /> {/* This will show the Logout button */}
                </div>
              </div>

              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-white hover:text-black"
                  >
                    <Bell className="h-5 w-5 " />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="ml-3">
                        <Avatar>
                          <AvatarImage
                            src="https://cdn.pixabay.com/photo/2021/11/24/05/19/user-6820232_960_720.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href="/profile">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="md:hidden ">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6 text-white" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[300px] sm:w-[400px] bg-gray-700"
                  >
                    <nav className="flex flex-col gap-4">
                      <Link
                        href="/tasklists"
                        className="block px-3 py-2 rounded-md text-base font-medium text-white  hover:bg-gray-400"
                        onClick={() => setIsOpen(false)}
                      >
                        Task List
                      </Link>
                      <Link
                        href="/kanban"
                        className="block px-3 py-2 rounded-md text-base font-medium text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        Kanban Board
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-white"
                      >
                        <Bell className="h-5 w-5 mr-2" />
                        Notifications
                      </Button>

                      {/* This will show the Logout button in mobile menu */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-white"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        <LogoutBtn />{" "}
                      </Button>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          ) : (
            // When not logged in, display login button only
            <Link
              href="/login"
              className="text-white px-5 py-2 rounded-md text-sm font-medium"
            >
              <button className="px-7 text-white hover:bg-gray-700 hover:text-white  py-2 rounded-md text-sm font-medium">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
