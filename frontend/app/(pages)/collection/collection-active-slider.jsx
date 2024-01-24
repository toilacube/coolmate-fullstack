'use client'
import Image from 'next/image'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
const CollectionActiveSlider = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  }
  const images = [
    'https://media.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/October2023/mceclip2_27.jpg',
    'https://media.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/October2023/mceclip5_2.jpg',
    'https://media.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/October2023/mceclip4_69.jpg',
    'https://media.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/October2023/mceclip1_3.jpg',
    'https://media.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/October2023/mceclip0_108.jpg'
  ]
  return (
    <div className="pt-[30px] mb-4">
      <h3 className="mb-[10px] text-3xl px-[16px]">
        #Coolmate đồng hành trên các chặng đường
      </h3>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        removeArrowOnDeviceType={['tablet', 'mobile']}
      >
        {images.map((image, index) => (
          <div key={index} className="w-[290px] h-[350px]">
            <Image fill src={image} alt="Image Slider" className="px-1" />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default CollectionActiveSlider
