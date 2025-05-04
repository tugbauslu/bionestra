"use client"

import type React from "react"

import { useState, useRef } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Camera, Mail, Calendar, Save, X } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"

// Mock user data
const userData = {
  name: "Ahmet Yılmaz",
  email: "ahmet.yilmaz@example.com",
  phone: "+90 555 123 4567",
  birthDate: "1990-05-15",
  gender: "male",
  avatar: "/placeholder.svg?height=200&width=200",
  bio: "Diş sağlığına önem veren bir teknoloji meraklısı.",
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  privacy: {
    showProfile: true,
    showStats: true,
    showAchievements: true,
  },
}

export default function EditProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [formData, setFormData] = useState(userData)
  const [avatarPreview, setAvatarPreview] = useState(userData.avatar)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (checked: boolean, category: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof typeof prev] as Record<string, boolean>),
        [name]: checked,
      },
    }))
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // In a real app, you would save the data to the server here
    console.log("Saving profile data:", formData)
    // Navigate back to profile page
    router.push("/profile")
  }

  const handleCancel = () => {
    router.push("/profile")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex items-center justify-between border-b">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/profile">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Profili Düzenle</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </header>

      <div className="flex-1 p-6 pb-24 overflow-y-auto">
        <div className="flex flex-col items-center mb-6 animate-fade-in">
          <div className="relative mb-4">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarImage src={avatarPreview || "/placeholder.svg"} alt={formData.name} />
              <AvatarFallback>
                {formData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-primary shadow-md"
              onClick={handleAvatarClick}
            >
              <Camera className="h-4 w-4" />
              <span className="sr-only">Fotoğraf değiştir</span>
            </Button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>
          <h2 className="text-xl font-bold">{formData.name}</h2>
          <p className="text-muted-foreground">{formData.email}</p>
        </div>

        <Tabs defaultValue="personal" className="animate-fade-in" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="personal" className="text-base py-3">
              Kişisel Bilgiler
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-base py-3">
              Ayarlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Temel Bilgiler
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ad Soyad</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Kişisel Detaylar
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Doğum Tarihi</Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Cinsiyet</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleSelectChange(value, "gender")}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Cinsiyet seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Erkek</SelectItem>
                      <SelectItem value="female">Kadın</SelectItem>
                      <SelectItem value="other">Diğer</SelectItem>
                      <SelectItem value="prefer-not-to-say">Belirtmek İstemiyorum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Hakkımda</Label>
                  <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} rows={3} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  Bildirim Ayarları
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="flex-1">
                    E-posta Bildirimleri
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={formData.notifications.email}
                    onCheckedChange={(checked) => handleSwitchChange(checked, "notifications", "email")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications" className="flex-1">
                    Uygulama Bildirimleri
                  </Label>
                  <Switch
                    id="push-notifications"
                    checked={formData.notifications.push}
                    onCheckedChange={(checked) => handleSwitchChange(checked, "notifications", "push")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications" className="flex-1">
                    SMS Bildirimleri
                  </Label>
                  <Switch
                    id="sms-notifications"
                    checked={formData.notifications.sms}
                    onCheckedChange={(checked) => handleSwitchChange(checked, "notifications", "sms")}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Gizlilik Ayarları
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-profile" className="flex-1">
                    Profilimi Göster
                  </Label>
                  <Switch
                    id="show-profile"
                    checked={formData.privacy.showProfile}
                    onCheckedChange={(checked) => handleSwitchChange(checked, "privacy", "showProfile")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-stats" className="flex-1">
                    İstatistiklerimi Göster
                  </Label>
                  <Switch
                    id="show-stats"
                    checked={formData.privacy.showStats}
                    onCheckedChange={(checked) => handleSwitchChange(checked, "privacy", "showStats")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-achievements" className="flex-1">
                    Başarılarımı Göster
                  </Label>
                  <Switch
                    id="show-achievements"
                    checked={formData.privacy.showAchievements}
                    onCheckedChange={(checked) => handleSwitchChange(checked, "privacy", "showAchievements")}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-destructive">Tehlikeli Bölge</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <Button
                  variant="outline"
                  className="w-full border-destructive text-destructive hover:bg-destructive/10"
                >
                  Şifremi Değiştir
                </Button>
                <Button variant="destructive" className="w-full">
                  Hesabımı Sil
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-4 mt-8">
          <Button variant="outline" className="flex-1" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" />
            İptal
          </Button>
          <Button className="flex-1" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Kaydet
          </Button>
        </div>
      </div>

      <BottomNavigation active="home" />
    </div>
  )
}
