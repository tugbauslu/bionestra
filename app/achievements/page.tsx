"use client"

import { useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BadgeIcon } from "@/components/badge-icon"
import { LevelProgress } from "@/components/level-progress"
import { achievements, mockUserProgress, rewards } from "@/lib/achievements"
import { Award, Gift, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState("achievements")

  // Group achievements by category
  const achievementsByCategory = achievements.reduce(
    (acc, achievement) => {
      if (!acc[achievement.category]) {
        acc[achievement.category] = []
      }
      acc[achievement.category].push(achievement)
      return acc
    },
    {} as Record<string, typeof achievements>,
  )

  const categoryNames = {
    brushing: "Fırçalama",
    streak: "Seriler",
    time: "Zaman",
    special: "Özel",
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex items-center border-b">
        <Button variant="ghost" size="icon" asChild className="rounded-full mr-2">
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Başarılar ve Ödüller</h1>
      </header>

      <div className="flex-1 p-6 pb-24 overflow-y-auto">
        <LevelProgress points={mockUserProgress.points} className="mb-6 animate-fade-in" />

        <Tabs defaultValue="achievements" className="animate-fade-in" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="achievements" className="text-base py-3">
              Rozetler
            </TabsTrigger>
            <TabsTrigger value="rewards" className="text-base py-3">
              Ödüller
            </TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6">
            {Object.entries(achievementsByCategory).map(([category, categoryAchievements]) => (
              <Card key={category} className="border-none shadow-md overflow-hidden animate-slide-up">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    {categoryNames[category as keyof typeof categoryNames]}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {categoryAchievements.map((achievement) => {
                      const achievementProgress = mockUserProgress.achievements[achievement.id] || {
                        earned: false,
                        progress: 0,
                      }
                      return (
                        <BadgeIcon
                          key={achievement.id}
                          name={achievement.name}
                          icon={<achievement.icon className="h-6 w-6" />}
                          earned={achievementProgress.earned}
                          progress={achievementProgress.progress}
                        />
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card className="border-none shadow-md overflow-hidden animate-slide-up">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Gift className="h-4 w-4 text-primary" />
                  Mevcut Ödüller
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rewards.map((reward) => {
                    const rewardStatus = mockUserProgress.rewards[reward.id] || { claimed: false }
                    const canClaim = mockUserProgress.points >= reward.requiredPoints && !rewardStatus.claimed

                    return (
                      <div key={reward.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${rewardStatus.claimed ? "bg-green-100" : "bg-primary/10"}`}
                          >
                            <reward.icon
                              className={`h-5 w-5 ${rewardStatus.claimed ? "text-green-600" : "text-primary"}`}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{reward.name}</h3>
                            <p className="text-xs text-muted-foreground">{reward.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-muted-foreground mb-1">{reward.requiredPoints} puan</span>
                          <Button
                            size="sm"
                            variant={canClaim ? "default" : "outline"}
                            disabled={!canClaim && !rewardStatus.claimed}
                            className={rewardStatus.claimed ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}
                          >
                            {rewardStatus.claimed ? "Alındı" : canClaim ? "Talep Et" : "Kilidi Aç"}
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation active="home" />
    </div>
  )
}
