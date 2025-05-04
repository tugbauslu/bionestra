"use client"

import type React from "react"

import { useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Edit, Award, Calendar, Clock, Shield } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockUserProgress } from "@/lib/achievements"

// Mock user data
const userData = {
  name: "Ahmet Yılmaz",
  email: "ahmet.yilmaz@example.com",
  joinDate: "Nisan 2023",
  avatar: "/placeholder.svg?height=100&width=100",
  stats: {
    streakDays: 9,
    totalBrushings: 68,
    perfectDays: 28,
    totalMinutesBrushing: 136,
    cavitiesAvoided: 3,
  },
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex items-center border-b">
        <Button variant="ghost" size="icon" asChild className="rounded-full mr-2">
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Profil</h1>
      </header>

      <div className="flex-1 p-6 pb-24 overflow-y-auto">
        <div className="flex flex-col items-center mb-6 animate-fade-in">
          <Avatar className="h-24 w-24 border-4 border-primary/20 mb-4">
            <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
            <AvatarFallback>
              {userData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold">{userData.name}</h2>
          <p className="text-muted-foreground">{userData.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Seviye {mockUserProgress.level}
            </Badge>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              {userData.stats.streakDays} Gün Seri
            </Badge>
          </div>
          <Button variant="outline" size="sm" className="mt-4 rounded-full" asChild>
            <Link href="/profile/edit">
              <Edit className="h-4 w-4 mr-2" />
              Profili Düzenle
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="profile" className="animate-fade-in" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="profile" className="text-base py-3">
              Profil
            </TabsTrigger>
            <TabsTrigger value="stats" className="text-base py-3">
              İstatistikler
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Kişisel Bilgiler
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Ad Soyad</p>
                    <p className="font-medium">{userData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">E-posta</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Katılım Tarihi</p>
                    <p className="font-medium">{userData.joinDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  Seviye İlerlemesi
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Seviye {mockUserProgress.level}</span>
                    <span className="text-sm text-muted-foreground">
                      {mockUserProgress.points}/{mockUserProgress.level * 100} XP
                    </span>
                  </div>
                  <Progress value={((mockUserProgress.points % 100) / 100) * 100} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Bir sonraki seviyeye ulaşmak için {mockUserProgress.level * 100 - mockUserProgress.points} puan daha
                  kazanman gerekiyor.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  Fırçalama İstatistikleri
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <StatItem
                    icon={<Calendar className="h-5 w-5 text-primary" />}
                    label="Toplam Fırçalama"
                    value={userData.stats.totalBrushings}
                  />
                  <StatItem
                    icon={<Clock className="h-5 w-5 text-primary" />}
                    label="Toplam Süre (dk)"
                    value={userData.stats.totalMinutesBrushing}
                  />
                  <StatItem
                    icon={<Calendar className="h-5 w-5 text-green-600" />}
                    label="Mükemmel Günler"
                    value={userData.stats.perfectDays}
                  />
                  <StatItem
                    icon={<Shield className="h-5 w-5 text-green-600" />}
                    label="Önlenen Çürükler"
                    value={userData.stats.cavitiesAvoided}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  Başarılar
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Toplam Başarılar</p>
                    <p className="text-2xl font-bold">
                      {Object.values(mockUserProgress.achievements).filter((a) => a.earned).length}/
                      {Object.keys(mockUserProgress.achievements).length}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/achievements">Tümünü Gör</Link>
                  </Button>
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

interface StatItemProps {
  icon: React.ReactNode
  label: string
  value: number | string
}

function StatItem({ icon, label, value }: StatItemProps) {
  return (
    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
      <div className="mb-2">{icon}</div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )
}
