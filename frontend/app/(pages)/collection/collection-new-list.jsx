import CardBanner from '../../../components/card/card-banner'
import { Button } from '@/components/ui/button'
import CardProductTest from '../../../components/card/card-product-test'

const CollectionNewList = ({ data, response, handleGetData }) => {
  return (
    <div className="max-w-full px-[30px] not-italic">
      <h2 className="text-[2.875rem] font-[600] mb-[30px]">Sản phẩm mới</h2>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5 grid-cols-2 max-w-full mx-auto">
        <CardBanner
          bannerUrl={
            'https://mcdn.coolmate.me/image/September2023/mceclip2_42.png'
          }
        />
        {data &&
          data.map((product, index) => {
            return <CardProductTest key={index} product={product} />
          })}
      </div>
      {response.data && response.pageNumber !== response.totalPages && (
        <div className="flex items-center justify-center flex-col py-[20px] relative mt-[40px] gap-5">
          <Button
            variant="outline"
            className="rounded-[1.5rem] bg-black text-white uppercase h-[45px] py-[0.875rem] px-[2.875rem] font-[700] hover:bg-gray-300/60 hover:text-black"
            onClick={() => handleGetData(response.nextPage)}
          >
            Xem thêm
          </Button>
          <p className="opacity-60 text-xs">
            Hiển thị 1 - {Object.keys(response.data).length} trên tổng số{' '}
            {response.totalRecords} sản phẩm
          </p>
        </div>
      )}
    </div>
  )
}

export default CollectionNewList
