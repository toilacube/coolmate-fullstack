'use client'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { AiFillGift, AiFillHome } from 'react-icons/ai'
import { HiArchive } from 'react-icons/hi'
import { ImLink } from 'react-icons/im'
const QuickLink = () => {
  const link = usePathname().split('/').slice(-1)[0] // get the last part of the url
  const router = useRouter()
  return (
    <div className="flex items-start flex-col pt-2">
      <div className="uppercase text-xs font-[600]">Quick links</div>
      <div className="pt-[14px] space-y-3 w-full pr-2 relative">
        <div
          className={cn(
            'flex items-center cursor-pointer p-2 gap-3 pl-4',
            link === 'admin' && 'bg-zinc-100/70 rounded-md text-teal-700',
            link !== 'admin' && 'hover:bg-zinc-100/70 rounded-md'
          )}
          onClick={() => router.push('/admin')}
        >
          <div
            className={cn(
              'absolute left-0 bg-teal-700 rounded-r-full w-[4px] transition-all',
              link === 'admin' && 'h-[36px]'
            )}
          />
          <AiFillHome className="h-4 w-4" />
          <p className="text-xs font-semibold">Dashboard</p>
        </div>
        <div
          className={cn(
            'flex items-center cursor-pointer p-2 gap-3 pl-4 ',
            link === 'create-product' &&
              'bg-zinc-100/70 rounded-md text-teal-700',
            link !== 'create-product' && 'hover:bg-zinc-100/70 rounded-md'
          )}
          onClick={() => router.push('/admin/create-product')}
        >
          <div
            className={cn(
              'absolute left-0 bg-teal-700 rounded-r-full w-[4px] transition-all',
              link === 'create-product' && 'h-[36px]'
            )}
          />
          <HiArchive className="h-4 w-4" />
          <p className="text-xs font-semibold">New Product</p>
        </div>
        <div
          className={cn(
            'flex items-center cursor-pointer p-2 gap-3 pl-4',
            link === 'create-coupon' &&
              'bg-zinc-100/70 rounded-md text-teal-700',
            link !== 'create-coupon' && 'hover:bg-zinc-100/70 rounded-md'
          )}
          onClick={() => router.push('/admin/create-coupon')}
        >
          <div
            className={cn(
              'absolute left-0 bg-teal-700 rounded-r-full w-[4px] transition-all',
              link === 'create-coupon' && 'h-[36px]'
            )}
          />
          <AiFillGift className="h-4 w-4" />
          <p className="text-xs font-semibold">New Coupon</p>
        </div>
        <div
          className={cn(
            'flex items-center cursor-pointer p-2 gap-3 pl-4',
            link === 'create-category' &&
              'bg-zinc-100/70 rounded-md text-teal-700',
            link !== 'create-category' && 'hover:bg-zinc-100/70 rounded-md'
          )}
          onClick={() => router.push('/admin/create-category')}
        >
          <div
            className={cn(
              'absolute left-0 bg-teal-700 rounded-r-full w-[4px] transition-all',
              link === 'create-category' && 'h-[36px]'
            )}
          />
          <ImLink className="h-4 w-4" />
          <p className="text-xs font-semibold">New Category</p>
        </div>
      </div>
    </div>
  )
}

export default QuickLink
