"use client"

import { useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Bluetooth,
  Battery,
  Calendar,
  Settings,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Vibrate,
  Clock,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { ToothbrushIcon } from "@/components/icons/toothbrush-icon"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock device data
const deviceData = {
  name: "DentaTrack Pro X1",
  model: "DTX1-2023",
  serialNumber: "DT78901234",
  firmwareVersion: "v2.1.4",
  batteryLevel: 68,
  estimatedUsageTime: "6 gün",
  lastCharged: "2 gün önce",
  lastConnected: "Bugün, 08:45",
  warranty: {
    startDate: "15 Ocak 2023",
    endDate: "15 Ocak 2025",
    daysLeft: 450,
    isActive: true,
  },
  settings: {
    vibrationIntensity: "medium",
    brushingMode: "standard",
    timerDuration: 120,
    smartFeatures: true,
    autoOff: true,
  },
  updateAvailable: false,
}

export default function MyDevicePage() {
  const [isConnected, setIsConnected] = useState(true)
  const [activeTab, setActiveTab] = useState("info")
  const [deviceSettings, setDeviceSettings] = useState(deviceData.settings)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateProgress, setUpdateProgress] = useState(0)

  // Simulate Bluetooth connection toggle
  const handleConnectionToggle = () => {
    setIsConnected(!isConnected)
  }

  // Handle settings change
  const handleSettingChange = (setting: string, value: string | boolean | number) => {
    setDeviceSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  // Simulate firmware update
  const handleFirmwareUpdate = () => {
    setIsUpdating(true)
    setUpdateProgress(0)

    const interval = setInterval(() => {
      setUpdateProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsUpdating(false)
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  // Calculate warranty percentage
  const calculateWarrantyPercentage = () => {
    // Assuming 2 years (730 days) warranty
    const totalWarrantyDays = 730
    const daysUsed = totalWarrantyDays - deviceData.warranty.daysLeft
    return (daysUsed / totalWarrantyDays) * 100
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex items-center border-b">
        <Button variant="ghost" size="icon" asChild className="rounded-full mr-2">
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Cihazım</h1>
      </header>

      <div className="flex-1 p-6 pb-24 overflow-y-auto">
        <div className="flex flex-col items-center mb-6 animate-fade-in">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <ToothbrushIcon className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold">{deviceData.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant="outline"
              className={`flex items-center gap-1 ${
                isConnected
                  ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                  : "bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
              }`}
            >
              <Bluetooth className="h-3 w-3" />
              <span>{isConnected ? "Bağlı" : "Bağlı Değil"}</span>
            </Badge>
            <Badge
              variant="outline"
              className={`flex items-center gap-1 ${
                deviceData.batteryLevel > 20
                  ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                  : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
              }`}
            >
              <Battery className="h-3 w-3" />
              <span>%{deviceData.batteryLevel}</span>
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Button
              variant={isConnected ? "outline" : "default"}
              size="sm"
              className="rounded-full"
              onClick={handleConnectionToggle}
            >
              {isConnected ? "Bağlantıyı Kes" : "Bağlan"}
            </Button>
            <Button variant="outline" size="sm" className="rounded-full" asChild>
              <Link href="/my-device/help">Yardım</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="info" className="animate-fade-in" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="info" className="text-base py-3">
              Bilgi
            </TabsTrigger>
            <TabsTrigger value="warranty" className="text-base py-3">
              Garanti
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-base py-3">
              Ayarlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6">
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Battery className="h-4 w-4 text-primary" />
                  Pil Durumu
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Pil Seviyesi</span>
                      <span className="font-medium">{deviceData.batteryLevel}%</span>
                    </div>
                    <Progress
                      value={deviceData.batteryLevel}
                      className={`h-2 ${
                        deviceData.batteryLevel > 60
                          ? "bg-green-100 dark:bg-green-900/30"
                          : deviceData.batteryLevel > 20
                            ? "bg-amber-100 dark:bg-amber-900/30"
                            : "bg-red-100 dark:bg-red-900/30"
                      }`}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Tahmini Kullanım Süresi</span>
                    <span className="font-medium">{deviceData.estimatedUsageTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Son Şarj</span>
                    <span className="font-medium">{deviceData.lastCharged}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Bluetooth className="h-4 w-4 text-primary" />
                  Bağlantı Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Durum</span>
                    <Badge
                      variant="outline"
                      className={`${
                        isConnected
                          ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                          : "bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                      }`}
                    >
                      {isConnected ? "Bağlı" : "Bağlı Değil"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Son Bağlantı</span>
                    <span className="font-medium">{deviceData.lastConnected}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Bluetooth Adresi</span>
                    <span className="font-medium text-xs">00:1A:7D:DA:71:13</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Settings className="h-4 w-4 text-primary" />
                  Cihaz Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Model</span>
                    <span className="font-medium">{deviceData.model}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Seri Numarası</span>
                    <span className="font-medium">{deviceData.serialNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Yazılım Sürümü</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{deviceData.firmwareVersion}</span>
                      {deviceData.updateAvailable && (
                        <Badge className="bg-blue-500 text-white">Güncelleme Mevcut</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {deviceData.updateAvailable && (
              <Button className="w-full" onClick={handleFirmwareUpdate} disabled={isUpdating}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Yazılımı Güncelle
              </Button>
            )}

            {isUpdating && (
              <Card className="border-none shadow-md overflow-hidden animate-fade-in">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Güncelleniyor...</span>
                      <span className="text-sm">{updateProgress}%</span>
                    </div>
                    <Progress value={updateProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Lütfen güncelleme tamamlanana kadar cihazınızı kapatmayın.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="warranty" className="space-y-6">
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Garanti Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Garanti Durumu</span>
                    {deviceData.warranty.isActive ? (
                      <Badge className="bg-green-500 text-white">Aktif</Badge>
                    ) : (
                      <Badge variant="destructive">Süresi Dolmuş</Badge>
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Kalan Süre</span>
                      <span className="font-medium">{deviceData.warranty.daysLeft} gün</span>
                    </div>
                    <Progress value={calculateWarrantyPercentage()} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Başlangıç Tarihi</span>
                    <span className="font-medium">{deviceData.warranty.startDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Bitiş Tarihi</span>
                    <span className="font-medium">{deviceData.warranty.endDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Garanti Kapsamı
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Üretim hataları</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Malzeme kusurları</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Elektronik arızalar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Fiziksel hasarlar (düşürme, kırılma vb.)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Su hasarları</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Yetkisiz tamir sonucu oluşan hasarlar</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button variant="outline" className="w-full" asChild>
              <Link href="/warranty-claim">Garanti Talebi Oluştur</Link>
            </Button>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Vibrate className="h-4 w-4 text-primary" />
                  Fırçalama Ayarları
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="vibration-intensity">Titreşim Şiddeti</Label>
                    <Select
                      value={deviceSettings.vibrationIntensity}
                      onValueChange={(value) => handleSettingChange("vibrationIntensity", value)}
                      disabled={!isConnected}
                    >
                      <SelectTrigger id="vibration-intensity">
                        <SelectValue placeholder="Titreşim şiddeti seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Düşük</SelectItem>
                        <SelectItem value="medium">Orta</SelectItem>
                        <SelectItem value="high">Yüksek</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brushing-mode">Fırçalama Modu</Label>
                    <Select
                      value={deviceSettings.brushingMode}
                      onValueChange={(value) => handleSettingChange("brushingMode", value)}
                      disabled={!isConnected}
                    >
                      <SelectTrigger id="brushing-mode">
                        <SelectValue placeholder="Fırçalama modu seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standart</SelectItem>
                        <SelectItem value="sensitive">Hassas</SelectItem>
                        <SelectItem value="whitening">Beyazlatma</SelectItem>
                        <SelectItem value="gum-care">Diş Eti Bakımı</SelectItem>
                        <SelectItem value="deep-clean">Derin Temizlik</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timer-duration">Zamanlayıcı Süresi</Label>
                    <Select
                      value={deviceSettings.timerDuration.toString()}
                      onValueChange={(value) => handleSettingChange("timerDuration", Number.parseInt(value))}
                      disabled={!isConnected}
                    >
                      <SelectTrigger id="timer-duration">
                        <SelectValue placeholder="Süre seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="60">1 dakika</SelectItem>
                        <SelectItem value="120">2 dakika</SelectItem>
                        <SelectItem value="180">3 dakika</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Akıllı Özellikler
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smart-features" className="flex-1">
                      Akıllı Özellikler
                      <p className="text-xs text-muted-foreground mt-1">
                        Basınç sensörü, bölge algılama ve kişiselleştirilmiş öneriler
                      </p>
                    </Label>
                    <Switch
                      id="smart-features"
                      checked={deviceSettings.smartFeatures}
                      onCheckedChange={(checked) => handleSettingChange("smartFeatures", checked)}
                      disabled={!isConnected}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-off" className="flex-1">
                      Otomatik Kapanma
                      <p className="text-xs text-muted-foreground mt-1">
                        Fırçalama tamamlandığında cihazı otomatik olarak kapat
                      </p>
                    </Label>
                    <Switch
                      id="auto-off"
                      checked={deviceSettings.autoOff}
                      onCheckedChange={(checked) => handleSettingChange("autoOff", checked)}
                      disabled={!isConnected}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Hatırlatıcılar
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="brush-reminder" className="flex-1">
                      Fırçalama Hatırlatıcısı
                    </Label>
                    <Switch id="brush-reminder" defaultChecked disabled={!isConnected} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="replace-head-reminder" className="flex-1">
                      Fırça Başlığı Değiştirme Hatırlatıcısı
                      <p className="text-xs text-muted-foreground mt-1">Her 3 ayda bir hatırlat</p>
                    </Label>
                    <Switch id="replace-head-reminder" defaultChecked disabled={!isConnected} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                // Reset to default settings
                setDeviceSettings(deviceData.settings)
              }}
              disabled={!isConnected}
            >
              Varsayılan Ayarlara Sıfırla
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation active="home" />
    </div>
  )
}
