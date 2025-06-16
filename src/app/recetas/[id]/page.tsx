import RecetaGrid from '@/components/recetas/RecetaGrid';
import { Procedimiento } from '@/models/Procedimiento';
import { Receta } from '@/models/Receta';
import { procedimientos } from '@/utils/procedimientos';
import { procedimientosAlmuerzo } from '@/utils/procedimientos-almuerzo';
import { recetas } from '@/utils/recetas'
import { recetasAlmuerzo } from '@/utils/recetas-almuerzo'
import { Metadata } from 'next';
import React from 'react'

interface Props {
  params: { id: string }
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {

  const receta: Receta = Number( params.id ) < 100 ? 
    recetas[ Number( params.id ) as keyof typeof recetas ] as Receta :
    recetasAlmuerzo[ Number( params.id ) as keyof typeof recetasAlmuerzo ] as Receta;
    
  return {
    title: `${ receta.title }`,
    description: `Receta de ${ receta.title }`
  }
}

const page = ( { params }: Props ) => {

  const receta: Receta = Number( params.id ) < 100 ? 
    recetas[ Number( params.id ) as keyof typeof recetas ] as Receta :
    recetasAlmuerzo[ Number( params.id ) as keyof typeof recetasAlmuerzo ] as Receta;

  const procedimiento: Procedimiento = Number( params.id ) < 100 ? 
    procedimientos[ Number( params.id ) as keyof typeof procedimientos ] as Procedimiento :
    procedimientosAlmuerzo[ Number( params.id ) as keyof typeof procedimientosAlmuerzo ] as Procedimiento;
  
  return (
    <RecetaGrid 
      receta={receta}
      procedimiento={procedimiento}
      isAlmuerzo={ Number( params.id ) >= 100 }/>
  )
}

export default page
