"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import {
  Home,
  Search,
  Settings,
  Heart,
  LogOut,
  ChevronDown,
  Bookmark,
  User2,
  Edit,
  History,
  ImageIcon,
  LockIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function AppSidebar() {
  const router = useRouter();

  return (
    <Sidebar className="">
      <SidebarContent className="mx-4">
        <SidebarGroup className="">
          <div
            className="flex items-center mb-3 mt-2 hover:cursor-pointer ml-[-0.5rem]"
            onClick={() => router.push("/")}
          >
            {/* <img
              src="/logo_clear.png"
              alt="Anim8"
              className="w-14 h-14 rounded-full object-cover opacity-88"
            /> */}
            <SidebarTrigger className="absolute w-[24px] h-[24px] rounded-full bg-[#121212] flex items-center justify-center z-50" />
            <SidebarGroupLabel className="text-2xl text-white font-medium font-sans mt-0 ml-0">
              Anim8.Lynn
            </SidebarGroupLabel>
          </div>

          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              <SidebarMenuItem
                className="py-0 ml-[-0.4rem] hover:cursor-pointer transition-all duration-150 ease-linear"
                onClick={() => router.push("/")}
              >
                <SidebarMenuButton asChild className="text-lg space-x-1 py-8">
                  <a>
                    <img
                      src="/logo/logo.png"
                      alt="Anim8"
                      className="w-12 object-zoom-in"
                    />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* <Collapsible defaultOpen>
                <CollapsibleTrigger className="py-0 w-full flex items-center text-lg hover:bg-sidebar-accent transition-all duration-150 ease-linear">
                  <Edit className="ml-2 w-5 h-5" />
                  <span className="ml-4">Studio</span>
                  <ChevronDown className="ml-auto w-5.5 h-5.5 mr-1" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 transition-all duration-150 ease-linear">
                  <SidebarMenu>
                    <div className="mb-1">
                      <SidebarMenuItem
                        className="my-2 py-1 hover:cursor-pointer transition-all duration-150 ease-linear"
                        // onClick={() => router.push("/Prompt")}
                      >
                        <SidebarMenuButt py-8on
                          asChild
                          className="text-lg space-x-2"
                        >
                          <a>
                            <span className="text-base hover:text-red-500 ml-7 flex">
                              Text Prompt <LockIcon className="w-5 h-5 ml-2" />
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem
                        className="my-2 py-1 hover:cursor-pointer hover:bg-sidebar-accent transition-all duration-150 ease-linear"
                        onClick={() => router.push("/Test")}
                      >
                        <SidebarMenuButt py-8on
                          asChild
                          className="text-lg space-x-2"
                        >
                          <a>
                            <span className="text-base ml-7">Image Upload</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible> */}

              <SidebarMenuItem
                className="py-0 hover:cursor-pointer transition-all duration-150 ease-linear"
                onClick={() => router.push("/history")}
              >
                <SidebarMenuButton asChild className="text-lg space-x-2 py-8">
                  <a>
                    <History className="w-64 h-64" />
                    <span>History</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* {user ? (
                <SidebarMenuItem className="py-0 hover:cursor-pointer hover:bg-sidebar-accent transition-all duration-150 ease-linear">
                  <SidebarMenuButt py-8on
                    asChild
                    className="text-lg space-x-2"
                    onClick={handleSignOut}
                  >
                    <a>
                      <LogOut className="w-64 h-64" />
                      <span>Sign Out</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                <Button
                  className="w-full mt-4 py-0 mb-3"
                  onClick={handleSignIn}
                >
                  <h1 className="text-lg">Sign In</h1>
                </Button>
              )} */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
