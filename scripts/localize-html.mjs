/**
 * After `next build`: the exported pages under out/ar/ and out/ku/ get the right <html lang> and dir="rtl"
 * (the shared root layout can only write one), so browsers, screen readers and Google see the real language.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
const LANGS = { ar: 'lang="ar" dir="rtl"', ku: 'lang="ckb" dir="rtl"' };

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = path.join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
});

let n = 0;
for (const [code, attrs] of Object.entries(LANGS)) {
  const dir = path.join(OUT, code);
  for (const file of walk(dir)) {
    const html = readFileSync(file, "utf8");
    const next = html.replace(/<html lang="en" dir="ltr"/, `<html ${attrs}`);
    if (next !== html) { writeFileSync(file, next); n++; }
  }
}
console.log(`localize-html: set the language on ${n} page(s)`);
