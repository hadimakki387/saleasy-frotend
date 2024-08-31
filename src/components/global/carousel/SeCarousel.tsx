import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { PrevButton, NextButton, usePrevNextButtons } from "./CarouselButtons";
import "./index.css";

type PropType = {
  options?: EmblaOptionsType;
  children?: React.ReactNode;
  hasButtons?: boolean;
};

const DaCarousel: React.FC<PropType> = (props) => {
  const { options, children, hasButtons = true } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{children}</div>
      </div>

      {hasButtons && (
        <>
          {!prevBtnDisabled && (
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
          )}
          {!nextBtnDisabled && (
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          )}
        </>
      )}
    </div>
  );
};

export default DaCarousel;
