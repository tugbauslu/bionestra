"use client"

import { BottomNavigation } from "@/components/bottom-navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function HistoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 pb-24">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900">İstatistikler</h1>
          <p className="text-muted-foreground">Diş sağlığı performansınız</p>
        </div>

        <Card className="border-none shadow-lg mb-8 animate-slide-up">
          <CardHeader className="pb-2">
            <CardTitle>Diş Sağlığı Skoru</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-4">
              <div className="absolute inset-0 rounded-full border-[16px] border-gray-100"></div>
              <div
                className="absolute inset-0 rounded-full border-[16px] border-transparent"
                style={{
                  borderTopColor: "#0ea5e9",
                  borderRightColor: "#0ea5e9",
                  borderBottomColor: "#0ea5e9",
                  transform: "rotate(54deg)",
                  clipPath: "inset(0 0 0 50%)",
                }}
              ></div>
              <div
                className="absolute inset-0 rounded-full border-[16px] border-transparent"
                style={{
                  borderTopColor: "#0ea5e9",
                  borderLeftColor: "#0ea5e9",
                  transform: "rotate(-54deg)",
                  clipPath: "inset(0 50% 0 0)",
                }}
              ></div>
              <div className="absolute inset-4 rounded-full bg-white shadow-inner flex items-center justify-center">
                <span className="text-5xl font-bold text-gray-900">85</span>
              </div>
            </div>
            <p className="text-center text-muted-foreground">Çok iyi! Diş sağlığınız ortalama üzerinde.</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="day" className="animate-slide-up delay-100">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="day" className="text-base py-3">
              Gün
            </TabsTrigger>
            <TabsTrigger value="week" className="text-base py-3">
              Hafta
            </TabsTrigger>
          </TabsList>
          <TabsContent value="day" className="space-y-6">
            <StatCard title="Toplam fırçalama" value="9" maxValue="10" percentage={90} />
            <StatCard title="Ortalama Süre (dk)" value="1:58" maxValue="2:00" percentage={98} />
            <StatCard title="Tespit Edilen Çürük" value="2" maxValue="32" percentage={6} inverted />
            <StatCard title="Fırçalanmayan Diş" value="8" maxValue="32" percentage={25} inverted />
          </TabsContent>
          <TabsContent value="week" className="space-y-6">
            <StatCard title="Toplam fırçalama" value="32" maxValue="35" percentage={91} />
            <StatCard title="Ortalama Süre (dk)" value="2:05" maxValue="2:00" percentage={104} />
            <StatCard title="Tespit Edilen Çürük" value="5" maxValue="32" percentage={16} inverted />
            <StatCard title="Fırçalanmayan Diş" value="12" maxValue="32" percentage={38} inverted />
          </TabsContent>
        </Tabs>
      </div>
      <BottomNavigation active="history" />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  maxValue: string
  percentage: number
  inverted?: boolean
}

function StatCard({ title, value, maxValue, percentage, inverted = false }: StatCardProps) {
  const getProgressColor = () => {
    if (inverted) {
      if (percentage < 20) return "bg-green-500"
      if (percentage < 50) return "bg-amber-400"
      return "bg-red-500"
    } else {
      if (percentage > 80) return "bg-green-500"
      if (percentage > 50) return "bg-amber-400"
      return "bg-red-500"
    }
  }

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">{title}</span>
          <div className="text-right">
            <span className="font-bold">{value}</span>
            <span className="text-muted-foreground text-sm ml-1">/ {maxValue}</span>
          </div>
        </div>
        <Progress value={percentage} className={`h-2 ${getProgressColor()}`} />
      </CardContent>
    </Card>
  )
}
