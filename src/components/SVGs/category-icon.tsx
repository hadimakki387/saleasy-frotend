import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  size: number;
  fill: string;
};

function CategoryIcon({ fill = "var(--primary)", size = 16, ...rest }: Props) {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 64 64"
      data-testid="CategoryIcon"
      fill="currentColor"
      width={size}
      height={size}
      {...rest}
    >
      <path
        d="m29 11v14a4 4 0 0 1 -4 4h-14a4 4 0 0 1 -4-4v-14a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4zm24-4h-14a4 4 0 0 0 -4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4v-14a4 4 0 0 0 -4-4zm-28 28h-14a4 4 0 0 0 -4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4v-14a4 4 0 0 0 -4-4zm21 0a11 11 0 1 0 11 11 11 11 0 0 0 -11-11z"
        fill={fill}
      ></path>
    </svg>
  );
}

export default CategoryIcon;
