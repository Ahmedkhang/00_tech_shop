'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Laptop, Smartphone, Headphones, Watch, Monitor } from 'lucide-react';
import { Banner } from '../../types';
import Link from 'next/link';


const TechBannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const banners: Banner[] = [
    {
      id: 1,
      title: "Premium Laptops",
      subtitle: "Power Meets Performance",
      description: "Discover our latest collection of high-performance laptops designed for professionals and gamers alike.",
      buttonText: "Shop Laptops",
      buttonLink: "/laptops",
      bgGradient: "from-purple-900 via-blue-900 to-indigo-900",
      icon: <Laptop className="w-32 h-32 text-blue-400" />,
      accent: "blue "
    },
    {
      id: 2,
      title: "Smart Phones",
      subtitle: "Innovation in Your Pocket",
      description: "Experience cutting-edge technology with our premium smartphone collection featuring the latest specs.",
      buttonText: "Explore Phones",
      buttonLink: "/mobiles",
      bgGradient: "from-emerald-900 via-teal-900 to-cyan-900",
      icon: <Smartphone className="w-32 h-32 text-emerald-400" />,
      accent: "emerald"
    },
    {
      id: 3,
      title: "Audio Gear",
      subtitle: "Immersive Sound Experience",
      description: "Premium headphones and audio equipment for audiophiles and music enthusiasts.",
      buttonText: "Shop Audio",
      buttonLink: "/audio",
      bgGradient: "from-rose-900 via-pink-900 to-fuchsia-900",
      icon: <Headphones className="w-32 h-32 text-rose-400" />,
      accent: "rose"
    },
    {
      id: 4,
      title: "Smart Watches",
      subtitle: "Technology on Your Wrist",
      description: "Stay connected with our collection of smartwatches featuring health tracking and connectivity.",
      buttonText: "View Watches",
      buttonLink: "/watches",
      bgGradient: "from-amber-900 via-orange-900 to-red-900",
      icon: <Watch className="w-32 h-32 text-amber-400" />,
      accent: "amber"
    },
    {
      id: 5,
      title: "Monitors & Displays",
      subtitle: "Visual Excellence",
      description: "Ultra-wide and 4K monitors for gaming, design, and professional work environments.",
      buttonText: "Shop Displays",
      buttonLink: "/monitors",
      bgGradient: "from-violet-900 via-purple-900 to-indigo-900",
      icon: <Monitor className="w-32 h-32 text-violet-400" />,
      accent: "violet"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, currentSlide]);

  const getButtonClasses = (accent: string) => {
    const baseClasses = "px-8 py-4 rounded-full cursor-pointer font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl";
    
    switch (accent) {
      case 'blue':
        return `${baseClasses} bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700`;
      case 'emerald':
        return `${baseClasses} bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700`;
      case 'rose':
        return `${baseClasses} bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700`;
      case 'amber':
        return `${baseClasses} bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700`;
      case 'violet':
        return `${baseClasses} bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700`;
      default:
        return `${baseClasses} bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700`;
    }
  };

  return (
    <div className="relative w-full mx-auto ">
      {/* Main Slider Container */}
      <div 
        className="relative h-[500px] md:h-[600px] overflow-hidden  shadow-2xl"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {/* Slider Wrapper */}
        <div 
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner) => (
            <div 
              key={banner.id}
              className={`min-w-full h-full bg-gradient-to-br ${banner.bgGradient} flex items-center justify-between px-8 md:px-16 lg:px-24`}
            >
              {/* Content Side */}
              <div className="flex-1 text-white z-10">
                <div className="max-w-xl">
                  <h3 className="text-lg md:text-xl font-medium text-gray-300 mb-2">
                    {banner.subtitle}
                  </h3>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    {banner.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                    {banner.description}
                  </p>
                  <Link className='cursor-pointer' href={banner.buttonLink}>
                   <button className={getButtonClasses(banner.accent)}>
                    {banner.buttonText}
                  </button>
                  </Link>
                </div>
              </div>

              {/* Visual Side */}
              <div className="flex-1 flex items-center justify-center">
                <div className="relative">
                  {/* Floating Animation Container */}
                  <div className="animate-pulse">
                    {banner.icon}
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white bg-opacity-5 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-blue-500 scale-125' 
                : 'bg-gray-400 hover:bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
        <div 
          className="bg-blue-500 h-1 rounded-full transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / banners.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default TechBannerSlider;