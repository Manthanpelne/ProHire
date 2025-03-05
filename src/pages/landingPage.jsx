import { Button } from "@/components/ui/button";
import { useTheme } from "@/contextApi/context";
import { Link } from "react-router-dom";
import React from "react";
import Autoplay from "embla-carousel-autoplay"
import companies from "../data/companies.json"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export const LandingPage = () => {
 
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  console.log(companies)

  return (
     <>
     <section className="max-w-screen-2xl mx-auto">
    <div className="mt-[80px] w-[50%] m-auto  text-center">
     <h1 className="text-[35px] md:text-6xl font-bold tracking-wide">Discover your dream Job!</h1> 
     <p className="text-gray-400 text-[20px] mt-4">Lorem ipsum dolor sit amet.</p> 
    </div>

<div className="flex mt-6 justify-center gap-6">
    <Link to="/jobs">
     <Button size="lg">Find Job</Button>
    </Link>
    <Link to="/post-job">
     <Button size="lg" varient="outline">Post Job</Button>
    </Link>
</div>

<div>
<Carousel className="w-full py-10">
      <CarouselContent className="-ml-1">
        {companies.map(({name,id,path})=>{
        return (
        <CarouselItem key={id}>
        <img src={path} alt={name} />
        </CarouselItem>
        );
        })}
      </CarouselContent>
    </Carousel>

</div>

 
     </section>
      </>
  );
};
