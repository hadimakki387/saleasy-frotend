import React from "react";

interface Props {
  fill?: string;
  size?: number;
  className?: string;
}

function Bell({ className, fill = "var(--primary)", size = 16 }: Props) {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1bt8gba"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="NotificationsIcon"
      width={size}
      height={size}
    >
      <path
        d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2m6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1z"
        fill={fill}
      ></path>
    </svg>
  );
}

export default Bell;