import { calculateLevel, calculateLevelProgress } from "@/lib/achievements"
import { Progress } from "@/components/ui/progress"

interface LevelProgressProps {
  points: number
  className?: string
}

export function LevelProgress({ points, className }: LevelProgressProps) {
  const level = calculateLevel(points)
  const progress = calculateLevelProgress(points)
  const pointsToNextLevel = level * 100 - points

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary font-bold rounded-full w-8 h-8 flex items-center justify-center">
            {level}
          </div>
          <span className="font-medium">Seviye {level}</span>
        </div>
        <span className="text-sm text-muted-foreground">{pointsToNextLevel} puan kaldı</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-muted-foreground">{points} puan</span>
        <span className="text-xs text-muted-foreground">{level * 100} puan</span>
      </div>
    </div>
  )
}
