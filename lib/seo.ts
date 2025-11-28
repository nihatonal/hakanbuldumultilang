// lib/seo.ts
type Locale = "tr" | "en";
const LOCALES: Locale[] = ["tr", "en"];
const BASE = "https://www.hakanbuldu.com";

function ensureSlash(path: string) {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function buildI18nCanonical(
  locale: Locale,
  pathOrMap: string | Record<Locale, string>
) {
  // Eğer tek path verilmişse, her iki locale için aynı path kullanılır
  const isString = typeof pathOrMap === "string";

  // canonical for current locale
  const currentPath = isString
    ? ensureSlash(pathOrMap as string)
    : ensureSlash((pathOrMap as Record<Locale, string>)[locale] ?? "/");

  // languages mapping: her locale için uygun path (varsa map'ten, yoksa currentPath'ten)
  const languages: Record<string, string> = {};
  for (const L of LOCALES) {
    const p = isString
      ? ensureSlash(pathOrMap as string)
      : ensureSlash((pathOrMap as Record<Locale, string>)[L] ?? currentPath);
    languages[L] = `${BASE}/${L}${p === "/" ? "" : p}`;
  }

  return {
    alternates: {
      canonical: `${BASE}/${locale}${currentPath === "/" ? "" : currentPath}`,
      languages,
      "x-default": `${BASE}/tr${currentPath === "/" ? "" : currentPath}`,
    },
  };
}
