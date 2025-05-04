"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send a password reset email
    setSubmitted(true)
  }

  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/login">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <Card className="border-none shadow-lg animate-fade-in">
          <CardHeader>
            <h1 className="text-2xl font-bold">Şifremi Unuttum</h1>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    E-posta
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl border-gray-300 focus:border-primary"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Şifre sıfırlama bağlantısı e-posta adresinize gönderilecektir.
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl text-base font-medium shadow-md hover:shadow-lg transition-all"
                >
                  Şifre Sıfırlama Bağlantısı Gönder
                </Button>
              </form>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h2 className="text-xl font-bold mb-2">E-posta Gönderildi</h2>
                  <p className="text-muted-foreground">
                    Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen e-postanızı kontrol edin.
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full h-12 rounded-xl text-base font-medium shadow-md hover:shadow-lg transition-all"
                >
                  <Link href="/login">Giriş sayfasına dön</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
