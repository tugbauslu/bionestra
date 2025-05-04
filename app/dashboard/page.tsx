"use client"

import { Button } from "@/components/ui/button"
import { MinimalBarChart } from "@/components/minimal-bar-chart"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToothbrushIcon } from "@/components/icons/toothbrush-icon"
import { Badge } from "@/components/ui/badge"
import { Settings, Award, Clock, TrendingUp, AlertCircle, Calendar, Trophy } from "lucide-react"
import { LevelProgress } from "@/components/level-progress"
import { RecentAchievements } from "@/components/recent-achievements"
import { achievements, mockUserProgress } from "@/lib/achievements"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const { theme } = useTheme()

  const handleStartBrushing = () => {
    router.push("/brushing")
  }

  const currentStreak = 5 // Mock data

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex items-center justify-between border-b">
        <HamburgerMenu />

        <h1 className="text-xl font-bold text-center flex-1">DentaTrack</h1>

        <Button variant="ghost" size="icon" className="rounded-full" asChild>
          <Link href="/settings">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Ayarlar</span>
          </Link>
        </Button>
      </header>

      <div className="flex-1 p-6 pb-24 overflow-y-auto">
        <div className="mb-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Merhaba, Kullanıcı</h2>
              <p className="text-muted-foreground">Haftalık Özet</p>
            </div>
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
            >
              <Award className="h-4 w-4" />
              <span>{currentStreak} Gün Seri</span>
            </Badge>
          </div>
        </div>

        {/* Level Progress */}
        <LevelProgress points={mockUserProgress.points} className="mb-6 animate-slide-up" />

        <Card className="border-none shadow-md mb-6 overflow-hidden animate-slide-up">
          <CardContent className="p-4">
            <div className="h-48">
              <MinimalBarChart />
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <div className="mb-4">
          <RecentAchievements achievements={achievements} userProgress={mockUserProgress} />
        </div>

        {/* View All Achievements Button */}
        <Button variant="outline" className="w-full mb-6 flex items-center justify-center gap-2" asChild>
          <Link href="/achievements">
            <Trophy className="h-4 w-4" />
            <span>Tüm Başarılar ve Ödüller</span>
          </Link>
        </Button>

        {/* Next Brushing Time Card */}
        <Card className="border-none shadow-md mb-4 animate-slide-up delay-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Sonraki Fırçalama
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">22:00</p>
                <p className="text-sm text-muted-foreground">Bu akşam</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">
                Hatırlatıcı Kur
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress Card */}
        <Card className="border-none shadow-md mb-4 animate-slide-up delay-150">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              Haftalık İlerleme
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">%15</p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">↑ Geçen haftaya göre</p>
                </div>
                <p className="text-sm text-muted-foreground">9/14 seans tamamlandı</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dental Health Tip Card */}
        <Card className="border-none shadow-md mb-8 animate-slide-up delay-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              Diş Sağlığı İpucu
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Dişlerinizi fırçalarken diş etlerinize nazikçe masaj yapmak, kan dolaşımını artırır ve diş eti sağlığını
              iyileştirir. Diş ipi kullanmayı da unutmayın!
            </p>
            <div className="mt-2 text-xs text-right text-muted-foreground">Günlük ipucu #42</div>
          </CardContent>
        </Card>

        <div className="fixed bottom-24 left-0 right-0 px-6 z-10 animate-slide-up flex justify-center">
          <Button
            onClick={handleStartBrushing}
            className="px-6 py-2 text-base rounded-lg shadow-md flex items-center justify-center gap-2 bg-primary hover:opacity-90 transition-all"
          >
            <ToothbrushIcon className="w-4 h-4" />
            FIRÇALAMAYA BAŞLA
          </Button>
        </div>
      </div>
      <BottomNavigation active="home" />
    </div>
  )
}
