import React, { useEffect, useState, ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface SeCarouselProps {
  children: ReactNode;
  options: EmblaOptionsType;
  visibleCards?: number; // Optional prop to define how many cards to show
  containerWidthPercentage?: number; // Optional prop to adjust container width
}

const SeCarousel: React.FC<SeCarouselProps> = ({
  children,
  options,
  visibleCards = 5, // Default to showing 5 cards
  containerWidthPercentage = 100, // Default to full width
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [slideWidth, setSlideWidth] = useState<string>('20%'); // Default to 20% width per slide for 5 cards

  useEffect(() => {
    const calculateSlideWidth = () => {
      // Adjust slide width based on the number of visible cards
      const newWidth = `${100 / visibleCards}%`;
      setSlideWidth(newWidth);
    };

    calculateSlideWidth();

    if (emblaApi) {
      console.log('Embla initialized', emblaApi);
    }
  }, [emblaApi, visibleCards]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div
      className="relative overflow-hidden group"
      style={{ width: `${containerWidthPercentage}%` }}
    >
      <div
        className="embla__viewport overflow-hidden"
        ref={emblaRef}
      >
        <div className="embla__container flex space-x-0">
          {React.Children.count(children) > 0 ? (
            React.Children.map(children, (child) => (
              <div
                className="embla__slide flex-shrink-0"
                style={{ width: slideWidth }}
              >
                {child}
              </div>
            ))
          ) : (
            <div
              className="embla__slide flex-shrink-0"
              style={{ width: slideWidth }}
            >
              <p>No content available</p>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 transform -translate-y-1/2 bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-full z-10 focus:outline-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-label="Previous Slide"
        style={{ left: '0rem' }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 transform -translate-y-1/2 bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-full z-10 focus:outline-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-label="Next Slide"
        style={{ right: '0rem' }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default SeCarousel;
