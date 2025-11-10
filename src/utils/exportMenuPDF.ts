import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { recetasAlmuerzo } from '@/utils/recetas-almuerzo';

// Pesos/porciones de postres
interface PesoPostre {
  peso: string;
  unidad: string;
  tipo: 'leche' | 'fruta' | 'fruta_fresca';
}

const pesosPostres: Record<string, PesoPostre> = {
  // Postres de leche (cremas/flanes/arroz con leche)
  'Arroz con leche': { peso: '130-150', unidad: 'g', tipo: 'leche' },
  'Crema de naranja': { peso: '130-150', unidad: 'g', tipo: 'leche' },
  'Crema de vainilla': { peso: '130-150', unidad: 'g', tipo: 'leche' },
  
  // Budines
  'Budín de harina de maíz': { peso: '150', unidad: 'g', tipo: 'fruta' },
  'Budín de zapallo y coco': { peso: '150', unidad: 'g', tipo: 'fruta' },
  
  // Frutas frescas
  'Melón': { peso: '150', unidad: 'g', tipo: 'fruta_fresca' },
  'Sandía': { peso: '250', unidad: 'g', tipo: 'fruta_fresca' },
  'Uva': { peso: '1 racimo pequeño', unidad: '', tipo: 'fruta_fresca' },
  'Ciruela': { peso: '2', unidad: 'unidades', tipo: 'fruta_fresca' },
  'Naranja': { peso: '1', unidad: 'unidad', tipo: 'fruta_fresca' },
  'Banana': { peso: '1', unidad: 'unidad', tipo: 'fruta_fresca' },
  'Durazno': { peso: '1', unidad: 'unidad', tipo: 'fruta_fresca' },
  'Manzana': { peso: '1', unidad: 'unidad', tipo: 'fruta_fresca' },
  'Kiwi': { peso: '1', unidad: 'unidad', tipo: 'fruta_fresca' },
  'Frutilla': { peso: '5', unidad: 'unidades', tipo: 'fruta_fresca' },
  'Mandarina': { peso: '1', unidad: 'unidad', tipo: 'fruta_fresca' }
};

// Función para obtener el peso de un postre
function obtenerPesoPostre(nombrePostre: string): string {
  const postre = pesosPostres[nombrePostre];
  if (!postre) return '';
  
  if (postre.unidad) {
    return `${postre.peso} ${postre.unidad}`;
  }
  return postre.peso;
}

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
  incluirPan?: boolean; // Si se incluye pan (por defecto true, false si la receta lleva masa)
}

export function exportMenuToPDF(menu: DiaMenu[]) {
  const doc = new jsPDF();

  // Página 1: Título y tabla resumen
  doc.setFontSize(16);
  doc.text('Menú Semanal', 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [['Día', 'Principal', 'Acompañamiento', 'Receta Base', 'Postre', 'Chicas', 'Medianas', 'Grandes', 'Pan']],
    body: menu.map(({ dia, principal, acompanamiento, recetaBase, postre, sinMenu, porciones, incluirPan }) => [
      dia,
      sinMenu ? 'No se cocina' : principal || '-',
      sinMenu ? '—' : acompanamiento || '-',
      sinMenu ? '—' : recetaBase || '-',
      sinMenu ? '—' : postre || '-',
      sinMenu ? '-' : porciones.chica.toString(),
      sinMenu ? '-' : porciones.mediana.toString(),
      sinMenu ? '-' : porciones.grande.toString(),
      sinMenu ? '—' : (incluirPan === false ? 'No' : 'Sí'),
    ]),
    styles: { fontSize: 7, cellPadding: 1 },
    headStyles: { fillColor: [34, 197, 94], textColor: 255 }
  });

  // Objeto para acumular ingredientes semanales
  const acumuladorIngredientes: Record<string, { cantidad: number; unidad: string }> = {};

  // Función para agregar fruta fresca al acumulador con identificador "para postre"
  const agregarFrutaAlAcumulador = (nombreFruta: string, cantidad: number, unidad: string) => {
    const nombreConIdentificador = `${nombreFruta} (para postre)`;
    // Usar un separador diferente para evitar problemas con nombres que contengan guiones
    const clave = `${nombreConIdentificador}::${unidad}`;
    
    if (!acumuladorIngredientes[clave]) {
      acumuladorIngredientes[clave] = { cantidad: 0, unidad: unidad };
    }
    acumuladorIngredientes[clave].cantidad += cantidad;
  };

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
        // Usar "::" como separador para ingredientes normales también, para evitar problemas con guiones en nombres
        const nombreNormalizado = normalizarNombreIngrediente(name);
        const clave = `${nombreNormalizado}::${unidadFinal}`;
        
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

  // Render de pan (si aplica)
  const renderPan = (xOffset: number, maxWidth: number, startY: number) => {
    const totalPan = calcularPanTotal();
    if (totalPan === 0) return startY;

    doc.setFontSize(10);
    doc.text('Pan', xOffset, startY);
    const tableStartY = startY + 6;

    autoTable(doc, {
      startY: tableStartY,
      head: [['Ingrediente', 'Cantidad', 'Unidad']],
      body: [['Pan', totalPan.toLocaleString('es-ES', { maximumFractionDigits: 0 }), 'g']],
      styles: { fontSize: 6, cellPadding: 1 },
      headStyles: { fillColor: [34, 197, 94], textColor: 255, fontSize: 7 },
      margin: { left: xOffset },
      tableWidth: maxWidth
    });

    return (doc as any).lastAutoTable?.finalY || startY + 20;
  };

  // Calcular pan total para la semana
  const calcularPanTotal = () => {
    let totalPan = 0; // en gramos
    
    menu.forEach(diaMenu => {
      if (diaMenu.sinMenu || diaMenu.incluirPan === false) return;
      
      const porcionesChica = Number(diaMenu.porciones.chica) || 0;
      const porcionesMediana = Number(diaMenu.porciones.mediana) || 0;
      const porcionesGrande = Number(diaMenu.porciones.grande) || 0;
      
      // 20g para porción chica, 25g para mediana y grande
      totalPan += (porcionesChica * 20) + ((porcionesMediana + porcionesGrande) * 25);
    });
    
    return totalPan;
  };

  // Render de un día (cuatro columnas: principal, acompañamiento, receta base, postre)
  const renderDia = (diaMenu: DiaMenu, yOffset: number) => {
    const { dia, principal, acompanamiento, recetaBase, postre, sinMenu, porciones, incluirPan } = diaMenu;
    if (sinMenu || (!principal && !acompanamiento && !recetaBase && !postre)) return yOffset;

    doc.setFontSize(14);
    doc.text(`${dia}`, 14, yOffset);

    doc.setFontSize(10);
    doc.text(`Porciones - Chicas: ${porciones.chica}, Medianas: ${porciones.mediana}, Grandes: ${porciones.grande}`, 14, yOffset + 10);
    const totalPersonas = porciones.chica * 0.67 + porciones.mediana + porciones.grande * 1.33;

      // Layout vertical organizado por categorías
    const sectionStartY = yOffset + 20;
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
    // Mostrar información del postre con su peso por porción
    const pesoPostre = obtenerPesoPostre(postre);
    const postreData = pesosPostres[postre];
    
    if (pesoPostre) {
      doc.setFontSize(9);
      doc.setTextColor(0, 100, 200);
      doc.text(`Porción: ${pesoPostre} por persona`, 14, currentY);
      if (postreData?.tipo === 'fruta_fresca' && postreData.unidad === 'g') {
        doc.text('(con cáscara)', 14, currentY + 5);
        currentY += 5;
      }
      doc.setTextColor(0, 0, 0);
      currentY += 6;
    }
    
    // Si es una fruta fresca, no buscar receta (solo mostrar el peso)
    if (postreData?.tipo === 'fruta_fresca') {
      doc.setFontSize(10);
      doc.text(`${postre} (para postre)`, 14, currentY);
      currentY += 6;
      doc.setFontSize(9);
      
      // Calcular cantidad total de fruta necesaria
      const pesoNumero = parseFloat(postreData.peso);
      if (!isNaN(pesoNumero) && postreData.unidad === 'g') {
        // Para frutas con peso en gramos (Melón, Sandía)
        const cantidadTotal = pesoNumero * totalPersonas;
        doc.text(`Cantidad total necesaria: ${cantidadTotal.toFixed(2)} ${postreData.unidad} (con cáscara)`, 14, currentY);
        currentY += 10;
        // Agregar al acumulador
        agregarFrutaAlAcumulador(postre, cantidadTotal, postreData.unidad);
      } else if (postreData.peso.includes('racimo')) {
        // Para Uva: "1 racimo pequeño"
        doc.text(`Cantidad por persona: ${postreData.peso}`, 14, currentY);
        const totalRacimos = Math.ceil(totalPersonas);
        doc.text(`Total para ${totalPersonas.toFixed(0)} personas: ${totalRacimos} racimos pequeños`, 14, currentY + 5);
        currentY += 12;
        // Agregar al acumulador (usar unidades como "racimos pequeños")
        agregarFrutaAlAcumulador(postre, totalRacimos, 'racimos pequeños');
      } else {
        // Para frutas por unidades (Ciruela: 2 unidades, Naranja: 1 unidad, Frutilla: 5 unidades, etc.)
        // El peso puede ser un número o un string con número
        const cantidadBase = parseFloat(postreData.peso);
        const unidadDisplay = postreData.unidad || 'unidad';
        const esPlural = cantidadBase > 1 || unidadDisplay === 'unidades';
        
        doc.text(`Cantidad por persona: ${postreData.peso} ${unidadDisplay}${esPlural ? '' : ''}`, 14, currentY);
        const totalUnidades = Math.ceil(cantidadBase * totalPersonas);
        const unidadFinal = unidadDisplay === 'unidad' ? 'unidades' : unidadDisplay;
        doc.text(`Total para ${totalPersonas.toFixed(0)} personas: ${totalUnidades} ${unidadFinal}`, 14, currentY + 5);
        currentY += 12;
        // Agregar al acumulador
        agregarFrutaAlAcumulador(postre, totalUnidades, unidadFinal);
      }
    } else {
      // Para postres con receta, mostrar ingredientes
    currentY = renderIngredientes(postre, totalPersonas, 14, tableWidth, currentY);
    }
  }

  // Agregar pan para este día
  currentY += 5;
  const porcionesChica = Number(porciones.chica) || 0;
  const porcionesMediana = Number(porciones.mediana) || 0;
  const porcionesGrande = Number(porciones.grande) || 0;
  
  if (incluirPan !== false) {
    const panDelDia = (porcionesChica * 20) + ((porcionesMediana + porcionesGrande) * 25);
    
    if (panDelDia > 0) {
      doc.setFontSize(10);
      doc.text('Pan', 14, currentY);
      currentY += 6;
      doc.setFontSize(9);
      doc.text(`Cantidad necesaria: ${panDelDia}g`, 14, currentY);
      currentY += 10;
    }
  } else {
    doc.setFontSize(10);
    doc.text('Pan', 14, currentY);
    currentY += 6;
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('No se incluye pan (receta con masa)', 14, currentY);
    doc.setTextColor(0, 0, 0);
    currentY += 10;
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
      let nombreParaMostrar: string;
      
      // Todos los ingredientes ahora usan "::" como separador
      const [nombreCompleto] = clave.split('::');
      // Si el nombre incluye "(para postre)", mantenerlo tal cual
      // Si no, normalizar el nombre
      nombreParaMostrar = nombreCompleto.includes('(para postre)') 
        ? nombreCompleto 
        : normalizarNombreIngrediente(nombreCompleto);
      
      // Formatear cantidad según el tipo de unidad
      let cantidadFormateada: string;
      // Para unidades, racimos, etc., usar números enteros
      if (unidad === 'unidades' || unidad === 'unidad' || unidad === 'racimos' || unidad === 'unidad/es' || unidad === 'racimos pequeños' || unidad.includes('racimo')) {
        cantidadFormateada = Math.ceil(cantidad).toString();
      } else {
        cantidadFormateada = cantidad.toFixed(2);
      }
      
      return [nombreParaMostrar, cantidadFormateada, unidad];
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

  // Agregar pan al final si aplica
  const totalPan = calcularPanTotal();
  if (totalPan > 0) {
    const lastY = (doc as any).lastAutoTable?.finalY || 30;
    autoTable(doc, {
      startY: lastY + 10,
      head: [['Ingrediente', 'Cantidad total', 'Unidad']],
      body: [['Pan', totalPan.toLocaleString('es-ES', { maximumFractionDigits: 0 }), 'g']],
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [34, 197, 94], textColor: 255 }
    });
    
    // Agregar nota sobre cálculo de pan
    const panLastY = (doc as any).lastAutoTable?.finalY || lastY + 20;
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text('Nota: Pan calculado como 20g para porción chica y 25g para porción mediana/grande. No se incluye pan para recetas que llevan masa.', 14, panLastY + 5, { maxWidth: pageWidth - 28 });
    doc.setTextColor(0, 0, 0);
  }

  doc.save('menu-semanal.pdf');
}
