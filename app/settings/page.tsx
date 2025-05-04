"use client"

import { useState, useEffect } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Bell, Lock, HelpCircle, LogOut, Smartphone, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [sounds, setSounds] = useState(true)
  const [vibration, setVibration] = useState(true)
  const [language, setLanguage] = useState("tr")

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDarkModeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex items-center border-b">
        <Button variant="ghost" size="icon" asChild className="rounded-full mr-2">
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Ayarlar</h1>
      </header>

      <div className="flex-1 p-6 pb-24 overflow-y-auto">
        <div className="space-y-6">
          <Card className="border-none shadow-md animate-slide-up">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Bildirimler
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="flex-1">
                    Bildirimleri Etkinleştir
                  </Label>
                  <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sounds" className="flex-1">
                    Bildirim Sesleri
                  </Label>
                  <Switch id="sounds" checked={sounds} onCheckedChange={setSounds} disabled={!notifications} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="vibration" className="flex-1">
                    Titreşim
                  </Label>
                  <Switch id="vibration" checked={vibration} onCheckedChange={setVibration} disabled={!notifications} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md animate-slide-up delay-100">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Uygulama
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="flex-1 flex items-center gap-2">
                    {mounted && theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    Karanlık Mod
                  </Label>
                  <Switch id="dark-mode" checked={mounted && theme === "dark"} onCheckedChange={handleDarkModeToggle} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="language" className="flex-1">
                    Dil
                  </Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Dil Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tr">Türkçe</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md animate-slide-up delay-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Gizlilik ve Güvenlik
              </h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Şifre Değiştir
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Gizlilik Ayarları
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Veri Paylaşımı
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md animate-slide-up delay-300">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Yardım ve Destek
              </h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/about">Hakkımızda</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Sık Sorulan Sorular
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Destek Talebi Oluştur
                </Button>
              </div>
            </CardContent>
          </Card>

          <Button variant="destructive" className="w-full mt-6">
            <LogOut className="h-4 w-4 mr-2" />
            Çıkış Yap
          </Button>
        </div>
      </div>

      <BottomNavigation active="home" />
    </div>
  )
}
