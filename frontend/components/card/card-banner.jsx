import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
const CardBanner = ({ bannerUrl }) => {
  return (
    <div className="h-[485px] w-full cursor-pointer overflow-hidden rounded-xl">
      <AspectRatio ratio={9 / 16}>
        <Image alt="Banner Image" src={bannerUrl} fill />
      </AspectRatio>
    </div>
  )
}

export default CardBanner
