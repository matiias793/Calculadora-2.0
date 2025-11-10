import Image from "next/image";
import NavigationButtons from "@/components/shared/NavigationButtons";

export default function EscuelasVerano2026() {
  return (
    <div className="mx-auto max-w-screen-xl px-2 sm:px-4 w-full mt-6 sm:mt-10">
      <div className="flex flex-col items-start">
        <span className="pl-2 sm:pl-4 md:pl-20 lg:pl-32 flex flex-col items-start justify-start mb-4">
          <NavigationButtons />
        </span>
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 sm:py-16">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/logo.png"
            width={200}
            height={200}
            alt="Logo"
            className="w-[150px] h-auto sm:w-[200px] md:w-[240px] opacity-60"
            priority={true}
            sizes="(max-width: 640px) 150px, (max-width: 768px) 200px, 240px"
          />
        </div>
        
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-logoGreen text-center mb-4 sm:mb-6">
          Escuelas de verano 2026
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg px-8 py-12 sm:px-12 sm:py-16 max-w-md w-full text-center">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400 mb-4">
            Próximamente
          </p>
          <p className="text-base sm:text-lg text-gray-600 mt-4">
            Estamos trabajando en esta sección. Muy pronto estará disponible.
          </p>
        </div>
      </div>
    </div>
  );
}

