import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowForward } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

type Props = {
  text?: string;
  textClassName?: string;
  target?: string;
};

function LinkArrowAnimation({
  text = "more products",
  textClassName,
  target,
}: Props) {
  return (
    <Link
      href={target || "/"}
      className="relative inline-flex items-center gap-2 pb-1 text-[var(--primary)] font-semibold hover:text-[#1F2937] transition-colors"
    >
      <span className={"relative group " + textClassName}>
        {text}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full group-hover:bg-[#1F2937]"></span>
      </span>
      <FontAwesomeIcon icon={faArrowRight} className="text-base" />
    </Link>
  );
}

export default LinkArrowAnimation;
