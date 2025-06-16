'use client'

import { IoArrowBackCircle } from "react-icons/io5";

const BackButton = () => {

  const handleBack = () => {
    window.history.back();
  };

  return (
    <IoArrowBackCircle 
        className='font-bold text-5xl text-logoGreen hover:cursor-pointer hover:text-logoGreenHover'
        onClick={ handleBack }
    />
  )
}

export default BackButton
