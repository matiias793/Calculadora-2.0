import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { recetasAlmuerzo } from '@/utils/recetas-almuerzo';

// Orden específico de ingredientes para el PDF
const ORDEN_INGREDIENTES = [
  'Leche fluida',
  'Leche en polvo',
  'Atún',
  'Carne de cerdo magra',
  'Carne vacuna picada',
  'Carne vacuna entera',
  'Huevos',
  'Milanesa de carne',
  'Milanesa de pescado',
  'Milanesa de pollo',
  'Pescado',
  'Pollo suprema',
  'Aceite',
  'Almidón de Maíz',
  'Arroz',
  'Arvejas',
  'Avena',
  'Choclo',
  'Fideos',
  'Lentejas',
  'Porotos',
  'Polenta',
  'Polvo Crema',
  'Flan',
  'Pulpa tomate',
  'Puré papas',
  'Queso rallado',
  'Queso fresco',
  'Pasta fresca',
  'Sal',
  'Vinagre',
  'Limón',
  'Orégano',
  'Pimentón',
  'Comino',
  'Ajo',
  'Nuez moscada',
  'Tomillo',
  'Albahaca',
  'Perejil',
  'Ciboulette',
  'Acelga',
  'Espinaca',
  'Zapallito',
  'Berenjena',
  'Brócoli',
  'Cebolla',
  'Chaucha',
  'Lechuga',
  'Morrón',
  'Papa',
  'Boniato',
  'Repollo',
  'Remolacha',
  'Tomate',
  'Zanahoria',
  'Zapallo',
  'Calabaza',
  'Banana',
  'Ciruela',
  'Durazno',
  'Frutilla',
  'Melón',
  'Sandía',
  'Mandarina',
  'Naranja',
  'Manzana',
  'Uva',
  'Kiwi',
  'Azúcar',
  'Pan blanco',
  'Pan integral',
  'Ricota',
  'Puerro',
  'Apio',
  'Laurel'
];

// Función para obtener el orden de un ingrediente
function obtenerOrdenIngrediente(nombre: string): number {
  const nombreNormalizado = nombre.toLowerCase().trim();
  
  // Buscar coincidencias exactas o parciales
  for (let i = 0; i < ORDEN_INGREDIENTES.length; i++) {
    const ingredienteOrden = ORDEN_INGREDIENTES[i].toLowerCase();
    
    // Coincidencia exacta
    if (nombreNormalizado === ingredienteOrden) {
      return i;
    }
    
    // Coincidencia parcial (para casos como "carne vacuna" vs "carne vacuna picada")
    if (nombreNormalizado.includes(ingredienteOrden) || ingredienteOrden.includes(nombreNormalizado)) {
      return i;
    }
  }
  
  // Si no se encuentra, poner al final
  return ORDEN_INGREDIENTES.length + 1;
}

declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable?: { finalY: number };
  }
}

interface DiaMenu {
  dia: string;
  principal: string;
  acompanamiento: string;
  sinMenu: boolean;
  porciones: {
    chica: number;
    mediana: number;
    grande: number;
  };
}

export function exportMenuToPDF(menu: DiaMenu[]) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Menú Semanal', 14, 20);

  // 1. Tabla resumen
  autoTable(doc, {
    startY: 30,
    head: [['Día', 'Principal', 'Acompañamiento', 'Chicas', 'Medianas', 'Grandes']],
    body: menu.map(({ dia, principal, acompanamiento, sinMenu, porciones }) => [
      dia,
      sinMenu ? 'No se cocina' : principal || '-',
      sinMenu ? '—' : acompanamiento || '-',
      sinMenu ? '-' : porciones.chica.toString(),
      sinMenu ? '-' : porciones.mediana.toString(),
      sinMenu ? '-' : porciones.grande.toString(),
    ]),
  });

  // Objeto para acumular ingredientes semanales
  const acumuladorIngredientes: Record<string, { cantidad: number; unidad: string }> = {};

  const calcularIngredientes = (titulo: string, totalPersonas: number) => {
    const receta = Object.values(recetasAlmuerzo).find(r => r.title === titulo);
    if (!receta) return [];

    return receta.ingredients.map(({ name, quantity, unit }) => {
      let cantidadFinal: number | string = quantity;
      let unidadFinal = unit;

      if (typeof quantity === 'number') {
        cantidadFinal = quantity * totalPersonas;

        if (name.toLowerCase().includes('huevo') && unit === 'g') {
          cantidadFinal = (cantidadFinal / 60).toFixed(2);
          unidadFinal = 'unidad/es';
        } else {
          cantidadFinal = cantidadFinal.toFixed(2);
        }

        // Acumular para el total semanal
        const clave = `${name}-${unidadFinal}`;
        if (!acumuladorIngredientes[clave]) {
          acumuladorIngredientes[clave] = { cantidad: 0, unidad: unidadFinal };
        }
        acumuladorIngredientes[clave].cantidad += parseFloat(cantidadFinal as string);
      }

      return [name, cantidadFinal, unidadFinal];
    });
  };

  // 2. Por día
  menu.forEach(({ dia, principal, acompanamiento, sinMenu, porciones }) => {
    if (sinMenu || (!principal && !acompanamiento)) return;

    const totalPersonas = porciones.chica * 0.67 + porciones.mediana + porciones.grande * 1.33;

    const render = (titulo: string) => {
      const ingredientes = calcularIngredientes(titulo, totalPersonas);

      const lastY = (doc as any).lastAutoTable?.finalY ?? 30;

      autoTable(doc, {
        startY: lastY + 10,
        head: [[`${dia} - ${titulo}`]],
        body: [],
        theme: 'plain'
      });

      // Ordenar ingredientes por día también
      const ingredientesOrdenados = ingredientes.sort((a, b) => {
        const ordenA = obtenerOrdenIngrediente(a[0] as string);
        const ordenB = obtenerOrdenIngrediente(b[0] as string);
        return ordenA - ordenB;
      });

      autoTable(doc, {
        startY: (doc as any).lastAutoTable?.finalY + 2,
        head: [['Ingrediente', 'Cantidad', 'Unidad']],
        body: ingredientesOrdenados,
      });
    };

    if (principal) render(principal);
    if (acompanamiento) render(acompanamiento);
  });

  // 3. Tabla total de la semana
  const totalY = (doc as any).lastAutoTable?.finalY ?? 30;

  autoTable(doc, {
    startY: totalY + 15,
    head: [['INGREDIENTES TOTALES PARA TODA LA SEMANA']],
    body: [],
    theme: 'plain',
  });

  const totalIngredientesArray = Object.entries(acumuladorIngredientes)
    .map(([clave, { cantidad, unidad }]) => {
      const [nombre] = clave.split('-');
      return [nombre, cantidad.toFixed(2), unidad];
    })
    .sort((a, b) => {
      const ordenA = obtenerOrdenIngrediente(a[0] as string);
      const ordenB = obtenerOrdenIngrediente(b[0] as string);
      return ordenA - ordenB;
    });

  autoTable(doc, {
    startY: (doc as any).lastAutoTable?.finalY + 2,
    head: [['Ingrediente', 'Cantidad total', 'Unidad']],
    body: totalIngredientesArray,
  });

  doc.save('menu-semanal.pdf');
}
