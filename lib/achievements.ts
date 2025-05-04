import { Award, Calendar, Clock, FlameIcon as Fire, Gift, Medal, Star, Smile, Zap } from "lucide-react"

export interface Achievement {
  id: string
  name: string
  description: string
  icon: any
  requiredCount: number
  points: number
  category: "brushing" | "streak" | "time" | "special"
}

export const achievements: Achievement[] = [
  {
    id: "first-brush",
    name: "İlk Fırçalama",
    description: "İlk diş fırçalama seansını tamamla",
    icon: Smile,
    requiredCount: 1,
    points: 10,
    category: "brushing",
  },
  {
    id: "brush-master",
    name: "Fırçalama Ustası",
    description: "50 diş fırçalama seansı tamamla",
    icon: Award,
    requiredCount: 50,
    points: 100,
    category: "brushing",
  },
  {
    id: "streak-3",
    name: "3 Gün Seri",
    description: "3 gün üst üste diş fırçala",
    icon: Fire,
    requiredCount: 3,
    points: 30,
    category: "streak",
  },
  {
    id: "streak-7",
    name: "Haftalık Seri",
    description: "7 gün üst üste diş fırçala",
    icon: Fire,
    requiredCount: 7,
    points: 70,
    category: "streak",
  },
  {
    id: "streak-30",
    name: "Aylık Seri",
    description: "30 gün üst üste diş fırçala",
    icon: Fire,
    requiredCount: 30,
    points: 300,
    category: "streak",
  },
  {
    id: "morning-person",
    name: "Sabah İnsanı",
    description: "7 gün üst üste sabah diş fırçala",
    icon: Calendar,
    requiredCount: 7,
    points: 50,
    category: "time",
  },
  {
    id: "night-owl",
    name: "Gece Kuşu",
    description: "7 gün üst üste gece diş fırçala",
    icon: Clock,
    requiredCount: 7,
    points: 50,
    category: "time",
  },
  {
    id: "perfect-time",
    name: "Mükemmel Zamanlama",
    description: "Tam 2 dakika boyunca diş fırçala",
    icon: Clock,
    requiredCount: 1,
    points: 20,
    category: "time",
  },
  {
    id: "cavity-free",
    name: "Çürüksüz",
    description: "Hiç çürük olmadan 10 fırçalama seansı tamamla",
    icon: Medal,
    requiredCount: 10,
    points: 100,
    category: "special",
  },
  {
    id: "improvement",
    name: "İlerleme",
    description: "Diş sağlığı skorunu %20 artır",
    icon: Zap,
    requiredCount: 1,
    points: 50,
    category: "special",
  },
]

export interface Reward {
  id: string
  name: string
  description: string
  icon: any
  requiredPoints: number
  claimed: boolean
}

export const rewards: Reward[] = [
  {
    id: "discount-10",
    name: "%10 İndirim",
    description: "Anlaşmalı diş hekimlerinde %10 indirim",
    icon: Gift,
    requiredPoints: 100,
    claimed: false,
  },
  {
    id: "premium-week",
    name: "1 Hafta Premium",
    description: "1 hafta premium üyelik",
    icon: Star,
    requiredPoints: 200,
    claimed: false,
  },
  {
    id: "toothbrush-discount",
    name: "Elektrikli Diş Fırçası",
    description: "Elektrikli diş fırçasında %25 indirim",
    icon: Gift,
    requiredPoints: 500,
    claimed: false,
  },
]

export interface UserProgress {
  points: number
  level: number
  achievements: {
    [key: string]: {
      earned: boolean
      progress: number
      date?: string
    }
  }
  rewards: {
    [key: string]: {
      claimed: boolean
      date?: string
    }
  }
}

// Mock user progress data
export const mockUserProgress: UserProgress = {
  points: 180,
  level: 3,
  achievements: {
    "first-brush": { earned: true, progress: 100, date: "2023-04-01" },
    "brush-master": { earned: false, progress: 32 },
    "streak-3": { earned: true, progress: 100, date: "2023-04-03" },
    "streak-7": { earned: true, progress: 100, date: "2023-04-07" },
    "streak-30": { earned: false, progress: 23 },
    "morning-person": { earned: false, progress: 71 },
    "night-owl": { earned: true, progress: 100, date: "2023-04-10" },
    "perfect-time": { earned: true, progress: 100, date: "2023-04-02" },
    "cavity-free": { earned: false, progress: 60 },
    improvement: { earned: false, progress: 80 },
  },
  rewards: {
    "discount-10": { claimed: true, date: "2023-04-08" },
    "premium-week": { claimed: false },
    "toothbrush-discount": { claimed: false },
  },
}

export function calculateLevel(points: number): number {
  // Simple level calculation: level = points / 100 + 1
  return Math.floor(points / 100) + 1
}

export function calculateLevelProgress(points: number): number {
  // Calculate progress to next level (0-100)
  const currentLevel = calculateLevel(points)
  const pointsForCurrentLevel = (currentLevel - 1) * 100
  const pointsForNextLevel = currentLevel * 100
  return ((points - pointsForCurrentLevel) / (pointsForNextLevel - pointsForCurrentLevel)) * 100
}
