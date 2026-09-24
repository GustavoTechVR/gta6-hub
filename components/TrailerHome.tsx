// components/TrailerHome.tsx
export default function TrailerHome() {
  const videoId = 'tJbzMqJGH4k';
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <section className="mt-10">
      <div className="flex flex-col items-center text-center">
        <span className="rounded-full bg-vice-pink/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-vice-pink">
          Extended Look Oficial
        </span>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          El trailer que rompió{' '}
          <span className="bg-gradient-to-r from-vice-pink to-cyan-400 bg-clip-text text-transparent">
            internet
          </span>
        </h2>
        <p className="mt-2 max-w-2xl text-neutral-400">
          26 minutos de gameplay puro. Jason, Lucia, Leonida y el crimen más
          esperado de la década, directo del canal oficial de Rockstar Games.
        </p>
      </div>

      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mx-auto mt-6 block aspect-video w-full max-w-4xl overflow-hidden rounded-xl border border-vice-pink/20 shadow-[0_0_40px_rgba(238,0,221,0.15)]"
      >
        <img
          src={thumbnailUrl}
          alt="GTA VI: An Extended Look - Rockstar Games"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/50 transition-colors group-hover:bg-black/40">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
            <svg
              className="ml-1 h-7 w-7 text-white sm:h-9 sm:w-9"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="rounded-md bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Ver en YouTube · Restricción de edad
          </span>
        </div>
      </a>

      <div className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
          <p className="text-2xl font-bold text-cyan-400">31.1M</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
            vistas en Netflix (4 días)
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
          <p className="text-2xl font-bold text-vice-pink">2</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
            protagonistas: Jason &amp; Lucia
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">19 nov</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
            2026, fecha confirmada
          </p>
        </div>
      </div>
    </section>
  );
}