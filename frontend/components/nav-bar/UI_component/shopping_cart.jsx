"use client"

import Link from "next/link"
import React, { useState} from 'react'
import { useRouter } from 'next/navigation'
import NomalTextNav from './nomal_txt_nav'
import HeaderTextNav from './header_txt_nav'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {  ShoppingCartOutlined } from '@ant-design/icons';


export default function ShoppingCart() {
  return (
    <NavigationMenu >
      <NavigationMenuList>
        <NavigationMenuItem >
            <NavigationMenuTrigger>
            <ShoppingCartOutlined className="text-white text-3xl"/>
            </NavigationMenuTrigger>
            <NavigationMenuContent >
                <div className="bg-white p-2 w-[300px]">
                    <div className="">
                        <div className="ml-1">
                            <HeaderTextNav content="Theo sản phẩm"/>
                            <NomalTextNav content="Tất cả"/>
                            <NomalTextNav content="Sản phẩm mới"/>
                        </div>
                    </div>
                </div>
            </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

