export function ToothbrushIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22c-1.5 0-2.2-1.1-2.2-2.5 0-1.3.5-2.5 1.3-3.5.8-1 1.7-1.5 2.9-1.5 1.3 0 2.3.7 3 1.5s1.2 2 1.2 3.5c0 1.4-.7 2.5-2.2 2.5z" />
      <path d="M12 22V10" />
      <path d="M8 10v3" />
      <path d="M16 10v3" />
      <path d="M12.2 10 4 2l-.5-.5" />
      <path d="M9.5 6.5 8 8" />
      <path d="M14.5 6.5 16 8" />
      <path d="M8 4l1 1" />
      <path d="M16 4l-1 1" />
    </svg>
  )
}
