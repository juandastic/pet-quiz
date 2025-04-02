"use client"

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductRecommendation } from '@/services/api';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface ProductRecommendationsProps {
  products: ProductRecommendation[];
  summary: string;
}

export function ProductRecommendations({ products, summary }: ProductRecommendationsProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: index * containerWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const nextProduct = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const scrollWidth = carouselRef.current.scrollWidth;
      const scrollLeft = carouselRef.current.scrollLeft;

      // Check if we're at the end
      if (scrollLeft + containerWidth >= scrollWidth - 20) {
        // Go back to the first item
        carouselRef.current.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
        setActiveIndex(0);
      } else {
        // Move forward by one container width
        carouselRef.current.scrollTo({
          left: scrollLeft + containerWidth,
          behavior: 'smooth'
        });
        setActiveIndex(Math.min(activeIndex + 1, products.length - 1));
      }
    }
  };

  const prevProduct = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const scrollLeft = carouselRef.current.scrollLeft;

      // Check if we're at the beginning
      if (scrollLeft <= 20) {
        // Go to the last item
        carouselRef.current.scrollTo({
          left: carouselRef.current.scrollWidth - containerWidth,
          behavior: 'smooth'
        });
        setActiveIndex(products.length - 1);
      } else {
        // Move backward by one container width
        carouselRef.current.scrollTo({
          left: scrollLeft - containerWidth,
          behavior: 'smooth'
        });
        setActiveIndex(Math.max(activeIndex - 1, 0));
      }
    }
  };

  const openProductLink = (url: string) => {
    window.open(url, '_blank');
  };

  // Update active index based on scroll position
  const handleScroll = React.useCallback(() => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const scrollLeft = carouselRef.current.scrollLeft;
      const index = Math.round(scrollLeft / containerWidth);

      if (index !== activeIndex && index >= 0 && index < products.length) {
        setActiveIndex(index);
      }
    }
  }, [activeIndex, products.length]);

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-purple-800 mb-2">Recomendación personalizada</h2>
        <p className="text-purple-600">{summary}</p>
      </div>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-purple-800">Productos recomendados</h2>
            <div className="flex space-x-2">
              <Button
                onClick={prevProduct}
                size="icon"
                variant="outline"
                className="rounded-full z-10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={nextProduct}
                size="icon"
                variant="outline"
                className="rounded-full z-10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Unified carousel with snap scrolling for both desktop and mobile */}
          <div className="relative overflow-hidden">
            <div
              className="flex overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-1 no-scrollbar"
              style={{
                WebkitOverflowScrolling: 'touch'
              }}
              onScroll={handleScroll}
              ref={carouselRef}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-full flex-shrink-0 snap-center px-1"
                  onClick={() => openProductLink(product.product_link)}
                >
                  <Card className="bg-white h-full hover:shadow-lg transition-shadow border border-purple-100 overflow-hidden cursor-pointer">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardHeader className="p-4 pb-0 pt-3">
                      <CardTitle className="text-lg font-semibold text-purple-800 line-clamp-2">
                        {product.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="font-bold text-lg text-purple-700 mb-2">
                        ${product.price.toFixed(2)}
                      </div>
                      <p className="text-sm text-gray-600">{product.explanation}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 border-purple-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          openProductLink(product.product_link);
                        }}
                      >
                        Ver en Amazon <ExternalLink className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === activeIndex ? 'bg-purple-600' : 'bg-purple-200'
                }`}
                onClick={() => scrollToIndex(index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
