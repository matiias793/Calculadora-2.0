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
  'Carne en cubos',
  'Carne picada o en cubos',
  'Carne entera',
  'Huevos',
  'Milanesa de carne',
  'Milanesa de pescado',
  'Milanesa de pollo',
  'Pescado',
  'Pollo suprema',
  'Suprema',
  'Suprema de pollo',
  'Aceite',
  'Aceite (asadera)',
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
  'Pulpa de tomate',
  'Puré papas',
  'Queso rallado',
  'Queso fresco',
  'Pasta fresca',
  'Pan rallado',
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
  'Hierbas (orégano, albahaca, tomillo, perejil)',
  'Mix de verdes (perejil, ciboulette)',
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
  'Papa/boniato',
  'Boniato',
  'Repollo',
  'Remolacha',
  'Tomate',
  'Zanahoria',
  'Zapallo',
  'Zapallo/calabaza',
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
  'Laurel',
  'Mayonesa',
  'Agua',
  'Otros'
];

// Función para normalizar nombres de ingredientes y agrupar duplicados
function normalizarNombreIngrediente(nombre: string): string {
  const nombreNormalizado = nombre.toLowerCase().trim();
  
  // Mapeo de variaciones de nombres a un nombre estándar
  const mapeoVariaciones: Record<string, string> = {
    'suprema': 'suprema de pollo',
    'suprema de pollo': 'suprema de pollo',
    'pollo suprema': 'suprema de pollo',
    'pollo': 'pollo',
    'aceite': 'aceite',
    'aceite (asadera)': 'aceite',
    'pulpa tomate': 'pulpa de tomate',
    'pulpa de tomate': 'pulpa de tomate',
    'tomate': 'tomate'
  };
  
  // Buscar coincidencia exacta en el mapeo
  if (mapeoVariaciones[nombreNormalizado]) {
    return mapeoVariaciones[nombreNormalizado];
  }
  
  // Buscar coincidencias parciales más inteligentes
  for (const [variacion, estandar] of Object.entries(mapeoVariaciones)) {
    const variacionLower = variacion.toLowerCase();
    
    // Para pollo/suprema: manejar casos especiales
    if ((variacionLower.includes('pollo') && nombreNormalizado.includes('pollo')) ||
        (variacionLower.includes('suprema') && nombreNormalizado.includes('suprema'))) {
      // Si contiene "suprema" en cualquier forma, normalizar a "suprema de pollo"
      if (nombreNormalizado.includes('suprema')) {
        return 'suprema de pollo';
      }
      // Si es solo "pollo", mantener como "pollo"
      if (nombreNormalizado === 'pollo') {
        return 'pollo';
      }
    }
    
    // Para aceite: agrupar todas las variaciones
    if (nombreNormalizado.includes('aceite')) {
      return 'aceite';
    }
    
    // Para pulpa de tomate: agrupar variaciones
    if (nombreNormalizado.includes('pulpa') && nombreNormalizado.includes('tomate')) {
      return 'pulpa de tomate';
    }
  }
  
  // Si no hay mapeo, devolver el nombre original
  return nombre;
}

// Función para obtener el orden de un ingrediente
function obtenerOrdenIngrediente(nombre: string): number {
  const nombreNormalizado = nombre.toLowerCase().trim();
  
  // Buscar coincidencias exactas primero
  for (let i = 0; i < ORDEN_INGREDIENTES.length; i++) {
    const ingredienteOrden = ORDEN_INGREDIENTES[i].toLowerCase();
    
    // Coincidencia exacta
    if (nombreNormalizado === ingredienteOrden) {
      return i;
    }
  }
  
  // Si no hay coincidencia exacta, buscar coincidencias parciales más específicas
  for (let i = 0; i < ORDEN_INGREDIENTES.length; i++) {
    const ingredienteOrden = ORDEN_INGREDIENTES[i].toLowerCase();
    
    // Para carnes: buscar "carne" + tipo específico
    if (ingredienteOrden.includes('carne') && nombreNormalizado.includes('carne')) {
      if (ingredienteOrden.includes('cerdo') && nombreNormalizado.includes('cerdo')) return i;
      if (ingredienteOrden.includes('vacuna') && nombreNormalizado.includes('vacuna')) return i;
    }
    
    // Para otros ingredientes específicos
    if (ingredienteOrden.includes('pollo') && nombreNormalizado.includes('pollo')) return i;
    if (ingredienteOrden.includes('pescado') && nombreNormalizado.includes('pescado')) return i;
    if (ingredienteOrden.includes('atún') && nombreNormalizado.includes('atún')) return i;
    if (ingredienteOrden.includes('huevo') && nombreNormalizado.includes('huevo')) return i;
    if (ingredienteOrden.includes('yema') && nombreNormalizado.includes('yema')) return i;
    if (ingredienteOrden.includes('leche') && nombreNormalizado.includes('leche')) return i;
    if (ingredienteOrden.includes('milanesa') && nombreNormalizado.includes('milanesa')) return i;
    if (ingredienteOrden.includes('arroz') && nombreNormalizado.includes('arroz')) return i;
    if (ingredienteOrden.includes('fideos') && nombreNormalizado.includes('fideos')) return i;
    if (ingredienteOrden.includes('aceite') && nombreNormalizado.includes('aceite')) return i;
    if (ingredienteOrden.includes('sal') && nombreNormalizado.includes('sal')) return i;
    if (ingredienteOrden.includes('azúcar') && nombreNormalizado.includes('azúcar')) return i;
    if (ingredienteOrden.includes('cebolla') && nombreNormalizado.includes('cebolla')) return i;
    if (ingredienteOrden.includes('papa') && nombreNormalizado.includes('papa')) return i;
    if (ingredienteOrden.includes('tomate') && nombreNormalizado.includes('tomate')) return i;
    if (ingredienteOrden.includes('zanahoria') && nombreNormalizado.includes('zanahoria')) return i;
    if (ingredienteOrden.includes('zapallo') && nombreNormalizado.includes('zapallo')) return i;
  }
  
  // Si no se encuentra, poner al final (después de "Otros")
  return ORDEN_INGREDIENTES.length;
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
  recetaBase: string;
  postre: string;
  sinMenu: boolean;
  porciones: {
    chica: number;
    mediana: number;
    grande: number;
  };
}

export function exportMenuToPDF(menu: DiaMenu[]) {
  const doc = new jsPDF();

  // Página 1: Título y tabla resumen
  doc.setFontSize(16);
  doc.text('Menú Semanal', 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [['Día', 'Principal', 'Acompañamiento', 'Receta Base', 'Postre', 'Chicas', 'Medianas', 'Grandes']],
    body: menu.map(({ dia, principal, acompanamiento, recetaBase, postre, sinMenu, porciones }) => [
      dia,
      sinMenu ? 'No se cocina' : principal || '-',
      sinMenu ? '—' : acompanamiento || '-',
      sinMenu ? '—' : recetaBase || '-',
      sinMenu ? '—' : postre || '-',
      sinMenu ? '-' : porciones.chica.toString(),
      sinMenu ? '-' : porciones.mediana.toString(),
      sinMenu ? '-' : porciones.grande.toString(),
    ]),
    styles: { fontSize: 7, cellPadding: 1 },
    headStyles: { fillColor: [34, 197, 94], textColor: 255 }
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
        } else if (name.toLowerCase().includes('yema') && unit === 'g') {
          cantidadFinal = (cantidadFinal / 15).toFixed(2);
          unidadFinal = 'unidad/es';
        } else {
          cantidadFinal = cantidadFinal.toFixed(2);
        }

        // Usar nombre normalizado para agrupar ingredientes similares
        const nombreNormalizado = normalizarNombreIngrediente(name);
        const clave = `${nombreNormalizado}-${unidadFinal}`;
        
        if (!acumuladorIngredientes[clave]) {
          acumuladorIngredientes[clave] = { cantidad: 0, unidad: unidadFinal };
        }
        acumuladorIngredientes[clave].cantidad += parseFloat(cantidadFinal as string);
      }

      return [name, cantidadFinal, unidadFinal];
    });
  };

  const pageWidth = doc.internal.pageSize.width;

  // Render de ingredientes en columna
  const renderIngredientes = (titulo: string, totalPersonas: number, xOffset: number, maxWidth: number, startY: number) => {
    const ingredientes = calcularIngredientes(titulo, totalPersonas);

    const ingredientesOrdenados = ingredientes.sort((a, b) => {
      const ordenA = obtenerOrdenIngrediente(a[0] as string);
      const ordenB = obtenerOrdenIngrediente(b[0] as string);
      return ordenA - ordenB;
    });

    doc.setFontSize(10);
    doc.text(`${titulo}`, xOffset, startY);
    const tableStartY = startY + 6;

    autoTable(doc, {
      startY: tableStartY,
      head: [['Ingrediente', 'Cantidad', 'Unidad']],
      body: ingredientesOrdenados,
      styles: { fontSize: 6, cellPadding: 1 },
      headStyles: { fillColor: [34, 197, 94], textColor: 255, fontSize: 7 },
      margin: { left: xOffset },
      tableWidth: maxWidth
    });

    return (doc as any).lastAutoTable?.finalY || startY + 20;
  };

  // Render de un día (cuatro columnas: principal, acompañamiento, receta base, postre)
  const renderDia = (diaMenu: DiaMenu, yOffset: number) => {
    const { dia, principal, acompanamiento, recetaBase, postre, sinMenu, porciones } = diaMenu;
    if (sinMenu || (!principal && !acompanamiento && !recetaBase && !postre)) return yOffset;

    doc.setFontSize(14);
    doc.text(`${dia}`, 14, yOffset);

    doc.setFontSize(10);
    doc.text(`Porciones - Chicas: ${porciones.chica}, Medianas: ${porciones.mediana}, Grandes: ${porciones.grande}`, 14, yOffset + 10);
    const totalPersonas = porciones.chica * 0.67 + porciones.mediana + porciones.grande * 1.33;
    doc.text(`Total de personas equivalentes: ${totalPersonas.toFixed(2)}`, 14, yOffset + 17);

      // Layout vertical organizado por categorías
  const sectionStartY = yOffset + 25;
  const tableWidth = pageWidth - 28; // Margen de 14px a cada lado
  let currentY = sectionStartY;

  // Renderizar cada categoría en su propia sección
  if (principal) {
    currentY = renderIngredientes(principal, totalPersonas, 14, tableWidth, currentY);
    currentY += 10; // Espacio entre secciones
  }
  if (acompanamiento) {
    currentY = renderIngredientes(acompanamiento, totalPersonas, 14, tableWidth, currentY);
    currentY += 10; // Espacio entre secciones
  }
  if (recetaBase) {
    currentY = renderIngredientes(recetaBase, totalPersonas, 14, tableWidth, currentY);
    currentY += 10; // Espacio entre secciones
  }
  if (postre) {
    currentY = renderIngredientes(postre, totalPersonas, 14, tableWidth, currentY);
  }

    return currentY + 10;
  };

  // Renderizar cada día en su propia página para evitar superposiciones
  menu.forEach((diaMenu, index) => {
    if (diaMenu && !diaMenu.sinMenu && (diaMenu.principal || diaMenu.acompanamiento || diaMenu.recetaBase || diaMenu.postre)) {
      // Siempre agregar nueva página para cada día (incluyendo el primero)
      doc.addPage();
      renderDia(diaMenu, 20);
    }
  });

  // 4) Totales de la semana en su propia página
  doc.addPage();
  doc.setFontSize(16);
  doc.text('INGREDIENTES TOTALES PARA TODA LA SEMANA', 14, 20);

  const totalIngredientesArray = Object.entries(acumuladorIngredientes)
    .map(([clave, { cantidad, unidad }]) => {
      const [nombre] = clave.split('-');
      // Usar el nombre normalizado para mostrar en el PDF
      const nombreParaMostrar = normalizarNombreIngrediente(nombre);
      return [nombreParaMostrar, cantidad.toFixed(2), unidad];
    })
    .sort((a, b) => {
      const ordenA = obtenerOrdenIngrediente(a[0] as string);
      const ordenB = obtenerOrdenIngrediente(b[0] as string);
      return ordenA - ordenB;
    });

  autoTable(doc, {
    startY: 30,
    head: [['Ingrediente', 'Cantidad total', 'Unidad']],
    body: totalIngredientesArray,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [34, 197, 94], textColor: 255 }
  });

  doc.save('menu-semanal.pdf');
}
