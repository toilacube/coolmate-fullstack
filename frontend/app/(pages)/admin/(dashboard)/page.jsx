import BestSellers from './Bestsellers'
import LifetimeSale from './Lifetimesales'
import SaleStatistic from './Statistic'

const AdminPage = () => {
  return (
    <div className="w-full h-full bg-gray-100/70 flex justify-center pt-10 gap-4 overflow-hidden">
      <div className="w-[50%] h-full flex flex-col space-y-4">
        <SaleStatistic />
        <BestSellers />
      </div>
      <div className="w-[25%] h-full">
        <LifetimeSale />
      </div>
    </div>
  )
}

export default AdminPage
