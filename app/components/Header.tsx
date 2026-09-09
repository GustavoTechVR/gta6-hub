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
    <header className="border-b border-neutral-800 px-6 py-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between">
        <a href="/" className="text-lg font-bold">
          GTA 6 Hub
        </a>

        {/* Links visibles en desktop */}
        <div className="hidden gap-6 text-sm sm:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Botón hamburguesa, solo en móvil */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 sm:hidden"
          aria-label="Abrir menú"
        >
          <span className="h-0.5 w-6 bg-neutral-100" />
          <span className="h-0.5 w-6 bg-neutral-100" />
          <span className="h-0.5 w-6 bg-neutral-100" />
        </button>
      </nav>

      {/* Menú desplegable en móvil */}
      {open && (
        <div className="mx-auto mt-4 flex max-w-5xl flex-col gap-4 text-sm sm:hidden">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}