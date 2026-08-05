import { Scale } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/tr"
      className="inline-flex items-center gap-3"
      aria-label="Hakan Buldu ana sayfa"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Scale className="h-5 w-5 text-accent" />
      </span>

      <span className="hidden font-display text-lg font-semibold text-primary sm:block">
        Hakan Buldu
      </span>
    </Link>
  );
}