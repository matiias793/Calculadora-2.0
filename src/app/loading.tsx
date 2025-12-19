import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F5FAF5]">
            <div className="flex flex-col items-center gap-6 animate-in fade-in duration-500">
                {/* Logo con animación */}
                <div className="relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px]">
                    <Image
                        src="/logoappsinmarco.png"
                        fill
                        className="object-contain drop-shadow-lg"
                        alt="Logo Calculadora"
                        priority
                    />
                </div>

                {/* Spinner y Texto */}
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm font-medium text-neutral-500 animate-pulse">
                        Cargando contenido...
                    </p>
                </div>
            </div>
        </div>
    );
}
