import Image from 'next/image'

const CollectionBanner = ({ imageUrl }) => {
  return (
    <div className="w-full h-fit">
      <Image
        alt="Collection Banner"
        src={imageUrl}
        width={1920}
        height={990}
        objectFit="cover"
      />
    </div>
  )
}

export default CollectionBanner
