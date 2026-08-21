"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // DEMO: no hay backend conectado. Reemplazar por integración real (API, email, CRM).
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  }

  if (sent) {
    return (
      <div className="rounded-md border border-rust/30 bg-rust/5 p-6 text-center">
        <p className="font-display text-lg font-semibold uppercase text-carbon">¡Mensaje enviado!</p>
        <p className="mt-2 text-sm text-graphite">Gracias por escribirnos. Te responderemos a la brevedad.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-nombre" className="mb-1.5 block font-mono-data text-xs uppercase tracking-wide text-graphite-light">
            Nombre
          </label>
          <input id="c-nombre" name="nombre" required className="w-full rounded-sm border border-graphite/20 bg-white px-3.5 py-2.5 text-sm text-carbon focus:border-rust" />
        </div>
        <div>
          <label htmlFor="c-empresa" className="mb-1.5 block font-mono-data text-xs uppercase tracking-wide text-graphite-light">
            Empresa
          </label>
          <input id="c-empresa" name="empresa" className="w-full rounded-sm border border-graphite/20 bg-white px-3.5 py-2.5 text-sm text-carbon focus:border-rust" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-telefono" className="mb-1.5 block font-mono-data text-xs uppercase tracking-wide text-graphite-light">
            Teléfono
          </label>
          <input id="c-telefono" name="telefono" type="tel" required className="w-full rounded-sm border border-graphite/20 bg-white px-3.5 py-2.5 text-sm text-carbon focus:border-rust" />
        </div>
      </div>
      <div>
        <label htmlFor="c-mensaje" className="mb-1.5 block font-mono-data text-xs uppercase tracking-wide text-graphite-light">
          Mensaje
        </label>
        <textarea id="c-mensaje" name="mensaje" rows={5} required className="w-full rounded-sm border border-graphite/20 bg-white px-3.5 py-2.5 text-sm text-carbon focus:border-rust" />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-sm bg-rust py-3 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-rust-dark disabled:opacity-60"
      >
        {loading ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
