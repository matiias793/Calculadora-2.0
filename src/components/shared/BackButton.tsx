'use client'

import { IoArrowBackCircle } from "react-icons/io5";
import Link from "next/link";

interface BackButtonProps {
  href?: string;
}

const BackButton = ({ href }: BackButtonProps) => {

  const handleBack = () => {
    window.history.back();
  };

  if (href) {
    return (
      <Link href={href}>
        <IoArrowBackCircle 
            className='font-bold text-5xl text-logoGreen hover:cursor-pointer hover:text-logoGreenHover'
        />
      </Link>
    );
  }

  return (
    <IoArrowBackCircle 
        className='font-bold text-5xl text-logoGreen hover:cursor-pointer hover:text-logoGreenHover'
        onClick={ handleBack }
    />
  )
}

export default BackButton
