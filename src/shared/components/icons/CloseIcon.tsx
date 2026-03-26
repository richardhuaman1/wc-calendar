interface CloseIconProps {
  size?: number;
  color?: string;
}

export default function CloseIcon({ size = 12, color = "#5E5E5E" }: CloseIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6667 1.175L10.4917 0L5.83333 4.65833L1.175 0L0 1.175L4.65833 5.83333L0 10.4917L1.175 11.6667L5.83333 7.00833L10.4917 11.6667L11.6667 10.4917L7.00833 5.83333L11.6667 1.175Z"
        fill={color}
      />
    </svg>
  );
}
