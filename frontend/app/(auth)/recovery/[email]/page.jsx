'use client'

import React, { useMemo, useState } from 'react'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { notification } from 'antd'
import { isPasswordValid } from '@/lib/utils'

const RecoveryPass = () => {
  const [api, contextHolder] = notification.useNotification()
  const params = useParams()
  const data = useSearchParams()

  const openNotification = (description) => {
    api.info({
      message: `Notification`,
      description: description,
      placement: 'topRight',
      duration: 2
    })
  }

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()
  const handleOnchangePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleOnchangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleRecovery = () => {
    if (!isPasswordValid(password) || !isPasswordValid(confirmPassword)) {
      openNotification(
        `Mật khẩu phải bao gồm 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số và có độ dài lớn hơn 8 ký tự`
      )
    } else if (password !== confirmPassword) {
      openNotification(`Mật khẩu không trùng khớp`)
    } else if (password === confirmPassword) {
      const options = {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_ROOT}/api/auth/resetpassword`,
        data: {
          newPassword: password,
          email: params.email.replace(/%40/g, '@'),
          token: data
            .get('token')
            .replace(/%2B/g, '+')
            .replace(/%2F/g, '/')
            .replace(/%3D/g, '=')
            .replace(/%3A/g, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/g, ',')
        }
      }
      axios
        .request(options)
        .then(function (response) {
          router.push('/sign-in')
        })
        .catch(function (error) {
          console.error(error)
        })
    }
  }

  return (
    <div className="flex items-center justify-center bg-white">
      {contextHolder}
      <div
        className="absolute top-20 left-[430px]"
        onClick={() => router.push('/sign-in')}
      >
        <IoIosArrowRoundBack className="h-7 w-7 cursor-pointer" />
      </div>
      <div className="w-1/2 p-20 m-10 rounded-lg shadow-md">
        <div className="flex justify-center items-center">
          <Image
            src="/images/img_logo.png"
            alt="logo"
            width={100}
            height={50}
          />
        </div>
        <b className="ml-4">Cấp lại mật khẩu</b>

        <div className="relative mt-2">
          <span
            className="absolute top-1.5 right-5 z-10"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
          </span>
          <Input
            className="rounded-full px-4"
            id="password"
            placeholder="Nhập mật khẩu"
            type={isShowPassword ? 'text' : 'password'}
            value={password}
            onChange={handleOnchangePassword}
          />
        </div>
        <div className="relative mt-4">
          <span
            className="absolute top-1.5 right-5 z-10"
            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
          >
            {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
          </span>
          <Input
            className="rounded-full px-4"
            id="confirm_password"
            placeholder="Nhập lại mật khẩu"
            type={isShowConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={handleOnchangeConfirmPassword}
          />
        </div>
        <Button
          className="my-10 w-[100%] rounded-full p-6 hover:bg-gray-200 hover:text-black"
          onClick={handleRecovery}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  )
}
export default RecoveryPass
