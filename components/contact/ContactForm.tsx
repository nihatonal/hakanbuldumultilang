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
import { useTranslations, useLocale } from 'next-intl'

interface ContactFormProps {
  legalAreas: string[]
}

const ContactForm: React.FC<ContactFormProps> = ({ legalAreas }) => {
  const t = useTranslations('contact.form');
  const locale = useLocale();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    legalArea: ''
  })
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t('toast.missingTitle'),
        description: t('toast.missingDescription'),
        variant: 'destructive'
      })
      return
    }

    try {
      setLoading(true)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast({
          title: t('toast.successTitle'),
          description: t('toast.successDescription'),
        })
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          legalArea: ''
        })
        setSelectedCategory('')
      } else {
        toast({
          title: t('toast.errorTitle'),
          description: data.error || t('toast.errorDescription'),
          variant: 'destructive'
        })
      }
    } catch (err) {
      console.error(err)
      toast({
        title: t('toast.errorTitle'),
        description: t('toast.errorDescription'),
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
          {t('heading')}
        </h2>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="card-elegant">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{t('fields.name')} *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('placeholders.name')}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">{t('fields.email')} *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('placeholders.email')}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">{t('fields.phone')}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t('placeholders.phone')}
                />
              </div>
              {locale === "tr" && <div>
                <Label htmlFor="legalArea">{t('fields.legalArea')}</Label>
                <CategorySelectWrapper
                  categories={legalAreas}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  defaultOptionLabel={t('placeholders.legalAreaDefault')}
                  defaultOptionPosition="bottom"
                />
              </div>}
            </div>

            <div>
              <Label htmlFor="subject">{t('fields.subject')}</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder={t('placeholders.subject')}
              />
            </div>

            <div>
              <Label htmlFor="message">{t('fields.message')} *</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t('placeholders.message')}
                rows={6}
                required
              />
            </div>

            <div className="flex items-start space-x-3 text-sm text-muted-foreground">
              <Shield className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <p>{t('privacyNotice')}</p>
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
                  {t('button.sending')}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  {t('button.sendMessage')}
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
