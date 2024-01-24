'use client'
import { ImLink } from 'react-icons/im'
import { HiArchive } from 'react-icons/hi'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const Catalog = () => {
  const router = useRouter()
  const link = usePathname().split('/').slice(-1)[0]
  return (
    <div className="flex justify-center items-start flex-col pt-8">
      <div className="uppercase text-xs font-[600]">Catalog</div>
      <div className="pt-[14px] space-y-3 w-full pr-2 relative">
        <div
          className={cn(
            'flex items-center cursor-pointer p-2 gap-3 pl-4',
            link === 'products' && 'bg-zinc-100/70 rounded-md text-teal-700',
            link !== 'products' && 'hover:bg-zinc-100/70 rounded-md'
          )}
          onClick={() => router.push('/admin/products')}
        >
          <div
            className={cn(
              'absolute left-0 bg-teal-700 rounded-r-full w-[4px] transition-all',
              link === 'products' && 'h-[36px]'
            )}
          />
          <HiArchive className="h-4 w-4" />
          <p className="text-xs font-semibold">Products</p>
        </div>
        <div
          className={cn(
            'flex items-center cursor-pointer p-2 gap-3 pl-4',
            link === 'categories' && 'bg-zinc-100/70 rounded-md text-teal-700',
            link !== 'categories' && 'hover:bg-zinc-100/70 rounded-md'
          )}
          onClick={() => router.push('/admin/categories')}
        >
          <div
            className={cn(
              'absolute left-0 bg-teal-700 rounded-r-full w-[4px] transition-all',
              link === 'categories' && 'h-[36px]'
            )}
          />
          <ImLink className="h-4 w-4" />
          <p className="text-xs font-semibold">Categories</p>
        </div>
      </div>
    </div>
  )
}

export default Catalog
