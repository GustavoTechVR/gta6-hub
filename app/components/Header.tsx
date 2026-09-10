'use client';

import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/guias', label: 'Guías' },
    { href: '/mapa', label: 'Mapa' },
    { href: '/personajes', label: 'Personajes' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-vice-pink/20 bg-vice-dark/80 px-6 py-4 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between">
        <a href="/" className="text-xl font-bold tracking-wide text-vice-gradient">
          GTA 6 HUB
        </a>

        <div className="hidden gap-8 text-sm font-medium sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-neutral-300 transition-colors hover:text-vice-cyan"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 sm:hidden"
          aria-label="Abrir menú"
        >
          <span className="h-0.5 w-6 bg-vice-cyan" />
          <span className="h-0.5 w-6 bg-vice-cyan" />
          <span className="h-0.5 w-6 bg-vice-cyan" />
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-4 flex max-w-5xl flex-col gap-4 text-sm sm:hidden">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-neutral-300">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}