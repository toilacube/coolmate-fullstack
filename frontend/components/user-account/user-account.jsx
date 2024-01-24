'use client'
import React, { useState } from 'react'
import { ArrowRightOutlined, UserOutlined } from '@ant-design/icons'
import Info from './UI_component/info'
import Orders from './UI_component/orders'
import UserAdress from './UI_component/user_address'
import Review from './UI_component/review'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser } from '../../redux/user/userSlice'
import { postApi } from '@/lib/fetch'

const UserAccount = () => {
  const router = useRouter()
  const [option, setOption] = useState('Info')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const handleSetOption = async (param) => {
    if (param === 'Logout') {
      const res = await postApi({ endPoint: '/api/auth/logout' })
      if (res.status === 200) {
        localStorage.removeItem('token')
        dispatch(resetUser())
        router.push('/')
      }
    }
    setOption(param)
  }
  const handleGoToAdmin = () => {
    router.push('/admin')
  }

  return (
    <div className="flex flex-row mt-8 items-start">
      <div className="px-4 w-[40%] rounded-md">
        <div
          className={
            option === 'Info'
              ? 'bg-black flex flex-row px-4 py-3 rounded-md items-center mb-2 cursor-pointer'
              : 'bg-white flex flex-row px-4 py-3 rounded-md items-center mb-2 cursor-pointer'
          }
          onClick={() => handleSetOption('Info')}
        >
          <img
            className="h-8 object-contain mt-1"
            src="https://mcdn.coolmate.me/image/September2023/mceclip6_34.png"
            alt="icon"
          />
          <p
            className={
              option === 'Info'
                ? 'text-white w-[84%] ml-3'
                : 'text-black w-[84%] ml-3'
            }
          >
            Thông tin tài khoản
          </p>
          <ArrowRightOutlined
            className={
              option === 'Info' ? 'text-white text-2xl' : 'text-black text-2xl'
            }
          />
        </div>
        {user.isAdmin && (
          <div
            className={
              option === 'Admin'
                ? 'bg-black flex flex-row px-4 py-3 rounded-md items-center mb-2 cursor-pointer'
                : 'bg-white flex flex-row px-4 py-3 rounded-md items-center mb-2 cursor-pointer'
            }
            onClick={handleGoToAdmin}
          >
            <UserOutlined className="text-white bg-black rounded-[10px] p-[5px] text-xl" />
            <p
              className={
                option === 'Admin'
                  ? 'text-white w-[84%] ml-3'
                  : 'text-black w-[84%] ml-3'
              }
            >
              Admin
            </p>
            <ArrowRightOutlined
              className={
                option === 'Admin'
                  ? 'text-white text-2xl'
                  : 'text-black text-2xl'
              }
            />
          </div>
        )}
        <div
          className={
            option === 'Orders'
              ? 'bg-black flex flex-row px-4 py-3 rounded-md items-center mb-2 cursor-pointer'
              : 'bg-white flex flex-row px-4 py-3 rounded-md items-center mb-2 cursor-pointer'
          }
          onClick={() => handleSetOption('Orders')}
        >
          <img
            className="h-8 object-contain mt-1"
            src="https://mcdn.coolmate.me/image/September2023/mceclip4_7.png"
            alt="icon"
          />
          <p
            className={
              option === 'Orders'
                ? 'text-white w-[84%] ml-3'
                : 'text-black w-[84%] ml-3'
            }
          >
            Lịch sử đơn hàng
          </p>
          <ArrowRightOutlined
            className={
              option === 'Orders'
                ? 'text-white text-2xl'
                : 'text-black text-2xl'
            }
          />
        </div>
        <div
          className={
            option === 'UserAdress'
              ? 'bg-black flex flex-row px-4 py-3 rounded-md items-center mb-2 cursor-pointer'
              : 'bg-white flex flex-row px-4 py-3 rounded-md items-center mb-2 cursor-pointer'
          }
          onClick={() => handleSetOption('UserAdress')}
        >
          <img
            className="h-8 object-contain mt-1"
            src="https://mcdn.coolmate.me/image/September2023/mceclip2_76.png"
            alt="icon"
          />
          <p
            className={
              option === 'UserAdress'
                ? 'text-white w-[84%] ml-3'
                : 'text-black w-[84%] ml-3'
            }
          >
            Sổ địa chỉ
          </p>
          <ArrowRightOutlined
            className={
              option === 'UserAdress'
                ? 'text-white text-2xl'
                : 'text-black text-2xl'
            }
          />
        </div>
        <div
          className={
            option === 'Review'
              ? 'bg-black flex flex-row px-4 py-3 rounded-md items-center mb-2 cursor-pointer'
              : 'bg-white flex flex-row px-4 py-3 rounded-md items-center mb-2 cursor-pointer'
          }
          onClick={() => handleSetOption('Review')}
        >
          <img
            className="h-8 object-contain mt-1"
            src="https://mcdn.coolmate.me/image/September2023/mceclip3_71.png"
            alt="icon"
          />
          <p
            className={
              option === 'Review'
                ? 'text-white w-[84%] ml-3'
                : 'text-black w-[84%] ml-3'
            }
          >
            Đánh giá và phản hồi
          </p>
          <ArrowRightOutlined
            className={
              option === 'Review'
                ? 'text-white text-2xl'
                : 'text-black text-2xl'
            }
          />
        </div>
        <div
          className={
            option === 'Logout'
              ? 'bg-black flex flex-row px-4 py-3 rounded-md items-center mb-2 cursor-pointer'
              : 'bg-white flex flex-row px-4 py-3 rounded-md items-center mb-2 cursor-pointer'
          }
          onClick={() => handleSetOption('Logout')}
        >
          <img
            className="h-8 object-contain mt-1"
            src="https://mcdn.coolmate.me/image/September2023/mceclip4_6.png"
            alt="icon"
          />
          <p
            className={
              option === 'Logout'
                ? 'text-white w-[84%] ml-3'
                : 'text-black w-[84%] ml-3'
            }
          >
            Đăng xuất
          </p>
          <ArrowRightOutlined
            className={
              option === 'Logout'
                ? 'text-white text-2xl'
                : 'text-black text-2xl'
            }
          />
        </div>
      </div>
      <div className="bg-white py-12 px-12 w-[59%] h-auto rounded-md">
        {option === 'Info' ? (
          <Info />
        ) : option === 'Orders' ? (
          <Orders />
        ) : option === 'UserAdress' ? (
          <UserAdress />
        ) : option === 'Review' ? (
          <Review />
        ) : (
          <p></p>
        )}
      </div>
    </div>
  )
}
export default UserAccount
