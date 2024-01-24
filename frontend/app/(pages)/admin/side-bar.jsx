import { ScrollArea } from '@/components/ui/scroll-area'
import QuickLink from './quick-links'
import Catalog from './catalog'
import Sale from './sale'
import Customer from './customer'
import Promotion from './promotion'
import Banner from './banner'

const SideBar = () => {
  return (
    <ScrollArea className="h-full w-[200px] p-[4px] border-r-3 border-black pl-2">
      <div className="py-4 pb-10 ">
        <QuickLink />
        <Catalog />
        <Sale />
        <Customer />
        <Promotion />
        <Banner />
      </div>
    </ScrollArea>
  )
}

export default SideBar
