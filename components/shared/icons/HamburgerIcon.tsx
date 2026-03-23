interface HamburgerIconProps {
  size?: number;
  color?: string;
}

export default function HamburgerIcon({ color = "#222222" }: HamburgerIconProps) {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 10V12H0V10H18ZM18 5V7H0V5H18ZM18 2H0V0H18V2Z" fill={color} />
    </svg>
  );
}
