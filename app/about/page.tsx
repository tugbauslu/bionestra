"use client"

import { BottomNavigation } from "@/components/bottom-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Mail, Globe, Phone, MessageSquare } from "lucide-react"
import Link from "next/link"
import { ToothbrushIcon } from "@/components/icons/toothbrush-icon"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex items-center border-b">
        <Button variant="ghost" size="icon" asChild className="rounded-full mr-2">
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Hakkımızda</h1>
      </header>

      <div className="flex-1 p-6 pb-24 overflow-y-auto">
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <ToothbrushIcon className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-2">DentaTrack</h2>
          <p className="text-muted-foreground">Versiyon 1.0.0</p>
        </div>

        <Card className="border-none shadow-md mb-6 animate-slide-up">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Misyonumuz</h3>
            <p className="text-muted-foreground mb-4">
              DentaTrack, diş sağlığı alışkanlıklarını iyileştirmek ve herkes için daha sağlıklı gülüşler sağlamak
              amacıyla geliştirilmiştir. Yapay zeka destekli teknolojimiz ile diş fırçalama alışkanlıklarınızı takip
              eder ve kişiselleştirilmiş öneriler sunarız.
            </p>
            <p className="text-muted-foreground">
              Amacımız, diş sağlığı bakımını eğlenceli, ölçülebilir ve herkes için erişilebilir hale getirmektir.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md mb-6 animate-slide-up delay-100">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Ekibimiz</h3>
            <p className="text-muted-foreground mb-4">
              DentaTrack, diş hekimleri, yazılım mühendisleri ve tasarımcılardan oluşan tutkulu bir ekip tarafından
              geliştirilmiştir. Ekibimiz, en son teknolojileri kullanarak diş sağlığı alanında yenilikçi çözümler
              sunmaya odaklanmıştır.
            </p>
            <div className="flex justify-center mt-6">
              <Heart className="text-red-500 h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md mb-6 animate-slide-up delay-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">İletişim</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>iletisim@dentatrack.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <span>www.dentatrack.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+90 212 123 45 67</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>@DentaTrack</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground mt-8 animate-fade-in">
          <p>© 2023 DentaTrack. Tüm hakları saklıdır.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/terms" className="hover:text-primary">
              Kullanım Şartları
            </Link>
            <Link href="/privacy" className="hover:text-primary">
              Gizlilik Politikası
            </Link>
          </div>
        </div>
      </div>

      <BottomNavigation active="home" />
    </div>
  )
}
