// Rangos de escuelas por departamento en Uruguay
export const ESCUELAS_POR_DEPARTAMENTO = {
  'Artigas': { min: 1, max: 45 },
  'Canelones': { min: 1, max: 150 },
  'Cerro Largo': { min: 1, max: 65 },
  'Colonia': { min: 1, max: 55 },
  'Durazno': { min: 1, max: 40 },
  'Flores': { min: 1, max: 25 },
  'Florida': { min: 1, max: 45 },
  'Lavalleja': { min: 1, max: 35 },
  'Maldonado': { min: 1, max: 60 },
  'Montevideo': { min: 1, max: 300 },
  'Paysandú': { min: 1, max: 117 },
  'Río Negro': { min: 1, max: 35 },
  'Rivera': { min: 1, max: 55 },
  'Rocha': { min: 1, max: 45 },
  'Salto': { min: 1, max: 85 },
  'San José': { min: 1, max: 55 },
  'Soriano': { min: 1, max: 50 },
  'Tacuarembó': { min: 1, max: 70 },
  'Treinta y Tres': { min: 1, max: 40 }
};

// Función para obtener el rango de escuelas de un departamento
export function getEscuelasRango(departamento: string) {
  return ESCUELAS_POR_DEPARTAMENTO[departamento as keyof typeof ESCUELAS_POR_DEPARTAMENTO] || { min: 1, max: 300 };
}

// Función para generar opciones de escuelas para un departamento
export function generarOpcionesEscuelas(departamento: string): string[] {
  const rango = getEscuelasRango(departamento);
  const opciones: string[] = [];
  
  for (let i = rango.min; i <= rango.max; i++) {
    opciones.push(`Escuela N° ${i}`);
  }
  
  return opciones;
}

// Función para validar si una escuela es válida para un departamento
export function validarEscuela(departamento: string, escuela: string): boolean {
  const rango = getEscuelasRango(departamento);
  const numeroEscuela = parseInt(escuela.replace(/\D/g, ''));
  
  return numeroEscuela >= rango.min && numeroEscuela <= rango.max;
}

// Función para obtener solo el número de escuela
export function extraerNumeroEscuela(escuela: string): number {
  const match = escuela.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
}

// Función para formatear número de escuela
export function formatearNumeroEscuela(numero: number): string {
  return `Escuela N° ${numero}`;
}
