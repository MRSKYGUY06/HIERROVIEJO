"use client";

import { useState } from "react";
import { buildWhatsAppLink, productWhatsAppMessage } from "@/lib/site-config";

export default function ProductInquiryForm({ productName }: { productName: string }) {
  const [message, setMessage] = useState(productWhatsAppMessage(productName));

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="consulta"
          className="mb-1.5 block font-mono-data text-xs uppercase tracking-wide text-graphite-light"
        >
          Consulta
        </label>
        <textarea
          id="consulta"
          name="consulta"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-sm border border-graphite/20 bg-white px-3.5 py-2.5 text-sm text-carbon focus:border-rust"
        />
      </div>
      <a
        href={buildWhatsAppLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-sm bg-rust py-3 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-rust-dark"
      >
        Enviar consulta por WhatsApp
      </a>
    </div>
  );
}
