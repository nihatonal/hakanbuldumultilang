import Link from '@/node_modules/next/link'
import React from 'react'
import Container from './Container'
import HeaderMenu from './HeaderMenu'
import LanguageSwitcher from './LanguageSwitcher'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import { Button } from './ui/button'

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <Container className="flex items-center justify-between text-lightColor">
        <Logo />
        <HeaderMenu />
        <div className="flex items-center gap-4">
          <Button asChild className="btn-hero hidden sm:flex">
            <Link href="/iletisim">Hemen Yanıt Alın</Link>
          </Button>
          <LanguageSwitcher />
          <MobileMenu />
        </div>

      </Container>
    </header>
  )
}

export default Header