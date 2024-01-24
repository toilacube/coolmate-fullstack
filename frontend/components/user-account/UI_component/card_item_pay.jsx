'use client'
import React, { useState } from 'react';
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { notification, Space } from 'antd'
import axios from 'axios'
import { Textarea } from "@/components/ui/textarea"
import { Rate } from 'antd';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
  } from '@/components/ui/alert-dialog'
  import Loading from '@/components/ui/loading'

const CardItemPay = (props) => {

    const [contentCmt, setContentCmt] = useState('');
    const [rating, setRating] = useState(0);
    const desc = ['Quá tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];
    const [loading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, content) => {
        api[type]({
        message: type,
        description: content,
        });
    }

    const addDotsToNumber = (number) => {
        if(number) {
            const numberString = number.toString();
            const length = numberString.length;
            let result = "";
            for (let i = 0; i < length; i++) {
            result += numberString[i];
            if ((length - i - 1) % 3 === 0 && i !== length - 1) 
                result += ".";
            }
            return result;
        }
    }

    const handleCancel = () => {
        setContentCmt("")
        setRating(0)
    }

    const handleAddRating = () => {
        if (!contentCmt)
            openNotificationWithIcon('error', 'Bạn chưa điền bình luận')
        else if (!rating)
            openNotificationWithIcon('error', 'Bạn chưa đánh giá')
        else {
            try {
                const options = {
                  method: 'POST',
                  url: `${process.env.NEXT_PUBLIC_API_ROOT}/api/review/addItem`,
                  data: {
                    productItemId: props.productData.productItemId,
                    ratingValue: rating,
                    comment: contentCmt
                  },
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  },
                }
                // console.log(options)
                axios
                  .request(options, {
                  })
                  .then(function (response) {
                    console.log(response.data)
                    setContentCmt("")
                    setRating(0)
                    openNotificationWithIcon('success', 'Đánh giá thành công')

                  })
                  .catch(function (error) {
                    console.log(error)
                    setContentCmt("")
                    setRating(0)
                    if (error.response.status === 401)
                      openNotificationWithIcon('error', `Đăng nhập để tiếp tục`)
                    else 
                      openNotificationWithIcon('error', error.response.data)
                })
            } catch (error) {
              console.log('Error')
            } 
        }
    }


    return(
        <div className='w-[100%] flex flex-row justify-between my-6 items-center'>
            {contextHolder}
            <div className='flex items-center'>
                <img className='w-24 h-28 object-cover rounded-xl mx-4' src={props.productData.img} alt="icon"/>
                <div>
                    <p className='text-sm font-bold'>{props.productData.productName}</p>
                    <p className='text-sm'>{props.productData.color} / {props.productData.size}</p>
                    <p className='text-sm'>x{props.productData.qty}</p>
                    <p className='text-sm font-bold'>{addDotsToNumber(props.productData.price)}đ</p>
                </div>
            </div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="mx-3">Đánh giá </Button >
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Đánh giá {props.productData.productName}</AlertDialogTitle>
                    <span className="mx-1 my-8">
                        <Rate tooltips={desc} onChange={setRating} value={rating} />
                        {rating ? <span className="ant-rate-text">{desc[rating - 1]}</span> : ''}
                    </span>
                    <Textarea className="mx-1 mt-4" value={contentCmt} onChange={(e) => setContentCmt(e.target.value)} placeholder="Nhập bình luận"
                        />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAddRating}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
           
        </div>

    )
}
export default CardItemPay
