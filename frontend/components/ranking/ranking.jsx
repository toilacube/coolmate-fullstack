'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Drawer, Steps, Col, Row } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'

const Ranking = () => {
  const user = useSelector((state) => state.user)
  return (
    <div className="bg-white flex flex-row px-16 py-6 mx-4 rounded-md justify-between items-center">
      <div className="w-[60%]">
        <h2 style={{ fontSize: 40 }} className="uppercase">
          Hi, {user.name ? user.name : user.username}
        </h2>
        <img
          className="h-10 object-contain"
          src="https://mcdn.coolmate.me/image/October2023/mceclip0_92.png"
          alt="icon"
        />
        <div className="flex my-6 items-center">
          <p className="">
            Chi tiêu thêm{' '}
            <span className="font-bold text-blue-700 my-2">500.000đ</span> để
            lên hạng{' '}
          </p>
          <img
            className="h-8 object-contain mt-1 ml-1"
            src="https://mcdn.coolmate.me/image/September2023/mceclip0_56.png"
            alt="icon"
          />
        </div>
        <Steps
          className="my-4"
          progressDot
          current={0}
          items={[
            {
              title: (
                <img
                  className="w-8 object-contain"
                  src="https://mcdn.coolmate.me/image/September2023/mceclip0_80.png"
                  alt="icon"
                />
              )
            },
            {
              title: (
                <img
                  className="w-8 object-contain"
                  src="https://mcdn.coolmate.me/image/September2023/mceclip2_55.png"
                  alt="icon"
                />
              )
            },
            {
              title: (
                <img
                  className="w-8 object-contain"
                  src="https://mcdn.coolmate.me/image/September2023/mceclip3_94.png"
                  alt="icon"
                />
              )
            },
            {
              title: (
                <img
                  className="w-8 object-contain"
                  src="https://mcdn.coolmate.me/image/September2023/mceclip1_100.png"
                  alt="icon"
                />
              )
            }
          ]}
        />
        <p className="italic text-gray-500">
          Hạng thành viên sẽ được cập nhật lại sau 31/12/2023
        </p>
      </div>
      <div>
        <div className="bg-black flex flex-row justify-between px-4 py-2 rounded-md">
          <p className="text-white p-3 text-2xl w-[60%]">
            CoolClub Rewards Hub
          </p>
          <ArrowRightOutlined className="text-white text-3xl mx-4" />
        </div>
      </div>
    </div>
  )
}
export default Ranking
