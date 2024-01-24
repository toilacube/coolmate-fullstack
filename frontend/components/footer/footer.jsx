'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="flex flex-row justify-between items-center p-8">
        <div className="w-[380px]">
          <span className="font-bold text-xl">COOLMATE lắng nghe bạn!</span>{' '}
          <br></br>
          <span className="text-[12px]">
            Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp
            từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản phẩm tốt
            hơn nữa.
          </span>{' '}
          <br></br>
          <Button className="font-semibold w-48 rounded-[16px] bg-blue-600 mt-4">
            Đóng góp ý kiến
          </Button>
        </div>
        <div>
          <div className="flex flex-row items-center">
            <img
              src="https://www.coolmate.me/images/footer/icon-hotline.svg"
              alt="icon"
            />
            <p className="font-bold ml-4 cursor-pointer w-60">
              1900.272737 - 028.7777.2737 (8:30 - 22:00)
            </p>
          </div>
          <div className="flex flex-row items-center my-4">
            <img
              src="https://www.coolmate.me/images/footer/icon-email.svg"
              alt="icon"
            />
            <p className="font-bold ml-4 cursor-pointer">Cool@coolmate.me</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <img
            className="w-8 object-contain mr-8 cursor-pointer"
            src="https://mcdn.coolmate.me/image/June2023/mceclip2_68.png"
            alt="icon"
          />
          <img
            className="w-8 object-contain mr-8 cursor-pointer"
            src="https://mcdn.coolmate.me/image/June2023/mceclip0_62.png"
            alt="icon"
          />
          <img
            className="w-8 object-contain mr-8 cursor-pointer"
            src="https://www.coolmate.me/images/footer/icon-instar.svg"
            alt="icon"
          />
          <img
            className="w-8 object-contain mr-8 cursor-pointer"
            src="https://www.coolmate.me/images/footer/icon-youtube.svg"
            alt="icon"
          />
        </div>
      </div>
      <hr className="mx-6 border-1 border-gray-600"></hr>
      <div className="flex flex-row justify-between p-8">
        <div>
          <p className="font-bold my-4">COOLCLUB</p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Đăng kí thành viên
          </p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Ưu đãi & Đặc quyền
          </p>
        </div>
        <div>
          <p className="font-bold my-4">CHÍNH SÁCH</p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Chính sách đổi trả 60 ngày
          </p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Chính sách khuyến mãi
          </p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Chính sách bảo mật
          </p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Chính sách giao hàng
          </p>
        </div>
        <div>
          <p className="font-bold my-4">CHĂM SÓC KHÁCH HÀNG</p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Trải nghiệm mua sắm 100% hài lòng
          </p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Hỏi đáp - FAQs
          </p>
          <p className="font-bold my-4">KIẾN THỨC MẶC ĐẸP</p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Hướng dẫn chọn size
          </p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Blog
          </p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Group mặc đẹp sống chất
          </p>
        </div>
        <div>
          <p className="font-bold my-4">TÀI LIỆU - TUYỂN DỤNG</p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Tuyển dụng
          </p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Đăng ký bản quyền
          </p>
          <p className="font-bold my-4">VỀ COOLMATE</p>
          <p className="text-[12px] my-4">Coolmate 101</p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            DVKH xuất sắc
          </p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Câu chuyện về Coolmate
          </p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Nhà máy
          </p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Care & Share
          </p>
        </div>
        <div className="w-[220px]">
          <p className="font-bold my-4">ĐỊA CHỈ LIÊN HỆ</p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Văn phòng Hà Nội: Tầng 3-4, Tòa nhà BMM, KM2, Đường Phùng Hưng,
            Phường Phúc La, Quận Hà Đông, TP Hà Nội
          </p>
          <p className="text-[12px] my-4 hover:text-yellow-500 cursor-pointer">
            Văn phòng Tp HCM: Lầu 1, Số 163 Trần Trọng Cung, Phường Tân Thuận
            Đông, Quận 7, Tp. Hồ Chí Minh
          </p>
        </div>
      </div>
      <hr className="mx-6 border-1 border-gray-600"></hr>
      <div className="flex flex-row justify-between p-8">
        <div>
          <p className="text-[12px] my-2">@ CÔNG TY TNHH FASTECH ASIA</p>
          <p className="text-[12px] my-2">
            Mã số doanh nghiệp: 0108617038. Giấy chứng nhận đăng ký doanh nghiệp
            do Sở Kế hoạch và Đầu tư TP Hà Nội cấp lần đầu ngày 20/02/2019.
          </p>
        </div>
        <div className="flex flex-row">
          <img
            className="w-16 object-contain mr-4 cursor-pointer"
            src="https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2022/handle_cert.png"
            alt="icon"
          />
          <img
            className="w-16 object-contain mr-4 cursor-pointer"
            src="https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2022/dmca_protected_15_120.png"
            alt="icon"
          />
          <img
            className="w-9 object-contain mr-4 cursor-pointer"
            src="https://www.coolmate.me/images/footer/Coolmate-info.png"
            alt="icon"
          />
          <img
            className="w-20 object-contain mr-4 cursor-pointer"
            src="https://www.coolmate.me/images/footer/logoSaleNoti.png"
            alt="icon"
          />
        </div>
      </div>
    </div>
  )
}
export default Footer
