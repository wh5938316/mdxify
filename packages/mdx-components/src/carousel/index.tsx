"use client";

import {
  Carousel as CarouselComponent,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@mdxify/ui/components/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

interface MdxCarouselProps {
  autoplay?: boolean;
  itemsPerPage?: number | string;
  children: React.ReactNode;
}

export function Carousel({
  autoplay = false,
  itemsPerPage = 3,
  children,
}: MdxCarouselProps) {
  // 将 children 转换为数组以便处理
  const childrenArray = React.Children.toArray(children);

  // 根据 itemsPerPage 生成对应的 CSS 类名
  const getItemClassName = () => {
    if (!itemsPerPage) return "";

    if (typeof itemsPerPage === "string") {
      return itemsPerPage;
    }

    // 数字转换为对应的 basis 类名
    switch (itemsPerPage) {
      case 1:
        return "basis-full";
      case 2:
        return "basis-1/2";
      case 3:
        return "basis-1/3";
      case 4:
        return "basis-1/4";
      case 5:
        return "basis-1/5";
      case 6:
        return "basis-1/6";
      default:
        return `basis-1/${itemsPerPage}`;
    }
  };

  return (
    <CarouselComponent
      className="my-8"
      plugins={
        autoplay
          ? [
              Autoplay({
                delay: 2000,
              }),
            ]
          : undefined
      }
    >
      <CarouselContent>
        {childrenArray.map((child, index) => (
          <CarouselItem key={index} className={getItemClassName()}>
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </CarouselComponent>
  );
}

export default Carousel;
