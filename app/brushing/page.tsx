"use client"

import { useEffect, useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pause, Play, RotateCcw, CheckCircle } from "lucide-react"
import { achievements } from "@/lib/achievements"
import { AchievementNotification } from "@/components/achievement-notification"

export default function BrushingPage() {
  const [time, setTime] = useState(120) // 2 minutes in seconds
  const [isActive, setIsActive] = useState(true)
  const [unlockedAchievement, setUnlockedAchievement] = useState<(typeof achievements)[0] | null>(null)
  const router = useRouter()

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
      // Check for perfect time achievement
      const perfectTimeAchievement = achievements.find((a) => a.id === "perfect-time")
      if (perfectTimeAchievement) {
        setUnlockedAchievement(perfectTimeAchievement)
      }

      // Navigate to results page after timer completes and notification is closed
      setTimeout(() => {
        if (!unlockedAchievement) {
          router.push("/results")
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time, router, unlockedAchievement])

  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  const progress = ((120 - time) / 120) * 100

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  const handleReset = () => {
    setTime(120)
    setIsActive(true)
  }

  const handleComplete = () => {
    setIsActive(false)

    // Check for first brush achievement
    const firstBrushAchievement = achievements.find((a) => a.id === "first-brush")
    if (firstBrushAchievement) {
      setUnlockedAchievement(firstBrushAchievement)
    } else {
      // Navigate to results page
      router.push("/results")
    }
  }

  const handleNotificationClose = () => {
    setUnlockedAchievement(null)
    router.push("/results")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-primary/10 to-white dark:from-gray-900 dark:to-gray-950">
      <AchievementNotification achievement={unlockedAchievement} onClose={handleNotificationClose} />

      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-xs aspect-square rounded-full flex items-center justify-center relative border-none shadow-xl animate-scale">
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div
              className="absolute bottom-0 left-0 right-0 bg-primary/20 transition-all"
              style={{ height: `${progress}%` }}
            ></div>
          </div>
          <div className="absolute inset-3 rounded-full border-8 border-primary/30"></div>
          <div className="text-center z-10">
            <div className="text-6xl font-bold tabular-nums text-gray-900" aria-live="polite" aria-atomic="true">
              {`${minutes}:${seconds.toString().padStart(2, "0")}`}
            </div>
            <div className="mt-2 text-xl font-medium text-gray-600">DAKİKA</div>
          </div>
        </Card>
      </div>

      <div className="p-6 pb-24">
        <div className="flex justify-center gap-4">
          <Button onClick={handleToggle} variant="outline" size="icon" className="w-12 h-12 rounded-full shadow-md">
            {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full shadow-md"
            disabled={time === 120 && isActive}
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
          <Button
            onClick={handleComplete}
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full shadow-md bg-green-50 border-green-200 text-green-600 hover:bg-green-100 hover:text-green-700"
          >
            <CheckCircle className="h-5 w-5" />
          </Button>
        </div>
        <div className="text-center mt-4 text-sm text-muted-foreground">
          Fırçalamayı tamamladıysanız yeşil tik butonuna basabilirsiniz
        </div>
      </div>
      <BottomNavigation active="home" />
    </div>
  )
}
