'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import NomalTextNav from './nomal_txt_nav'
import HeaderTextNav from './header_txt_nav'
import ImgTxtNav from './img_txt_nav'
import ImgNav from './img_nav'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

const components = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.'
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.'
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.'
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.'
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.'
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'
  }
]

export function MenuItem() {
  const router = useRouter()
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onClick={() => {
              router.push('/collection/docasual')
            }}
          >
            Mặc hằng ngày
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="bg-bg_nav p-5 flex justify-between w-[1050px]">
              <div className="flex justify-between">
                <div className="ml-8">
                  <HeaderTextNav content="Theo sản phẩm" />
                  <NomalTextNav content="Tất cả" />
                  <NomalTextNav content="Sản phẩm mới" />
                </div>
                <div className="ml-8">
                  <HeaderTextNav content="Áo nam" />
                  <NomalTextNav content="Tất cả áo nam" />
                  <NomalTextNav content="Áo thun" />
                  <NomalTextNav content="Áo sơ mi" />
                  <NomalTextNav content="Áo polo" />
                  <NomalTextNav content="Áo tanktop" />
                  <NomalTextNav content="Áo thể thao" />
                </div>
                <div className="ml-8">
                  <HeaderTextNav content="Quần nam" />
                  <NomalTextNav content="Tất cả quần nam" />
                  <NomalTextNav content="Quần jogger" />
                  <NomalTextNav content="Quần dài" />
                  <NomalTextNav content="Quần short" />
                  <NomalTextNav content="Quần jean" />
                </div>
                <div className="ml-8">
                  <HeaderTextNav content="Phụ kiện" />
                  <NomalTextNav content="Tất cả Phụ kiện" />
                  <NomalTextNav content="Mũ" />
                  <NomalTextNav content="Vớ" />
                </div>
              </div>
              <hr className="border-l border-solid border-gray-400 h-60"></hr>
              <div className="flex flex-col items-center">
                <HeaderTextNav content="Sale" />
                <div>
                  <ImgTxtNav
                    content="Tất cả SALE"
                    src="https://mcdn.coolmate.me/image/August2023/mceclip10_71.jpg"
                  />
                  <ImgTxtNav
                    content="SALE áo"
                    src="https://mcdn.coolmate.me/image/August2023/mceclip6_11.jpg"
                  />
                </div>
              </div>
              <hr className="border-l border-solid border-gray-400 h-60"></hr>
              <div>
                <ImgNav
                  content="Polo thể thao V1"
                  src="https://mcdn.coolmate.me/image/October2023/mceclip5_68.jpg"
                />
                <ImgNav
                  content="T-shirt Marvel Captain"
                  src="https://mcdn.coolmate.me/image/October2023/mceclip4_59.jpg"
                />
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onClick={() => {
              router.push('/collection/activewear')
            }}
          >
            Đồ thể thao
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="bg-bg_nav p-5 flex justify-between w-[1050px]">
              <div className="flex justify-between">
                <div className="ml-8">
                  <HeaderTextNav content="Theo sản phẩm" />
                  <NomalTextNav content="Tất cả" />
                  <NomalTextNav content="Sản phẩm mới" />
                  <NomalTextNav content="Áo thun" />
                  <NomalTextNav content="Áo sơ mi" />
                  <NomalTextNav content="Áo polo" />
                  <NomalTextNav content="Áo tanktop" />
                </div>
                <div className="ml-8">
                  <div className="mt-[52px]"></div>
                  <NomalTextNav content="Quần short" />
                  <NomalTextNav content="Quần jogger" />
                  <NomalTextNav content="Phụ kiện" />
                </div>
              </div>
              <hr className="border-l border-solid border-gray-400 h-60"></hr>
              <div className="">
                <HeaderTextNav content="Theo nhu cầu" />
                <div className="flex flex-row">
                  <div>
                    <ImgTxtNav
                      content="Tất cả SALE"
                      src="https://mcdn.coolmate.me/image/August2023/mceclip15_13.jpg"
                    />
                    <ImgTxtNav
                      content="SALE áo"
                      src="https://mcdn.coolmate.me/image/October2023/mceclip1_23.png"
                    />
                  </div>
                  <div className="m-5"></div>
                  <div>
                    <ImgTxtNav
                      content="Tất cả SALE"
                      src="https://mcdn.coolmate.me/image/August2023/mceclip18_10.jpg"
                    />
                    <ImgTxtNav
                      content="SALE áo"
                      src="https://mcdn.coolmate.me/image/August2023/mceclip16_53.jpg"
                    />
                  </div>
                </div>
              </div>
              <hr className="border-l border-solid border-gray-400 h-60"></hr>
              <div>
                <ImgNav
                  content="Polo thể thao V1"
                  src="https://mcdn.coolmate.me/image/August2023/mceclip2_37.jpg"
                />
                <ImgNav
                  content="T-shirt Marvel Captain"
                  src="https://mcdn.coolmate.me/image/August2023/mceclip1_78.jpg"
                />
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {/* <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Streetwear
            </NavigationMenuLink>
          </Link> */}
          <NavigationMenuTrigger>Streetwear</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="bg-bg_nav p-5 flex justify-between w-[1050px]">
              <div className="flex justify-between">
                <div className="ml-8">
                  <HeaderTextNav content="Theo sản phẩm" />
                  <NomalTextNav content="Tất cả" />
                  <NomalTextNav content="Sản phẩm mới" />
                  <NomalTextNav content="Áo thun" />
                  <NomalTextNav content="Áo sơ mi" />
                  <NomalTextNav content="Áo polo" />
                  <NomalTextNav content="Áo tanktop" />
                </div>
              </div>
              <hr className="border-l border-solid border-gray-400 h-60"></hr>
              <div>
                <HeaderTextNav content="Theo nhu cầu" />
                <div className="flex flex-row">
                  <div>
                    <ImgTxtNav
                      content="Tất cả SALE"
                      src="https://mcdn.coolmate.me/image/August2023/mceclip15_13.jpg"
                    />
                    <ImgTxtNav
                      content="SALE áo"
                      src="https://mcdn.coolmate.me/image/October2023/mceclip1_23.png"
                    />
                  </div>
                </div>
              </div>
              <hr className="border-l border-solid border-gray-400 h-60"></hr>
              <div>
                <ImgNav
                  content="Polo thể thao V1"
                  src="https://mcdn.coolmate.me/image/August2023/mceclip2_37.jpg"
                />
                <ImgNav
                  content="T-shirt Marvel Captain"
                  src="https://mcdn.coolmate.me/image/August2023/mceclip1_78.jpg"
                />
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {/* <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Streetwear
            </NavigationMenuLink>
          </Link> */}
          <NavigationMenuTrigger>Nước hoa</NavigationMenuTrigger>
          <NavigationMenuContent></NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
