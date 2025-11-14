'use client'

import { IoArrowBackCircle } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
}

const BackButton = ({ href }: BackButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
      return;
    }

    if (typeof window !== 'undefined') {
      // Usar el historial del navegador nativo
      if (window.history.length > 1) {
        // Antes de navegar hacia atrás, establecer skipWelcome si vamos a "/"
        // Esto evita que se muestre la bienvenida al retroceder
        sessionStorage.setItem('skipWelcome', 'true');
    window.history.back();
      } else {
        // Si no hay historial, ir al menú principal sin bienvenida
        sessionStorage.setItem('skipWelcome', 'true');
        router.push('/');
      }
    }
  };

  if (href) {
    return (
      <Link href={href}>
        <IoArrowBackCircle 
            className='font-bold text-4xl sm:text-5xl text-primary hover:cursor-pointer hover:text-primary-hover transition-colors duration-200'
        />
      </Link>
    );
  }

  return (
    <IoArrowBackCircle 
        className='font-bold text-4xl sm:text-5xl text-primary hover:cursor-pointer hover:text-primary-hover transition-colors duration-200'
        onClick={ handleBack }
    />
  )
}

export default BackButton
