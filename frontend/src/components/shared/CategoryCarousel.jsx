// import React from 'react'
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
// import { Button } from '../ui/button'
// import usePortalStore from '@/store/portalStore'
// import { useNavigate } from 'react-router-dom'

// const CategoryCarousel = () => {
//   const category=[
//     "Frontend Developer","Backend Developer","Data Science","Data Analyst","Graphic Designer","Software Engineer","Fullstack Developer"
//   ]
//   const navigate=useNavigate()

//   const {setSearchedQuery}=usePortalStore()
//   const searchJobs=(item)=>{
//     setSearchedQuery(item)
//     navigate('/browse')
//   }

//   return (
//     <div>
//       <Carousel className={"w-full max-w-xl mx-auto my-20"}>
        
//         <CarouselContent>
//             {category.map((item, index) => (
//               <CarouselItem className={"basis-1/2 sm:basis-1/3"} key={index}>
//                 <Button onClick={()=>searchJobs(item)} className={"bg-[#6a38c2]"}>{item}</Button>
//               </CarouselItem>
//             ))}
//         </CarouselContent>
//         {/* <CarouselPrevious className={"text-[#6a38c2]"}/>
//         <CarouselNext className={"text-[#6a38c2]"}/> */}
//       </Carousel>
//     </div>
//   )
// }

// export default CategoryCarousel


import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import usePortalStore from '@/store/portalStore'
import { useNavigate } from 'react-router-dom'

const CategoryCarousel = () => {
  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Data Analyst",
    "Graphic Designer",
    "Software Engineer",
    "Fullstack Developer"
  ]

  const navigate = useNavigate()
  const { setSearchedQuery } = usePortalStore()

  const searchJobs = (item) => {
    setSearchedQuery(item)
    navigate('/browse')
  }

  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4">
      <Carousel>
        <CarouselContent>
          {categories.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <Button
                variant="secondary"
                className="w-full h-14 bg-[#6a38c2] text-white text-xs sm:text-sm rounded-md hover:text-black cursor-pointer"
                onClick={() => searchJobs(item)}
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="text-[#6a38c2]" />
        <CarouselNext className="text-[#6a38c2]" /> */}
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
