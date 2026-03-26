interface WeekIconProps {
  color?: string;
}

export default function WeekIcon({ color = "currentColor" }: WeekIconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.6667 2.66667H12V1.33333H10.6667V2.66667H5.33333V1.33333H4V2.66667H3.33333C2.59333 2.66667 2 3.26667 2 4V13.3333C2 14.0667 2.59333 14.6667 3.33333 14.6667H12.6667C13.4 14.6667 14 14.0667 14 13.3333V4C14 3.26667 13.4 2.66667 12.6667 2.66667ZM12.6667 13.3333H3.33333V6H12.6667V13.3333ZM4.33333 8.66667C4.33333 7.74667 5.08 7 6 7C6.92 7 7.66667 7.74667 7.66667 8.66667C7.66667 9.58667 6.92 10.3333 6 10.3333C5.08 10.3333 4.33333 9.58667 4.33333 8.66667Z" fill={color}/>
    </svg>
  );
}
