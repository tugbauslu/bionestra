import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ToothbrushIcon } from "@/components/icons/toothbrush-icon"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center p-8">
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <ToothbrushIcon className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">DentaTrack</h1>
          <p className="text-muted-foreground">Diş sağlığınızı takip edin, gülüşünüzü koruyun</p>
        </div>
        <div className="space-y-4 pt-4">
          <Button asChild size="lg" className="w-full rounded-full shadow-md transition-all hover:shadow-lg">
            <Link href="/login">Giriş Yap</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full rounded-full shadow-sm transition-all hover:shadow-md"
          >
            <Link href="/register">Kayıt Ol</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
