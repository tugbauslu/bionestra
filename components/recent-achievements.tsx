import type { Achievement, UserProgress } from "@/lib/achievements"
import { BadgeIcon } from "@/components/badge-icon"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award } from "lucide-react"

interface RecentAchievementsProps {
  achievements: Achievement[]
  userProgress: UserProgress
  limit?: number
}

export function RecentAchievements({ achievements, userProgress, limit = 3 }: RecentAchievementsProps) {
  // Get earned achievements sorted by date (most recent first)
  const earnedAchievements = achievements
    .filter((achievement) => userProgress.achievements[achievement.id]?.earned)
    .sort((a, b) => {
      const dateA = userProgress.achievements[a.id].date || ""
      const dateB = userProgress.achievements[b.id].date || ""
      return dateB.localeCompare(dateA)
    })
    .slice(0, limit)

  if (earnedAchievements.length === 0) {
    return null
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" />
          Son Kazanılan Rozetler
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between">
          {earnedAchievements.map((achievement) => (
            <BadgeIcon
              key={achievement.id}
              name={achievement.name}
              icon={<achievement.icon className="h-6 w-6" />}
              earned={true}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
