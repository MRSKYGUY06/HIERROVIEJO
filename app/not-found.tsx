import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-offwhite px-5 text-center">
      <p className="font-mono-data text-sm uppercase tracking-widest text-rust">Error 404</p>
      <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-carbon sm:text-4xl">
        No encontramos esta página
      </h1>
      <p className="mt-3 max-w-md text-sm text-graphite-light">
        Puede que la máquina que buscás ya no esté disponible o el enlace sea incorrecto.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-sm bg-rust px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white hover:bg-rust-dark">
          Volver al inicio
        </Link>
        <Link href="/maquinas" className="rounded-sm border border-carbon px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-carbon hover:border-rust hover:text-rust">
          Ver catálogo
        </Link>
      </div>
    </div>
  );
}
