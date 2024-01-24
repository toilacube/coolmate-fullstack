'use client'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { BsBoxFill } from 'react-icons/bs'
const Sale = () => {
  const router = useRouter()
  const link = usePathname().split('/').slice(-1)[0]
  return (
    <div className="flex justify-center items-start flex-col pt-8">
      <div className="uppercase text-xs font-[600]">Sale</div>
      <div className="pt-[14px] space-y-3 w-full pr-2 relative">
        <div
          className={cn(
            'flex items-center cursor-pointer p-2 gap-3 pl-4',
            link === 'orders' && 'bg-zinc-100/70 rounded-md text-teal-700',
            link !== 'orders' && 'hover:bg-zinc-100/70 rounded-md'
          )}
          onClick={() => router.push('/admin/orders')}
        >
          <div
            className={cn(
              'absolute left-0 bg-teal-700 rounded-r-full w-[4px] transition-all',
              link === 'orders' && 'h-[36px]'
            )}
          />
          <BsBoxFill className="h-4 w-4" />
          <p className="text-xs font-semibold">Orders</p>
        </div>
      </div>
    </div>
  )
}

export default Sale
