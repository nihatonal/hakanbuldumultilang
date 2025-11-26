'use client'

import { useToast } from '@/hooks/use-toast'
import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Send, Shield, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import { fadeUp, containerStagger } from '@/lib/animations'
import CategorySelectWrapper from '../CategorySelectWrapper'


interface ContactFormProps {
  legalAreas: string[]
}

const ContactForm: React.FC<ContactFormProps> = ({ legalAreas }) => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    legalArea: ''
  })
  const [selectedCategory, setSelectedCategory] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Eksik Bilgi',
        description: 'Lütfen zorunlu alanları doldurun.',
        variant: 'destructive'
      })
      return
    }

    try {
      setLoading(true)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast({
          title: 'Mesajınız Gönderildi.',
          description: 'En kısa sürede size dönüş yapacağım. Teşekkür ederim.'
        })
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          legalArea: ''
        })
        setSelectedCategory("")
      } else {
        toast({
          title: 'Hata',
          description: data.error || 'Mesaj gönderilemedi.',
          variant: 'destructive'
        })
      }
    } catch (err) {
      console.error(err)
      toast({
        title: 'Hata',
        description: 'Mesaj gönderilemedi.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      legalArea: selectedCategory
    }))
  }, [selectedCategory])

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerStagger}
      className="space-y-8"
    >
      <motion.div variants={fadeUp} className="mb-8">
        <h2 className="font-display text-3xl font-bold text-primary mb-4">
          Bilgi ve Danışmanlık Formu
        </h2>
        <p className="text-muted-foreground">
          Hukuki durumunuzu detaylı bir şekilde paylaşabilirsiniz. Sorularınıza doğru ve güvenilir bilgilerle yanıt verilecek, süreçler hakkında rehberlik sağlanacaktır. Tüm bilgileriniz gizli tutulur.
        </p>
      </motion.div>


      <motion.div variants={fadeUp}>
        <Card className="card-elegant">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Ad Soyad *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Adınız ve soyadınız"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">E-posta *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ornek@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+90 5XX XXX XX XX"
                />
              </div>
              <div>
                <Label htmlFor="legalArea">Hukuki Alan</Label>
                <CategorySelectWrapper
                  categories={legalAreas}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  defaultOptionLabel="Diğer"
                  defaultOptionPosition="bottom"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Konu</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Danışmanlık konusu"
              />
            </div>

            <div>
              <Label htmlFor="message">Mesajınız *</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Hukuki durumunuzla ilgili merak ettiğiniz soruları veya bilgi taleplerinizi buraya yazabilirsiniz..."
                rows={6}
                required
              />
            </div>

            <div className="flex items-start space-x-3 text-sm text-muted-foreground">
              <Shield className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <p>
                Gönderdiğiniz tüm bilgiler gizlilik kapsamında korunur.
                Kişisel verileriniz güvenle saklanır.
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Mesajı Gönder
                </>
              )}
            </Button>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default ContactForm
