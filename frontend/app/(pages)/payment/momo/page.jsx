'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useEffect } from 'react'
import CheckSVG from '../../../../public/success-svg'
import FailureSVG from '../../../../public/failure-svg'
import { Button } from '@/components/ui/button'
import { postApi } from '@/lib/fetch'

const PaymentMomo = () => {
  const param = useSearchParams()
  const [responseStatus, setResponseStatus] = useState('')
  useEffect(() => {
    if (param) {
      setResponseStatus(param.get('resultCode'))
      postApi({
        endPoint: `/api/order/confirmMomoPayment?${param.toString()}`
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [param])

  const router = useRouter()
  return (
    <div className="w-full h-full p-[120px]">
      <div className=" flex justify-center">
        <div className=" border-1 rounded-sm flex flex-col items-center pt-10 pb-10 px-40">
          {responseStatus === '0' ? (
            <CheckSVG className="w-20 h-20" />
          ) : (
            <FailureSVG className="w-20 h-20" />
          )}
          <div className="text-lg font-[500] mt-5">
            {responseStatus === '0'
              ? 'Bạn đã thanh toán thành công'
              : 'Bạn đã thanh toán thất bại'}
          </div>
          <Button className="mt-[80px]" onClick={() => router.replace('/')}>
            Quay về trang chủ
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PaymentMomo
