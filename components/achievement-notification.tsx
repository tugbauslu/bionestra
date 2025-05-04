"use client"

import { useState, useEffect } from "react"
import type { Achievement } from "@/lib/achievements"
import { BadgeIcon } from "@/components/badge-icon"

interface AchievementNotificationProps {
  achievement: Achievement | null
  onClose: () => void
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (achievement) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onClose, 500) // Wait for exit animation to complete
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [achievement, onClose])

  if (!achievement) return null

  return (
    <div
      className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg border border-primary/20 p-4 flex items-center gap-4 max-w-xs w-full mx-auto">
        <div className="flex-shrink-0">
          <BadgeIcon
            name={achievement.name}
            icon={<achievement.icon className="h-6 w-6" />}
            earned={true}
            className="scale-75 sm:scale-100"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-sm">Yeni Rozet Kazandın!</h3>
          <p className="text-sm font-medium text-primary">{achievement.name}</p>
          <p className="text-xs text-muted-foreground">{achievement.description}</p>
          <p className="text-xs font-medium mt-1">+{achievement.points} puan</p>
        </div>
      </div>
    </div>
  )
}
