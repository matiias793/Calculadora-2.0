import RecetaCopaLecheGrid from '@/components/recetasCopaLeche/RecetaCopaLecheGrid';
import { Receta } from '@/models/Receta';
import { RecetaCopaLeche } from '@/models/RecetaCopaLeche';
import { recetasLecheFluida } from '@/utils/recetas-leche-fluida';
import { recetasLecheEnPolvo } from '@/utils/recetas-leche-polvo';
import { Metadata } from 'next';
import React from 'react'

interface Props {
  params: { id: string }
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {

  const receta: Receta = params.id === '1' ? recetasLecheEnPolvo[1] : recetasLecheFluida[1];
    
  return {
    title: `${ receta.title }`,
    description: `Recetas de ${ receta.title }`
  }
}

const page = ( { params }: Props ) => {

    const receta: Receta = params.id === '1' ? recetasLecheEnPolvo[1] : recetasLecheFluida[1];
  
  return (
    <RecetaCopaLecheGrid 
      receta={receta}
      opcion={ params.id }
    />
  )
}
export default page
