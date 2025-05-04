"use client"

import { BottomNavigation } from "@/components/bottom-navigation"
import { TeethMapPro } from "@/components/teeth-map-pro"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award } from "lucide-react"
import Link from "next/link"

export default function ResultsPage() {
  // Mock data for points earned
  const pointsEarned = 20

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 pb-24">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900">Analiz Sonuçları</h1>
          <p className="text-muted-foreground">Fırçalama sonrası diş durumunuz</p>
        </div>

        {/* Points earned card */}
        <Card className="border-none shadow-lg mb-6 overflow-hidden animate-slide-up">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kazanılan Puan</p>
                <p className="text-2xl font-bold">+{pointsEarned}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/achievements">Başarılar</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg mb-6 overflow-hidden animate-slide-up delay-100">
          <CardHeader className="pb-2">
            <CardTitle>Çürük İhtimali</CardTitle>
          </CardHeader>
          <CardContent>
            <TeethMapPro />
          </CardContent>
        </Card>

        <div className="space-y-4 animate-slide-up delay-200">
          <Card className="border-none shadow-md">
            <CardContent className="p-4 flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>
              <span className="font-medium">Çürük. Riskli</span>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-4 flex items-center">
              <div className="w-4 h-4 rounded-full bg-amber-400 mr-3"></div>
              <span className="font-medium">Tam fırçalanmamış</span>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-4 flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
              <span className="font-medium">Sağlıklı</span>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 animate-fade-in delay-300">
          <Button asChild className="w-full rounded-xl py-6 shadow-md">
            <Link href="/history" className="flex items-center justify-center gap-2">
              <span>Detaylı İstatistikleri Gör</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      <BottomNavigation active="cavities" />
    </div>
  )
}
