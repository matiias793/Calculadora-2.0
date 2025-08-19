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

  // Página 1: Título y tabla resumen
  doc.setFontSize(16);
  doc.text('Menú Semanal', 14, 20);

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
    styles: { fontSize: 8, cellPadding: 2 },
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
        } else {
          cantidadFinal = cantidadFinal.toFixed(2);
        }

        const clave = `${name}-${unidadFinal}`;
        if (!acumuladorIngredientes[clave]) {
          acumuladorIngredientes[clave] = { cantidad: 0, unidad: unidadFinal };
        }
        acumuladorIngredientes[clave].cantidad += parseFloat(cantidadFinal as string);
      }

      return [name, cantidadFinal, unidadFinal];
    });
  };

  const pageWidth = doc.internal.pageSize.width;
  const centerX = pageWidth / 2;

  // Dibuja línea vertical a lo largo de la página
  const drawVerticalDivider = (fromY = 20, toY = 280) => {
    doc.setDrawColor(200, 200, 200);
    doc.line(centerX, fromY, centerX, toY);
  };

  // Render de ingredientes en columna
  const renderIngredientes = (titulo: string, totalPersonas: number, xOffset: number, maxWidth: number, startY: number) => {
    const ingredientes = calcularIngredientes(titulo, totalPersonas);

    const ingredientesOrdenados = ingredientes.sort((a, b) => {
      const ordenA = obtenerOrdenIngrediente(a[0] as string);
      const ordenB = obtenerOrdenIngrediente(b[0] as string);
      return ordenA - ordenB;
    });

    doc.setFontSize(12);
    doc.text(`${titulo}`, xOffset, startY);
    const tableStartY = startY + 8;

    autoTable(doc, {
      startY: tableStartY,
      head: [['Ingrediente', 'Cantidad', 'Unidad']],
      body: ingredientesOrdenados,
      styles: { fontSize: 7, cellPadding: 1 },
      headStyles: { fillColor: [34, 197, 94], textColor: 255, fontSize: 8 },
      margin: { left: xOffset },
      tableWidth: maxWidth
    });

    return (doc as any).lastAutoTable?.finalY + 5;
  };

  // Render de un día (dos columnas: principal izquierda, acompañamiento derecha)
  const renderDia = (diaMenu: DiaMenu, yOffset: number) => {
    const { dia, principal, acompanamiento, sinMenu, porciones } = diaMenu;
    if (sinMenu || (!principal && !acompanamiento)) return yOffset;

    doc.setFontSize(14);
    doc.text(`${dia}`, 14, yOffset);

    doc.setFontSize(10);
    doc.text(`Porciones - Chicas: ${porciones.chica}, Medianas: ${porciones.mediana}, Grandes: ${porciones.grande}`, 14, yOffset + 10);
    const totalPersonas = porciones.chica * 0.67 + porciones.mediana + porciones.grande * 1.33;
    doc.text(`Total de personas equivalentes: ${totalPersonas.toFixed(2)}`, 14, yOffset + 17);

    // Columna izquierda/derecha
    const sectionStartY = yOffset + 25;
    const leftWidth = centerX - 20;
    const rightX = centerX + 5;
    const rightWidth = centerX - 20;

    // Renderizar columnas
    if (principal) {
      renderIngredientes(principal, totalPersonas, 14, leftWidth, sectionStartY);
    }
    if (acompanamiento) {
      renderIngredientes(acompanamiento, totalPersonas, rightX, rightWidth, sectionStartY);
    }

    return (doc as any).lastAutoTable?.finalY + 10 || sectionStartY + 10;
  };

  // 1) Lunes debajo del resumen en la misma página
  const resumenFinalY = (doc as any).lastAutoTable?.finalY || 30;
  const lunes = menu[0];
  const lunesTieneContenido = lunes && !lunes.sinMenu && (lunes.principal || lunes.acompanamiento);
  if (lunesTieneContenido) {
    drawVerticalDivider(Math.max(resumenFinalY + 5, 20));
    renderDia(lunes, resumenFinalY + 10);
  }

  // 2) Martes + Miércoles en la misma página
  const martes = menu[1];
  const miercoles = menu[2];
  if ((martes && (martes.principal || martes.acompanamiento) && !martes.sinMenu) ||
      (miercoles && (miercoles.principal || miercoles.acompanamiento) && !miercoles.sinMenu)) {
    doc.addPage();
    drawVerticalDivider(20, 280);
    let nextY = 20;
    if (martes && !martes.sinMenu && (martes.principal || martes.acompanamiento)) {
      nextY = renderDia(martes, 20);
    }
    // Asegura separación para el segundo bloque
    const baseY = Math.max(nextY + 10, 150);
    if (miercoles && !miercoles.sinMenu && (miercoles.principal || miercoles.acompanamiento)) {
      renderDia(miercoles, baseY);
    }
  }

  // 3) Jueves + Viernes en la misma página
  const jueves = menu[3];
  const viernes = menu[4];
  if ((jueves && (jueves.principal || jueves.acompanamiento) && !jueves.sinMenu) ||
      (viernes && (viernes.principal || viernes.acompanamiento) && !viernes.sinMenu)) {
    doc.addPage();
    drawVerticalDivider(20, 280);
    let nextY = 20;
    if (jueves && !jueves.sinMenu && (jueves.principal || jueves.acompanamiento)) {
      nextY = renderDia(jueves, 20);
    }
    const baseY = Math.max(nextY + 10, 150);
    if (viernes && !viernes.sinMenu && (viernes.principal || viernes.acompanamiento)) {
      renderDia(viernes, baseY);
    }
  }

  // 4) Totales de la semana en su propia página
  doc.addPage();
  doc.setFontSize(16);
  doc.text('INGREDIENTES TOTALES PARA TODA LA SEMANA', 14, 20);

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
    startY: 30,
    head: [['Ingrediente', 'Cantidad total', 'Unidad']],
    body: totalIngredientesArray,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [34, 197, 94], textColor: 255 }
  });

  doc.save('menu-semanal.pdf');
}
