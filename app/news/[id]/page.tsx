"use client"

import { BottomNavigation } from "@/components/bottom-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Share2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useParams } from "next/navigation"

// Örnek haber detayları
const newsDetails = [
  {
    id: "1",
    title: "Yeni Diş Fırçalama Teknikleri",
    date: "12 Mayıs 2023",
    category: "Sağlık",
    image: "/placeholder.svg?height=300&width=600",
    content: `
      <p>Diş sağlığınızı iyileştirmek için uzmanlar tarafından önerilen yeni fırçalama teknikleri son araştırmalarla destekleniyor.</p>
      
      <h3>Bass Tekniği</h3>
      <p>Bass tekniği, diş eti çizgisine ve diş eti ceplerine odaklanan etkili bir fırçalama yöntemidir. Diş fırçasını 45 derecelik bir açıyla diş eti çizgisine yerleştirin ve nazikçe ileri geri hareketlerle fırçalayın.</p>
      
      <h3>Modifiye Bass Tekniği</h3>
      <p>Bu teknik, Bass tekniğinin bir varyasyonudur ve diş yüzeylerinin daha iyi temizlenmesini sağlar. Diş eti çizgisinde fırçaladıktan sonra, fırçayı diş yüzeyinde yukarı doğru döndürerek hareket ettirin.</p>
      
      <h3>Dikey Fırçalama</h3>
      <p>Diş fırçasını diş yüzeyine dik olarak yerleştirin ve yukarıdan aşağıya doğru süpürme hareketleriyle fırçalayın. Bu teknik, özellikle ön dişlerin iç yüzeylerini temizlemek için etkilidir.</p>
      
      <h3>Dairesel Fırçalama</h3>
      <p>Diş fırçasını diş eti çizgisine 45 derecelik bir açıyla yerleştirin ve küçük dairesel hareketlerle fırçalayın. Bu teknik, plak birikimini etkili bir şekilde temizler.</p>
      
      <p>Hangi tekniği kullanırsanız kullanın, günde en az iki kez, her seferinde en az iki dakika fırçalamayı unutmayın. Ayrıca, diş ipi kullanımı ve düzenli diş hekimi kontrolleri de diş sağlığınız için önemlidir.</p>
    `,
    author: "Dr. Ayşe Yılmaz",
    authorTitle: "Diş Hekimi",
  },
  {
    id: "2",
    title: "Çocuklarda Diş Bakımı",
    date: "5 Mayıs 2023",
    category: "Çocuk",
    image: "/placeholder.svg?height=300&width=600",
    content: `
      <p>Çocuklarda doğru diş bakımı alışkanlıkları nasıl kazandırılır? Uzman diş hekimlerinden öneriler.</p>
      
      <h3>Erken Başlayın</h3>
      <p>Çocuğunuzun ilk dişi çıkar çıkmaz diş bakımına başlayın. Yumuşak bir bez veya parmak fırçası ile nazikçe dişleri temizleyin.</p>
      
      <h3>Oyun Haline Getirin</h3>
      <p>Diş fırçalamayı eğlenceli bir aktivite haline getirin. Çocuğunuzun sevdiği bir şarkı eşliğinde fırçalama yapabilir veya favori oyuncağının da dişlerini fırçalayabilirsiniz.</p>
      
      <h3>Doğru Araçları Kullanın</h3>
      <p>Çocuğunuzun yaşına uygun, yumuşak kıllı bir diş fırçası ve çocuklar için özel olarak formüle edilmiş diş macunu kullanın.</p>
      
      <h3>Rutini Koruyun</h3>
      <p>Her gün aynı saatlerde diş fırçalama rutini oluşturun. Sabah ve akşam yatmadan önce fırçalamayı alışkanlık haline getirin.</p>
      
      <h3>Örnek Olun</h3>
      <p>Çocuklar ebeveynlerini taklit ederler. Kendi diş bakımınıza özen gösterin ve çocuğunuzla birlikte dişlerinizi fırçalayın.</p>
      
      <p>Düzenli diş hekimi ziyaretleri de çocuğunuzun diş sağlığı için önemlidir. İlk diş hekimi ziyaretini ilk diş çıktıktan sonra veya en geç birinci yaş gününde yapmanız önerilir.</p>
    `,
    author: "Dr. Mehmet Kaya",
    authorTitle: "Çocuk Diş Hekimi",
  },
]

export default function NewsDetailPage() {
  const params = useParams()
  const id = params.id as string

  // Haber detayını bul
  const newsItem = newsDetails.find((item) => item.id === id) || newsDetails[0]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex items-center justify-between border-b">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/news">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-lg font-medium text-center flex-1 truncate px-2">Haber Detayı</h1>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Share2 className="h-5 w-5" />
        </Button>
      </header>

      <div className="flex-1 p-6 pb-24 overflow-y-auto">
        <div className="mb-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{newsItem.title}</h2>
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Calendar className="h-3 w-3 mr-1" />
            {newsItem.date}
            <Badge variant="outline" className="ml-2 text-xs">
              {newsItem.category}
            </Badge>
          </div>
          <div className="rounded-lg overflow-hidden mb-6">
            <img
              src={newsItem.image || "/placeholder.svg"}
              alt={newsItem.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <Card className="border-none shadow-md overflow-hidden animate-slide-up">
          <CardContent className="p-6">
            <div
              className="prose dark:prose-invert max-w-none prose-img:rounded-lg prose-headings:text-primary"
              dangerouslySetInnerHTML={{ __html: newsItem.content }}
            />

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">{newsItem.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium">{newsItem.author}</p>
                  <p className="text-sm text-muted-foreground">{newsItem.authorTitle}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/news">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tüm Haberler
            </Link>
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Paylaş
          </Button>
        </div>
      </div>

      <BottomNavigation active="home" />
    </div>
  )
}
