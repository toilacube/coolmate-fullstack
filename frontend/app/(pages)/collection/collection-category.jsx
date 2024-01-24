import Image from 'next/image'

const CollectionCategory = ({ category, setSlug }) => {
  return (
    <div
      className="mx-8 relative w-[161px] h-[107px] cursor-pointer"
      onClick={() => setSlug(category.slug)}
    >
      <Image
        alt="Collection Category"
        src={category.imageUrl}
        fill
        className="hover:brightness-50 transition-opacity duration-300 rounded-2xl"
      />
    </div>
  )
}

export default CollectionCategory
