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
} from "@/components/ui/carousel"


export const LandingPage = () => {
 
  const plugin = Autoplay({ delay: 2000})
  

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
<Carousel className="w-[80%] z-10 m-auto mt-[70px] py-10"
      plugins={[Autoplay({delay:2000})]}>
      <CarouselContent className="flex items-center gap5 sm:gap-20 px-1">
        {companies.map(({name,id,path})=>{
        return (
        <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
        <img className="h-9 sm:h-14 object-contain" src={path} alt={name} />
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
