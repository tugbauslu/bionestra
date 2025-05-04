"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, Award, Users, Clock, HelpCircle, Settings, Newspaper, Bluetooth } from "lucide-react"

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleMenu}>
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">Menü</span>
      </Button>

      {isOpen && (
        <div className="absolute top-12 left-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 animate-fade-in">
          <div className="py-2 px-1">
            <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setIsOpen(false)}>
              <Link href="/dashboard">
                <Menu className="mr-2 h-4 w-4" />
                <span>Ana Sayfa</span>
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setIsOpen(false)}>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setIsOpen(false)}>
              <Link href="/achievements">
                <Award className="mr-2 h-4 w-4" />
                <span>Başarılar ve Ödüller</span>
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setIsOpen(false)}>
              <Link href="/leaderboard">
                <Users className="mr-2 h-4 w-4" />
                <span>Liderlik Tablosu</span>
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setIsOpen(false)}>
              <Link href="/history">
                <Clock className="mr-2 h-4 w-4" />
                <span>İstatistikler</span>
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setIsOpen(false)}>
              <Link href="/news">
                <Newspaper className="mr-2 h-4 w-4" />
                <span>Haberler</span>
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setIsOpen(false)}>
              <Link href="/my-device">
                <Bluetooth className="mr-2 h-4 w-4" />
                <span>Cihazım</span>
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setIsOpen(false)}>
              <Link href="/about">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Hakkımızda</span>
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setIsOpen(false)}>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Ayarlar</span>
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
