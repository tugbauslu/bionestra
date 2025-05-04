"use client"

import { BottomNavigation } from "@/components/bottom-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Newspaper, Calendar } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Örnek haberler
const newsItems = [
  {
    id: 1,
    title: "Yeni Diş Fırçalama Teknikleri",
    summary: "Diş sağlığınızı iyileştirmek için uzmanlar tarafından önerilen yeni fırçalama teknikleri.",
    date: "12 Mayıs 2023",
    category: "Sağlık",
    isNew: true,
  },
  {
    id: 2,
    title: "Çocuklarda Diş Bakımı",
    summary: "Çocuklarda doğru diş bakımı alışkanlıkları nasıl kazandırılır? Uzman diş hekimlerinden öneriler.",
    date: "5 Mayıs 2023",
    category: "Çocuk",
    isNew: true,
  },
  {
    id: 3,
    title: "Diş İpi Kullanımının Önemi",
    summary: "Düzenli diş ipi kullanımı diş eti hastalıklarını önlemede neden önemli? Araştırma sonuçları.",
    date: "28 Nisan 2023",
    category: "Araştırma",
    isNew: false,
  },
  {
    id: 4,
    title: "Elektrikli Diş Fırçası vs Manuel Fırça",
    summary: "Hangisi daha etkili? Elektrikli ve manuel diş fırçalarının karşılaştırmalı analizi.",
    date: "20 Nisan 2023",
    category: "Teknoloji",
    isNew: false,
  },
  {
    id: 5,
    title: "Diş Beyazlatma Yöntemleri",
    summary: "Evde ve profesyonel ortamda uygulanan diş beyazlatma yöntemleri hakkında bilmeniz gerekenler.",
    date: "15 Nisan 2023",
    category: "Estetik",
    isNew: false,
  },
]

export default function NewsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex items-center border-b">
        <Button variant="ghost" size="icon" asChild className="rounded-full mr-2">
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Haberler</h1>
      </header>

      <div className="flex-1 p-6 pb-24 overflow-y-auto">
        <div className="mb-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Son Gelişmeler</h2>
          <p className="text-muted-foreground">Diş sağlığı dünyasından en son haberler</p>
        </div>

        <div className="space-y-4 animate-slide-up">
          {newsItems.map((item) => (
            <Card key={item.id} className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  {item.isNew && <Badge className="bg-green-500 text-white">Yeni</Badge>}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {item.date}
                  <Badge variant="outline" className="ml-2 text-xs">
                    {item.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300">{item.summary}</p>
                <Button variant="link" className="p-0 h-auto mt-2 text-primary" asChild>
                  <Link href={`/news/${item.id}`}>Devamını Oku</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" className="w-full">
            <Newspaper className="h-4 w-4 mr-2" />
            Tüm Haberleri Gör
          </Button>
        </div>
      </div>

      <BottomNavigation active="home" />
    </div>
  )
}
