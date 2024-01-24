'use client'

import React, { useState, useEffect } from 'react'
import { Rate } from 'antd'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import axios from 'axios'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { notification, Space } from 'antd'
import { handleDate } from '@/lib/utils'

const ListComment = ({ productId }) => {
  const [responseReviewData, setResponseReviewData] = useState({})
  const [currentStar, setCurrentStar] = useState(0)
  const [contentCmt, setContentCmt] = useState('')
  const [rating, setRating] = useState(0)
  const desc = ['Quá tệ', 'Tệ', 'Bình thường', 'Ngon', 'Tuyệt vời']
  const [api, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = (type, content) => {
    api[type]({
      message: 'Lỗi',
      description: content
    })
  }

  const handleGetReview = (
    url = `${process.env.NEXT_PUBLIC_API_ROOT}/api/review/getOfProduct?productId=${productId.productId}`
  ) => {
    try {
      const options = {
        method: 'GET',
        url: url
      }
      axios
        .request(options)
        .then(function (response) {
          setResponseReviewData(response.data)
        })
        .catch(function (error) {
          console.error(error)
        })
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }

  useEffect(() => {
    handleGetReview()
  }, [])

  const handleChangeStar = (value) => {
    setCurrentStar(value)
  }

  //   console.log(responseReviewData)

  const handleAddRating = () => {
    if (!contentCmt)
      openNotificationWithIcon('error', 'Bạn chưa điền bình luận')
    else if (!rating) openNotificationWithIcon('error', 'Bạn chưa đánh giá')
    else {
      try {
        const options = {
          method: 'POST',
          url: `${process.env.NEXT_PUBLIC_API_ROOT}/api/review/add`,
          data: {
            productItemId: productId.productId,
            ratingValue: rating,
            comment: contentCmt
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
        // console.log(options)
        axios
          .request(options, {})
          .then(function (response) {
            console.log(response.data)
            handleGetReview()
          })
          .catch(function (error) {
            console.log(error)
            if (error.response.status === 401)
              openNotificationWithIcon('error', `Đăng nhập để tiếp tục`)
            else if (error.response.status === 400)
              openNotificationWithIcon('error', error.response.data)
            else openNotificationWithIcon('error', 'Lỗi')
          })
      } catch (error) {
        console.log('Error')
      }
    }
  }

  return (
    <div>
      {contextHolder}
      <div>
        <h2 className="text-xl font-bold ml-8 mb-6 mt-4">Bình luận</h2>
        <span className="mx-8">
          <Rate tooltips={desc} onChange={setRating} value={rating} />
          {rating ? (
            <span className="ant-rate-text">{desc[rating - 1]}</span>
          ) : (
            ''
          )}
        </span>
        <div className="flex flex-row mb-10">
          <Textarea
            className="mx-8 w-[80%] mt-4"
            value={contentCmt}
            onChange={(e) => setContentCmt(e.target.value)}
            placeholder="Nhập bình luận"
          />
          <Button className=" mt-4" onClick={handleAddRating}>
            Đánh giá
          </Button>
        </div>

        <hr />
      </div>
      <div className="p-4 flex flex-row mt-4">
        <div className=" px-12 py-8 flex flex-col items-center rounded-[12px] w-[28%]">
          <p className="text-lg font-bold mb-4 uppercase">Đánh giá</p>
          <p className="text-6xl font-bold mb-3">{responseReviewData.rating}</p>
          <Rate
            className="text-3xl mb-3"
            disabled
            defaultValue={0}
            value={Math.round(responseReviewData?.rating)}
          />
          <p className="text-sm italic">{responseReviewData.total} đánh giá</p>
        </div>
        <div className="w-[70%]">
          <div className="flex flex-row mb-8">
            <Select onValueChange={handleChangeStar}>
              <SelectTrigger className="p-6 rounded-full mr-8">
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Tất cả</SelectItem>
                <SelectItem value="5">5 sao</SelectItem>
                <SelectItem value="4">4 sao</SelectItem>
                <SelectItem value="3">3 sao</SelectItem>
                <SelectItem value="2">2 sao</SelectItem>
                <SelectItem value="1">1 sao</SelectItem>
              </SelectContent>
            </Select>
            <Select
            // onValueChange={field.onChange}
            >
              <SelectTrigger className="p-6 rounded-full mr-8">
                <SelectValue placeholder="Không ảnh" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Không ảnh">Không ảnh</SelectItem>
                <SelectItem value="Có ảnh">Có ảnh</SelectItem>
              </SelectContent>
            </Select>
            <Select
            // onValueChange={field.onChange}
            >
              <SelectTrigger className="p-6 rounded-full mr-8">
                <SelectValue placeholder="Phản hồi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Phản hồi">Phản hồi</SelectItem>
                <SelectItem value="Đã phản hồi">Đã phản hồi</SelectItem>
                <SelectItem value="Chưa phản hồi">Chưa phản hồi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className={'flex flex-row flex-wrap'}>
            {responseReviewData?.reviews
              ?.filter((cmt) => {
                if (currentStar == 0) {
                  return cmt
                } else if (cmt.ratingValue === parseInt(currentStar)) {
                  return cmt
                }
              })
              .map((cmt, index) => (
                <div key={index} className={`my-2 text-sm w-1/2 pr-8 pb-8`}>
                  <Rate
                    className="text-blue-800  mb-3"
                    disabled
                    defaultValue={0}
                    value={cmt.ratingValue}
                  />
                  <p className={`font-bold`}>{cmt.name}</p>
                  <p className={`italic text-gray-500 mb-7`}>
                    {cmt.color}/{cmt.size}
                  </p>
                  <p>{cmt.comment}</p>
                  {cmt.reply ? (
                    <p className={`bg-gray-300 p-4 rounded-2xl mt-2`}>
                      {cmt.reply}
                    </p>
                  ) : (
                    ''
                  )}

                  <p className={`text-gray-500 rounded-2xl mt-4`}>
                    {handleDate(cmt.createdDate)}
                  </p>
                </div>
              ))}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
export default ListComment
