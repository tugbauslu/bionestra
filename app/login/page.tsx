"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft, Sun } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate and authenticate here
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <Card className="border-none shadow-lg animate-fade-in">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">GİRİŞ YAP</h1>
              <Sun className="h-6 w-6 text-amber-400" />
            </div>
            <p className="text-lg font-medium text-primary">İYİ GÜNLER ☀</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-base">
                  Kullanıcı Adı
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 rounded-xl border-gray-300 focus:border-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base">
                  Şifre
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border-gray-300 focus:border-primary"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm font-medium">
                    Beni hatırla
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                  Şifreni mi unuttun?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full h-12 rounded-xl text-base font-medium shadow-md hover:shadow-lg transition-all"
              >
                Giriş Yap
              </Button>
              <div className="text-center pt-2">
                <p className="text-sm text-muted-foreground">
                  Üye değil misin?{" "}
                  <Link href="/register" className="text-primary font-medium hover:underline">
                    Hemen üye ol
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
