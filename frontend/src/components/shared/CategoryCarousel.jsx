import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button'
import usePortalStore from '@/store/portalStore'
import { useNavigate } from 'react-router-dom'

const CategoryCarousel = () => {
  const category=[
    "Frontend Developer","Backend Developer","Data Science","Data Analyst","Graphic Designer","Software Engineer","Fullstack Developer"
  ]
  const navigate=useNavigate()

  const {setSearchedQuery}=usePortalStore()
  const searchJobs=(item)=>{
    setSearchedQuery(item)
    navigate('/browse')
  }

  return (
    <div>
      <Carousel className={"w-full max-w-xl mx-auto my-20"}>
        
        <CarouselContent>
            {category.map((item, index) => (
              <CarouselItem className={"basis-1/3"} key={index}>
                <Button onClick={()=>searchJobs(item)} className={"bg-[#6a38c2]"}>{item}</Button>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className={"text-[#6a38c2]"}/>
        <CarouselNext className={"text-[#6a38c2]"}/>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
