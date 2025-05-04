import type React from "react"
import { cn } from "@/lib/utils"

interface BadgeIconProps {
  name: string
  icon: React.ReactNode
  earned?: boolean
  progress?: number
  className?: string
}

export function BadgeIcon({ name, icon, earned = false, progress, className }: BadgeIconProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        className={cn(
          "relative w-16 h-16 rounded-full flex items-center justify-center",
          earned ? "bg-gradient-to-br from-amber-300 to-amber-500 shadow-lg" : "bg-gray-200",
        )}
      >
        {/* Progress ring */}
        {progress !== undefined && progress < 100 && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              strokeWidth="4"
              stroke="#0ea5e9"
              fill="transparent"
              strokeDasharray={28 * 2 * Math.PI}
              strokeDashoffset={28 * 2 * Math.PI * (1 - progress / 100)}
              className="transition-all duration-700 ease-out"
            />
          </svg>
        )}

        {/* Icon */}
        <div className={cn("text-2xl", earned ? "text-white" : "text-gray-400")}>{icon}</div>

        {/* Earned checkmark */}
        {earned && (
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
      <span className={cn("mt-2 text-xs font-medium text-center", earned ? "text-gray-900" : "text-gray-500")}>
        {name}
      </span>
    </div>
  )
}
