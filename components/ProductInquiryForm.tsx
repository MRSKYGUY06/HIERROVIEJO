"use client";

import { useState } from "react";

export default function ProductInquiryForm({ productName }: { productName: string }) {
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
        <p className="font-display text-lg font-semibold uppercase text-carbon">¡Consulta enviada!</p>
        <p className="mt-2 text-sm text-graphite">
          Gracias por tu interés en {productName}. Te contactaremos a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" id="nombre" required />
        <Field label="Empresa" id="empresa" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Teléfono" id="telefono" type="tel" required />
        <Field label="Email" id="email" type="email" required />
      </div>
      <div>
        <label htmlFor="consulta" className="mb-1.5 block font-mono-data text-xs uppercase tracking-wide text-graphite-light">
          Consulta
        </label>
        <textarea
          id="consulta"
          name="consulta"
          rows={4}
          required
          defaultValue={`Hola, estoy interesado en la máquina ${productName}. ¿Podrían brindarme más información sobre disponibilidad, precio y condiciones?`}
          className="w-full rounded-sm border border-graphite/20 bg-white px-3.5 py-2.5 text-sm text-carbon focus:border-rust"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-sm bg-rust py-3 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-rust-dark disabled:opacity-60"
      >
        {loading ? "Enviando…" : "Enviar consulta"}
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  type = "text",
  required = false,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-mono-data text-xs uppercase tracking-wide text-graphite-light">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full rounded-sm border border-graphite/20 bg-white px-3.5 py-2.5 text-sm text-carbon focus:border-rust"
      />
    </div>
  );
}
