'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { CloseOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { Badge } from 'antd'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'

const CardItemPay = (props) => {
  const addDotsToNumber = (number) => {
    if (number) {
      const numberString = number.toString()
      const length = numberString.length
      let result = ''
      for (let i = 0; i < length; i++) {
        result += numberString[i]
        if ((length - i - 1) % 3 === 0 && i !== length - 1) result += '.'
      }
      return result
    }
  }

  // console.log(props)

  return (
    <div className="w-[100%] flex my-6 items-center justify-between">
      <div className="flex items-center">
        <img
          className="w-20 h-28 object-cover rounded-xl border border-blue-500"
          src={props.img}
          alt="icon"
        />
        <p className="text-sm ml-2 w-10">{props.name}</p>
      </div>
      <p className="text-sm">{props.num}</p>
      <p className="text-sm">{addDotsToNumber(props.price)}đ</p>
      <p className="text-sm">
        {props.colorChose} / {props.sizeChose}
      </p>
      <p className="text-sm">{addDotsToNumber(props.price * props.num)}đ</p>
    </div>
  )
}
export default CardItemPay
