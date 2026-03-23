interface ArrowDownProps {
  size?: number;
  color?: string;
}

export default function ArrowDown({ size = 16, color = "#FB3333" }: ArrowDownProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 10.2667L4 6.26667L4.93333 5.33334L8 8.4L11.0667 5.33334L12 6.26667L8 10.2667Z"
        fill={color}
      />
    </svg>
  );
}
