import type { SVGProps } from 'react';

export function ShapesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="none"
    >
      <circle cx="7" cy="7" r="5" fill="hsl(var(--chart-3))" />
      <rect
        x="12"
        y="12"
        width="10"
        height="10"
        rx="2"
        fill="hsl(var(--chart-1))"
      />
      <polygon points="12,2 17,11 7,11" fill="hsl(var(--chart-4))" />
    </svg>
  );
}
