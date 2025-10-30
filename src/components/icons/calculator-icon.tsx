import type { SVGProps } from 'react';

export function CalculatorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        width="16"
        height="20"
        x="4"
        y="2"
        rx="2"
        fill="hsl(var(--chart-1))"
        stroke="none"
      />
      <line x1="8" x2="16" y1="6" y2="6" stroke="white" />
      <line x1="12" x2="12" y1="10" y2="18" stroke="white" />
      <line x1="8" x2="16" y1="14" y2="14" stroke="white" />
    </svg>
  );
}
