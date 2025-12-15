import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4 animate-in fade-in duration-500">
                {/* Icono de Marca / Logo */}
                <div className="bg-green-100 p-4 rounded-full">
                    {/* Reemplaza esto con <Image /> si tienes logo, sino usa icono */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-12 h-12 text-green-600"
                    >
                        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                        <path d="M7 2v20" />
                        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                    </svg>
                </div>

                {/* Spinner */}
                <Loader2 className="h-8 w-8 animate-spin text-green-600/80" />

                <p className="text-sm font-medium text-neutral-400 animate-pulse">
                    Cargando aplicación...
                </p>
            </div>
        </div>
    );
}
