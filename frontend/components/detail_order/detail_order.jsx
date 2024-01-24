/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
// import CardItemPay from './UI_component/card_item';
import { Rate } from 'antd'

const DetailOrder = (props) => {

    const detailOrder = props.orderData.detailOrder;
    console.log(detailOrder)
    return (
        <div className="p-8 w-[100%]">
          {detailOrder.id}
        </div>
    )
}
export default DetailOrder
