"use client"

import { useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Trophy, Medal, Users } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for leaderboard
const weeklyLeaders = [
  { id: 1, name: "Ahmet Y.", score: 450, avatar: "/placeholder.svg?height=40&width=40", rank: 1 },
  { id: 2, name: "Mehmet K.", score: 420, avatar: "/placeholder.svg?height=40&width=40", rank: 2 },
  { id: 3, name: "Ayşe S.", score: 380, avatar: "/placeholder.svg?height=40&width=40", rank: 3 },
  { id: 4, name: "Fatma D.", score: 350, avatar: "/placeholder.svg?height=40&width=40", rank: 4 },
  { id: 5, name: "Ali R.", score: 320, avatar: "/placeholder.svg?height=40&width=40", rank: 5 },
  { id: 6, name: "Zeynep T.", score: 300, avatar: "/placeholder.svg?height=40&width=40", rank: 6 },
  { id: 7, name: "Mustafa B.", score: 280, avatar: "/placeholder.svg?height=40&width=40", rank: 7 },
  { id: 8, name: "Selin K.", score: 260, avatar: "/placeholder.svg?height=40&width=40", rank: 8 },
  { id: 9, name: "Emre A.", score: 240, avatar: "/placeholder.svg?height=40&width=40", rank: 9 },
  { id: 10, name: "Deniz Y.", score: 220, avatar: "/placeholder.svg?height=40&width=40", rank: 10 },
]

const monthlyLeaders = [
  { id: 3, name: "Ayşe S.", score: 1850, avatar: "/placeholder.svg?height=40&width=40", rank: 1 },
  { id: 1, name: "Ahmet Y.", score: 1720, avatar: "/placeholder.svg?height=40&width=40", rank: 2 },
  { id: 5, name: "Ali R.", score: 1680, avatar: "/placeholder.svg?height=40&width=40", rank: 3 },
  { id: 2, name: "Mehmet K.", score: 1550, avatar: "/placeholder.svg?height=40&width=40", rank: 4 },
  { id: 8, name: "Selin K.", score: 1490, avatar: "/placeholder.svg?height=40&width=40", rank: 5 },
  { id: 4, name: "Fatma D.", score: 1350, avatar: "/placeholder.svg?height=40&width=40", rank: 6 },
  { id: 7, name: "Mustafa B.", score: 1280, avatar: "/placeholder.svg?height=40&width=40", rank: 7 },
  { id: 6, name: "Zeynep T.", score: 1200, avatar: "/placeholder.svg?height=40&width=40", rank: 8 },
  { id: 10, name: "Deniz Y.", score: 1120, avatar: "/placeholder.svg?height=40&width=40", rank: 9 },
  { id: 9, name: "Emre A.", score: 1040, avatar: "/placeholder.svg?height=40&width=40", rank: 10 },
]

// Current user's rank
const currentUserRank = { weekly: 4, monthly: 6 }

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("weekly")

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-amber-500" />
    if (rank === 2) return <Medal className="h-5 w-5 text-slate-400" />
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-700" />
    return <span className="text-sm font-bold text-muted-foreground">{rank}</span>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex items-center border-b">
        <Button variant="ghost" size="icon" asChild className="rounded-full mr-2">
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Liderlik Tablosu</h1>
      </header>

      <div className="flex-1 p-6 pb-24 overflow-y-auto">
        <div className="mb-6 animate-fade-in">
          <Card className="border-none shadow-md overflow-hidden dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Kullanıcı" />
                    <AvatarFallback>KA</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Senin Sıralaman</p>
                    <p className="text-2xl font-bold">
                      {activeTab === "weekly" ? currentUserRank.weekly : currentUserRank.monthly}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Puanın</p>
                  <p className="text-xl font-bold">
                    {activeTab === "weekly"
                      ? weeklyLeaders.find((user) => user.rank === currentUserRank.weekly)?.score
                      : monthlyLeaders.find((user) => user.rank === currentUserRank.monthly)?.score}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="weekly" className="animate-fade-in" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="weekly" className="text-base py-3">
              Haftalık
            </TabsTrigger>
            <TabsTrigger value="monthly" className="text-base py-3">
              Aylık
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4">
            <Card className="border-none shadow-md overflow-hidden dark:bg-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  Haftalık En İyiler
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y dark:divide-gray-700">
                  {weeklyLeaders.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center justify-between p-4 ${
                        user.rank === currentUserRank.weekly ? "bg-primary/5 dark:bg-primary/10" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">{getRankIcon(user.rank)}</div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                        {user.rank === currentUserRank.weekly && (
                          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
                            Sen
                          </Badge>
                        )}
                      </div>
                      <span className="font-bold">{user.score}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <Card className="border-none shadow-md overflow-hidden dark:bg-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  Aylık En İyiler
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y dark:divide-gray-700">
                  {monthlyLeaders.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center justify-between p-4 ${
                        user.rank === currentUserRank.monthly ? "bg-primary/5 dark:bg-primary/10" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">{getRankIcon(user.rank)}</div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                        {user.rank === currentUserRank.monthly && (
                          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
                            Sen
                          </Badge>
                        )}
                      </div>
                      <span className="font-bold">{user.score}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/friends">
              <Users className="h-4 w-4 mr-2" />
              Arkadaşlarını Davet Et
            </Link>
          </Button>
        </div>
      </div>

      <BottomNavigation active="home" />
    </div>
  )
}
