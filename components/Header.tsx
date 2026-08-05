"use client";

import { Mail } from "lucide-react";

import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <Logo />

        <HeaderMenu />

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden rounded-xl bg-primary text-primary-foreground hover:bg-primary-light sm:inline-flex"
          >
            <a href="tel:+905305610034">İletişime Geç</a>
          </Button>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
