import React from 'react'
import CategoryList from '../componets/CategoryList'
import BannerProduct from '../componets/BannerProduct'
import HorizontalCategoryProduct from '../componets/HorizontalCategoryProduct'
import VerticalCategoryProduct from '../componets/VerticalCategoryProduct'

function Home() {
  return (
    <div className='pt-23 bg-green-50 p-2'>
      <CategoryList />
      <BannerProduct />
      <HorizontalCategoryProduct category={'earphones'} heading={"top's Earphones"} />
      <HorizontalCategoryProduct category={'trimmers'} heading={"top's Trimmers"} />
      <HorizontalCategoryProduct category={'watches'} heading={"top's Watches"} />

      <VerticalCategoryProduct category={'televisions'} heading={"Best Televisions "} />
      <VerticalCategoryProduct category={'refrigerator'} heading={"Refrigerator"} />
      <VerticalCategoryProduct category={'camera'} heading={"Camera and Photos"} />
      <VerticalCategoryProduct category={'airpods'} heading={"Airpods for song "} />
      <VerticalCategoryProduct category={'mobiles'} heading={"Best Mobiles "} />
      <VerticalCategoryProduct category={'mouse'} heading={"all types Mouse "} />
      <VerticalCategoryProduct category={'printers'} heading={"Color Printers"} />
      <VerticalCategoryProduct category={'speakers'} heading={"boAt's speakers"} />

    </div>
  )
}

export default Home