import CardType from '../../../components/card/card-type'

const CasualFilter = ({ categories, setFilter }) => {
  return (
    <div className="flex justify-center items-center pt-[37px] pb-[27px]">
      {categories?.map((category, index) => (
        <CardType key={index} category={category} setFilter={setFilter} />
      ))}
    </div>
  )
}

export default CasualFilter
