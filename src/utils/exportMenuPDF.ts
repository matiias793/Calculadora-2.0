import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { obtenerPesoPostre, pesosPostres } from '@/utils/pesos-postres';
import { PDF_CONFIG } from '@/data/pdf-config';
import {
  DiaMenu,
  AcumuladorIngredientes,
  ajustarNumero,
  obtenerOrdenIngrediente,
  calcularPanTotal,
  calcularIngredientesReceta,
  procesarDatosPostre,
  normalizarNombreIngrediente
} from '@/utils/pdf-helpers';

declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable?: { finalY: number };
  }
}

export function exportMenuToPDF(menu: DiaMenu[]) {
  const doc = new jsPDF();
  const { colors, fonts, margins, tables } = PDF_CONFIG;

  // Objeto para acumular ingredientes semanales
  const acumuladorIngredientes: AcumuladorIngredientes = {};

  // --- PÁGINA 1: RESUMEN SEMANAL ---
  doc.setFontSize(fonts.sizes.title);
  doc.text('Menú Semanal', margins.left, margins.top);

  autoTable(doc, {
    startY: 30,
    head: tables.summaryHeader,
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
    styles: { fontSize: fonts.sizes.tableHeader, cellPadding: 1 },
    headStyles: { fillColor: colors.primary, textColor: colors.text.white }
  });

  const pageWidth = doc.internal.pageSize.width;

  // --- FUNCIONES DE RENDERIZADO ---

  const renderIngredientes = (titulo: string, totalPersonas: number, xOffset: number, maxWidth: number, startY: number) => {
    // Calcula ingredientes y actualiza el acumulador global
    const ingredientes = calcularIngredientesReceta(titulo, totalPersonas, acumuladorIngredientes);

    const ingredientesOrdenados = ingredientes.sort((a, b) => {
      const ordenA = obtenerOrdenIngrediente(a[0] as string);
      const ordenB = obtenerOrdenIngrediente(b[0] as string);
      return ordenA - ordenB;
    });

    doc.setFontSize(fonts.sizes.normal);
    doc.text(`${titulo}`, xOffset, startY);
    const tableStartY = startY + 6;

    autoTable(doc, {
      startY: tableStartY,
      head: tables.ingredientsHeader,
      body: ingredientesOrdenados,
      styles: { fontSize: fonts.sizes.tableBody, cellPadding: 1 },
      headStyles: { fillColor: colors.primary, textColor: colors.text.white, fontSize: fonts.sizes.tableHeader },
      margin: { left: xOffset },
      tableWidth: maxWidth
    });

    return (doc as any).lastAutoTable?.finalY || startY + 20;
  };

  const renderDia = (diaMenu: DiaMenu, yOffset: number) => {
    const { dia, principal, acompanamiento, recetaBase, postre, sinMenu, porciones, incluirPan } = diaMenu;
    if (sinMenu || (!principal && !acompanamiento && !recetaBase && !postre)) return yOffset;

    doc.setFontSize(fonts.sizes.subtitle);
    doc.text(`${dia}`, margins.left, yOffset);

    doc.setFontSize(fonts.sizes.normal);
    doc.text(`Porciones - Chicas: ${porciones.chica}, Medianas: ${porciones.mediana}, Grandes: ${porciones.grande}`, margins.left, yOffset + 10);

    const totalPersonas = ajustarNumero(porciones.chica * 0.67 + porciones.mediana + porciones.grande * 1.33, 4);

    const sectionStartY = yOffset + 20;
    const tableWidth = pageWidth - (margins.left * 2);
    let currentY = sectionStartY;

    // Renderizar secciones
    if (principal) {
      currentY = renderIngredientes(principal, totalPersonas, margins.left, tableWidth, currentY);
      currentY += margins.sectionGap;
    }
    if (acompanamiento) {
      currentY = renderIngredientes(acompanamiento, totalPersonas, margins.left, tableWidth, currentY);
      currentY += margins.sectionGap;
    }
    if (recetaBase) {
      currentY = renderIngredientes(recetaBase, totalPersonas, margins.left, tableWidth, currentY);
      currentY += margins.sectionGap;
    }

    // Renderizar Postre
    if (postre) {
      const pesoPostre = obtenerPesoPostre(postre);
      const postreData = pesosPostres[postre];

      if (pesoPostre) {
        doc.setFontSize(fonts.sizes.small);
        doc.setTextColor(colors.text.blue[0], colors.text.blue[1], colors.text.blue[2]);
        doc.text(`Porción: ${pesoPostre} por persona`, margins.left, currentY);

        if (postreData?.tipo === 'fruta_fresca' && postreData.unidad === 'g') {
          doc.text('(con cáscara)', margins.left, currentY + 5);
          currentY += 5;
        }

        doc.setTextColor(colors.text.black);
        currentY += 6;
      }

      // Procesar lógica de postre (actualiza acumulador si es fruta)
      const resultadoPostre = procesarDatosPostre(postre, totalPersonas, acumuladorIngredientes);

      if (resultadoPostre && resultadoPostre.tipo !== 'receta') {
        doc.setFontSize(fonts.sizes.normal);
        doc.text(`${postre} (para postre)`, margins.left, currentY);
        currentY += 6;
        doc.setFontSize(fonts.sizes.small);

        if (resultadoPostre.tipo === 'fruta_peso') {
          doc.text(`Cantidad total necesaria: ${resultadoPostre.cantidadTotal?.toFixed(2)} ${resultadoPostre.unidad} (con cáscara)`, margins.left, currentY);
          currentY += 10;
        } else if (resultadoPostre.tipo === 'fruta_racimo') {
          doc.text(`Cantidad por persona: ${postreData.peso}`, margins.left, currentY);
          doc.text(`Total para ${totalPersonas.toFixed(0)} personas: ${resultadoPostre.total} racimos pequeños`, margins.left, currentY + 5);
          currentY += 12;
        } else if (resultadoPostre.tipo === 'fruta_unidad') {
          const esPlural = (resultadoPostre.cantidadBase || 0) > 1 || resultadoPostre.unidadDisplay === 'unidades';
          doc.text(`Cantidad por persona: ${postreData.peso} ${resultadoPostre.unidadDisplay}${esPlural ? '' : ''}`, margins.left, currentY);
          doc.text(`Total para ${totalPersonas.toFixed(0)} personas: ${resultadoPostre.total} ${resultadoPostre.unidad}`, margins.left, currentY + 5);
          currentY += 12;
        }
      } else {
        // Es un postre con receta (Flan, etc.)
        currentY = renderIngredientes(postre, totalPersonas, margins.left, tableWidth, currentY);
      }
    }

    // Renderizar Pan
    currentY += 5;
    const porcionesChica = Number(porciones.chica) || 0;
    const porcionesMediana = Number(porciones.mediana) || 0;
    const porcionesGrande = Number(porciones.grande) || 0;

    if (incluirPan !== false) {
      const panDelDia = (porcionesChica * 20) + ((porcionesMediana + porcionesGrande) * 25);
      if (panDelDia > 0) {
        doc.setFontSize(fonts.sizes.normal);
        doc.text('Pan', margins.left, currentY);
        currentY += 6;
        doc.setFontSize(fonts.sizes.small);
        doc.text(`Cantidad necesaria: ${panDelDia}g`, margins.left, currentY);
        currentY += 10;
      }
    } else {
      doc.setFontSize(fonts.sizes.normal);
      doc.text('Pan', margins.left, currentY);
      currentY += 6;
      doc.setFontSize(fonts.sizes.small);
      doc.setTextColor(colors.text.gray);
      doc.text('No se incluye pan (receta con masa)', margins.left, currentY);
      doc.setTextColor(colors.text.black);
      currentY += 10;
    }

    return currentY + 10;
  };

  // --- PÁGINAS DE DÍAS ---
  menu.forEach((diaMenu) => {
    if (diaMenu && !diaMenu.sinMenu && (diaMenu.principal || diaMenu.acompanamiento || diaMenu.recetaBase || diaMenu.postre)) {
      doc.addPage();
      renderDia(diaMenu, margins.top);
    }
  });

  // --- PÁGINA DE TOTALES ---
  doc.addPage();
  doc.setFontSize(fonts.sizes.title);
  doc.text('INGREDIENTES TOTALES PARA TODA LA SEMANA', margins.left, margins.top);

  const totalIngredientesArray = Object.entries(acumuladorIngredientes)
    .map(([clave, { cantidad, unidad }]) => {
      const [nombreCompleto] = clave.split('::');
      const nombreParaMostrar = nombreCompleto.includes('(para postre)')
        ? nombreCompleto
        : normalizarNombreIngrediente(nombreCompleto);

      let cantidadFormateada: string;
      if (['unidades', 'unidad', 'racimos', 'unidad/es', 'racimos pequeños'].some(u => unidad.includes(u))) {
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
    head: tables.totalIngredientsHeader,
    body: totalIngredientesArray,
    styles: { fontSize: fonts.sizes.tableBodySummary, cellPadding: 2 },
    headStyles: { fillColor: colors.primary, textColor: colors.text.white }
  });

  // Total Pan
  const totalPan = calcularPanTotal(menu);
  if (totalPan > 0) {
    const lastY = (doc as any).lastAutoTable?.finalY || 30;
    autoTable(doc, {
      startY: lastY + 10,
      head: tables.totalIngredientsHeader,
      body: [['Pan', totalPan.toLocaleString('es-ES', { maximumFractionDigits: 0 }), 'g']],
      styles: { fontSize: fonts.sizes.tableBodySummary, cellPadding: 2 },
      headStyles: { fillColor: colors.primary, textColor: colors.text.white }
    });

    const panLastY = (doc as any).lastAutoTable?.finalY || lastY + 20;
    doc.setFontSize(fonts.sizes.tiny);
    doc.setTextColor(colors.text.gray);
    doc.text('Nota: Pan calculado como 20g para porción chica y 25g para porción mediana/grande. No se incluye pan para recetas que llevan masa.', margins.left, panLastY + 5, { maxWidth: pageWidth - 28 });
    doc.setTextColor(colors.text.black);
  }

  doc.save('menu-semanal.pdf');
}
