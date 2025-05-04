"use client"

import Link from "next/link"
import { Home, Smile, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  active: "home" | "cavities" | "history"
}

export function BottomNavigation({ active }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg z-50 max-w-md mx-auto">
      <div className="flex justify-around py-4">
        <Link href="/dashboard" className="flex flex-col items-center">
          <div
            className={cn("p-2 rounded-full transition-colors", active === "home" ? "bg-primary/10" : "transparent")}
          >
            <Home className={cn("h-6 w-6", active === "home" ? "text-primary" : "text-gray-500 dark:text-gray-400")} />
          </div>
          <span
            className={cn(
              "text-xs mt-1 font-medium",
              active === "home" ? "text-primary" : "text-gray-500 dark:text-gray-400",
            )}
          >
            Ana Sayfa
          </span>
        </Link>
        <Link href="/results" className="flex flex-col items-center">
          <div
            className={cn(
              "p-2 rounded-full transition-colors",
              active === "cavities" ? "bg-primary/10" : "transparent",
            )}
          >
            <Smile
              className={cn("h-6 w-6", active === "cavities" ? "text-primary" : "text-gray-500 dark:text-gray-400")}
            />
          </div>
          <span
            className={cn(
              "text-xs mt-1 font-medium",
              active === "cavities" ? "text-primary" : "text-gray-500 dark:text-gray-400",
            )}
          >
            Çürükler
          </span>
        </Link>
        <Link href="/history" className="flex flex-col items-center">
          <div
            className={cn("p-2 rounded-full transition-colors", active === "history" ? "bg-primary/10" : "transparent")}
          >
            <Clock
              className={cn("h-6 w-6", active === "history" ? "text-primary" : "text-gray-500 dark:text-gray-400")}
            />
          </div>
          <span
            className={cn(
              "text-xs mt-1 font-medium",
              active === "history" ? "text-primary" : "text-gray-500 dark:text-gray-400",
            )}
          >
            Geçmiş
          </span>
        </Link>
      </div>
    </div>
  )
}
