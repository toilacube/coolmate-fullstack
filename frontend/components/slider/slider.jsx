'use client'

import React, { useState, useEffect } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const ImgSlider = () => {
  const [current, setCurrent] = useState(0)
  const arrImage = [
    'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/December2020/Des_Banner_(37).jpg',
    'https://media.coolmate.me/cdn-cgi/image/width=1920,quality=80,format=auto/uploads/June2022/Banner-LDP-151.jpeg',
    'https://media.coolmate.me/cdn-cgi/image/width=1920,quality=80,format=auto/uploads/June2022/1200-x-350-tt_76.jpeg'
  ]

  const handleNext = () => {
    setCurrent(current === arrImage.length - 1 ? 0 : current + 1)
  }

  const handlePrev = () => {
    setCurrent(current === 0 ? arrImage.length - 1 : current - 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === arrImage.length - 1 ? 0 : current + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [current, arrImage.length])

  return (
    <div className="">
      <div className="relative">
        <LeftOutlined
          className="text-white text-3xl absolute top-40 left-4"
          onClick={handlePrev}
        />
        <img src={arrImage[current]} alt={`Slide ${current + 1}`} />
        <RightOutlined
          className="text-white text-3xl absolute top-40 right-4"
          onClick={handleNext}
        />
      </div>
      <div className="text-center mt-4">
        {arrImage.map((image, index) => (
          <span
            key={index}
            className={`h-3 w-3 inline-block rounded-full mx-2 ${
              current === index ? 'bg-black' : 'bg-gray-300'
            }`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  )
}
export default ImgSlider
