import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/site-config";

export default function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-0 overflow-hidden rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-all duration-300 hover:shadow-xl hover:shadow-black/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center">
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" aria-hidden="true">
          <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.29.638 4.43 1.744 6.256L4 29l7.94-1.708A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75c-1.98 0-3.83-.55-5.41-1.5l-.388-.23-4.71 1.014 1.005-4.59-.253-.402A9.71 9.71 0 0 1 5.25 15c0-5.93 4.824-10.75 10.754-10.75S26.75 9.07 26.75 15 21.934 24.75 16.004 24.75Zm5.84-8.06c-.32-.16-1.888-.932-2.18-1.038-.293-.107-.507-.16-.72.16-.213.32-.827 1.038-1.014 1.25-.187.213-.373.24-.693.08-.32-.16-1.352-.498-2.575-1.589-.952-.849-1.595-1.897-1.782-2.217-.187-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.736-.987-2.377-.26-.626-.524-.541-.72-.55l-.613-.011c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.669 0 1.575 1.146 3.096 1.306 3.31.16.213 2.256 3.444 5.467 4.83.764.33 1.36.527 1.825.674.767.244 1.465.21 2.017.127.615-.092 1.888-.772 2.155-1.517.267-.746.267-1.385.187-1.518-.08-.133-.293-.213-.613-.373Z" />
        </svg>
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-xs group-hover:pr-5 group-focus-visible:max-w-xs group-focus-visible:pr-5">
        Consultar por WhatsApp
      </span>
    </a>
  );
}
