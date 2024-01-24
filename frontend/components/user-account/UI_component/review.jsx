import React from 'react'
import { ArrowRightOutlined } from '@ant-design/icons'

function Review(props) {
  return (
    <div className="">
      <p className="text-3xl mb-5">Đánh giá và phản hồi</p>
      <p className="text-gray-500 text-sm">Bạn chưa có đánh giá nào...</p>
      <div className="relative my-12 m-2 cursor-pointer">
        <img
          src="https://mcdn.coolmate.me/image/September2023/mceclip0_96.jpg"
          alt="banner"
        />
        <div className="absolute  top-[100px] left-8 bg-black flex flex-row justify-between px-2 py-1 rounded-full">
          <p className="text-white uppercase p-3 font-bold text-sm">
            Khám phá ngay
          </p>
          <ArrowRightOutlined className="text-white text-md mx-4" />
        </div>
        <p className="absolute w-80 top-[12px] left-8 text-black text-3xl">
          Nhiều ưu đãi hấp dẫn đang chờ bạn
        </p>
      </div>
    </div>
  )
}
export default Review
