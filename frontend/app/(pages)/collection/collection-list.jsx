import CardBanner from '../../../components/card/card-banner'
import CardProductTest from '../../../components/card/card-product-test'

const CollectionList = ({ data }) => {
  return (
    <div className="max-w-full">
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5 grid-cols-2 pt-[45px] max-w-full px-[30px] mx-auto">
        <CardBanner
          bannerUrl={
            'https://media.coolmate.me/cdn-cgi/image/quality=80/image/August2023/Rectangle_245_(11).png'
          }
        />
        {data &&
          data.map((product, index) => {
            return <CardProductTest key={index} product={product} />
          })}
      </div>
    </div>
  )
}

export default CollectionList
