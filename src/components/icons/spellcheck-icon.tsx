import type { SVGProps } from 'react';

export function SpellCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        fill="hsl(var(--chart-2))"
        stroke="none"
      />
      <text
        x="12"
        y="16"
        fontFamily="sans-serif"
        fontSize="14"
        fill="white"
        textAnchor="middle"
        fontWeight="bold"
      >
        A
      </text>
    </svg>
  );
}
